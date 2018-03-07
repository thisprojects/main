import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Fetch from 'react-fetch';

class Interact extends React.Component {


        render() {

            if (this.props.loggedIn){

                    return (


                                <table className="interact">

                                <tr>
                                    <th colspan="2">{this.props.description}</th>
                                </tr>

                                <tr>
                                    <td>Date </td>
                                    <td>{this.props.date}</td>
                                </tr>
                                <tr>
                                    <td>Info </td>
                                    <td>{this.props.body}</td>
                                </tr>

                                <tr>
                                    <td>Organiser </td>
                                    <td>{this.props.organiser}</td>
                                </tr>
                                <tr>
                                    <td>URL</td>
                                    <td><a href={this.props.url}>{this.props.url}</a></td>
                                </tr>
                                <tr>
                                    <td>Location</td>
                                    <td>{this.props.location}</td>
                                </tr>

                            </table>


                    )
                  }else{ return(null)}
        }



}

class Userdetails extends React.Component {

        render () {

              if (this.props.firstname) {
                return (

                  <div className="userDetails">
                          {this.props.picture ? <img src={this.props.picture}></img> : <p></p>}
                          Logged In As {this.props.firstname + " " + this.props.lastname}



                  </div>

                )

              }else { return (null)}

       }


}

class App extends Component {

      constructor(props){
                          super(props);
                          this.state = {events: [], loggedIn: false, user: {picture: "", firstname: "", lastname: "", id:""}, data: {eventlist: []}};


      } // close constructor

      componentDidMount() { // facebook SDK integration
                              window.fbAsyncInit = function() {
                                                                window.FB.init({
                                                                appId      : '527899994260788',
                                                                cookie     : true,
                                                                xfbml      : true,
                                                                version    : 'v2.11'
                                                                });

                                                                window.FB.AppEvents.logPageView();
                                                                console.log("fbasync fired");
                            }; // close fbAsyncInit

                            (function(d, s, id){
                                                   var js, fjs = d.getElementsByTagName(s)[0];
                                                   if (d.getElementById(id)) {return;}
                                                   js = d.createElement(s); js.id = id;
                                                   js.src = "https://connect.facebook.net/en_US/sdk.js";
                                                   fjs.parentNode.insertBefore(js, fjs);
                                                   console.log("anon function FB fired");
                             }(document, 'script', 'facebook-jssdk'));
      } // close component did mount
        render() {

          console.log(this.state.data);
                    return (
                              <div className="App">
                                  <div className="login">

                                        <h1 className="App-title">Event App</h1>

                                        {this.state.loggedIn ?
                                          <div>
                                        <button onClick={this._fbLogout.bind(this)}> Sign Out </button>
                                        <br />

                                      </div>: <button onClick={this._fbLogin.bind(this)}>Login With Facebook</button>}

                                        <div>
                                          <br />
                                                <Userdetails firstname={this.state.user.firstname} lastname={this.state.user.lastname} picture={this.state.user.picture} />
                                                {this.state.loggedIn ? <div>Logged in {this._arrayMap(this.state.data.eventlist)}</div> : <p>Please Log In</p>}
                                        </div>
                                 </div>
                             </div>

                           ) // close return
                  } // close render

      _fbLogin () { // Is user logged in? If not prompt with facebook login popup
                    window.FB.getLoginStatus(function(response) {

                           if (response.status === 'connected') {
                                    console.log('Logged in.');
                                    this._fbIsLoggedin();
                           }else {

                                    window.FB.login(function(response) {
                                         if (response.authResponse) {
                                                console.log('Fetching information.... ');
                                                this._fbIsLoggedin();
                                         } else {
                                                console.log('User cancelled login or did not fully authorize.');
                                                } // close else
                             }.bind(this));// close FB.login callback
                          } // close else
                  }.bind(this));// close FB.getloginstatus callback
      } // end of fb login

      _fbIsLoggedin () {

                          this.setState({loggedIn: true});
                          console.log("login state is " + this.state.loggedIn);
                          this._fbGetdata();

      } // end of isLoggedIn

      _fbLogout() { // logs user out of app  - will also log out of facebook, providing they are not logged into facebook or another facebook app.
                    window.FB.logout(function(response) {
                              console.log("logged out");
                    });
                    this.setState({loggedIn: false , user:{picture: "", firstname: "", lastname: ""}});
      } // end of fb logout

      _fbGetdata () { // fetches user details to display - name and picture. also gets short term token
                        window.FB.getLoginStatus(function(response) {
                                          const user = response.authResponse.userID;

                                          window.FB.api(user, {fields:'first_name,last_name,picture'}, function(response) {
                                                    console.log(response);
                                                    this.setState({user: {firstname: response.first_name, lastname: response.last_name, id: response.id, picture: response.picture.data.url,}});
                                                    this._phpFetch('http://localhost:8888/post.php', 'POST');
                                          }.bind(this));
                        }.bind(this));


      }// end of fb get data

     _phpFetch (url, method){

                  fetch(url, {
                               method: method,

                  }).then (response => response.json()).then(data => this.setState({data: data})).catch(error => console.log(error));

     }

     _arrayMap (input){      // array map method

         if (input){ // if the array argument is not empty

                 return (

                     <div key={input.toString()}>

                         {input.map (input  => // map the array and return the output items in HTML list

                              <Interact key={input.ID.toString()} loggedIn={this.state.loggedIn} componentName="Events" location={input.location} id={input.ID} date={input.date} description={input.description} body={input.body} organiser={input.organiser} url={input.url}/>

                         )}

                     </div>

                 ) // close render

         }else{ // if the array argument is empty

             return ( // return a list containing the string "none"

                 <ul>
                 <li>None</li>
                 </ul>
             )
         }   // close else

     }   // close array map method


  } // close componenet

export default App;
