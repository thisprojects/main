import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Fetch from 'react-fetch';

class Interact extends React.Component {


        render() {

            if (this.props.loggedIn){

                    return (
                              <div className="interact">
                                <p>{this.props.componentName}</p>
                                {this.props.eventlist}
                              </div>
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
                          <br />
                          <p>Welcome {this.props.firstname + " " + this.props.lastname} !</p>

                  </div>

                )

              }else { return (null)}

       }


}

class App extends Component {

      constructor(props){
                          super(props);
                          this.state = {loggedIn: false, user: {picture: "", firstname: "", lastname: "", id:""}, data: {eventlist: [], sublist: [], comments: []}};


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
                                        <h1 className="App-title">Milk Club</h1>

                                        {this.state.loggedIn ?
                                          <div>
                                        <button onClick={this._fbLogout.bind(this)}> Sign Out </button>
                                        <br />
                                        <a href="javascript:window.open('http://localhost:8888/newevent.php','_blank','height=600,width=400')">New Event</a>
                                        </div> : <button onClick={this._fbLogin.bind(this)}>Login With Facebook</button>}

                                        <div>
                                                {this.state.loggedIn ? <p>Logged in</p> : <p>Please Log In</p>}
                                                <Userdetails firstname={this.state.user.firstname} lastname={this.state.user.lastname} picture={this.state.user.picture} />
                                                <Interact loggedIn={this.state.loggedIn} componentName="Your Events" eventlist={this._arrayMap(this.state.data.eventlist)}/>
                                                <Interact loggedIn={this.state.loggedIn} componentName="Subscribed Events" eventlist={this._arrayMap(this.state.data.sublist)}/>


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
                    this.setState({loggedIn: false, picture: "", firstname: "", lastname: ""});
      } // end of fb logout

      _fbGetdata () { // fetches user details to display - name and picture. also gets short term token
                        window.FB.getLoginStatus(function(response) {
                                          const user = response.authResponse.userID;

                                          window.FB.api(user, {fields:'first_name,last_name,picture'}, function(response) {
                                                    console.log(response);
                                                    this.setState({user: {firstname: response.first_name, lastname: response.last_name, id: response.id, picture: response.picture.data.url,}});
                                                    this._phpFetch('http://localhost:8888/post.php', 'POST', this.state.user);
                                          }.bind(this));
                        }.bind(this));


      }// end of fb get data

     _phpFetch (url, method, body){
       console.log(body);
                  fetch(url, {
                               method: method,
                               body: JSON.stringify(body)

                  }).then (response => response.json()).then(data => this.setState({data: data})).catch(error => console.log(error));

     }

     _arrayMap (input){      // array map method
        console.log(input);
         if (input){ // if the array argument is not empty

             //let input = test; // cache passed argument as local variable
             console.log("array map");
             //console.log(input.toString());

             for (var i=0; i < this.state.data.comments.length ; i++){

                 for (var x=0; x < input.length; x++){


                          if (this.state.data.comments[i].eventID == input[x].ID){

                                  if (!input[x].comments){ input[x].comments = []};

                          input[x].comments.push(this.state.data.comments[i]);

                        }

                 }

             }


                 return (

                     <div key={input.toString()}>

                         {input.map (input  => // map the array and return the output items in HTML list
                             <ul key={input.description.toString()}>
                                 <li key={input.ID.toString()}>Event ID {input.ID}</li>
                                 <li key={input.description.toString()}>Description {input.description}</li>
                                 <li key={input.date.toString()}>Date {input.date}</li>
                                 <li key={input.body.toString()}>Event Info {input.body}</li>
                                 <li key={input.organiser.toString()}>Organiser {input.organiser}</li>
                                 <li key={input.location.toString()}>Location {input.location}</li>
                                 <li key={input.url.toString()}>URL {input.url}</li>
                                 {input.comments ? input.comments.map (input2 =>
                                        <ul key={input2.ID.toString()}>
                                        <li key={input2.comments.toString()}>{input2.comments}</li>
                                        <li key={input2.owner.toString()}>{input2.owner}</li>
                            </ul>) : <p>No Comments</p>}
                              <button onClick={this._subscribe.bind(this, input)}>Subscribe!</button>
                             </ul>
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

     _subscribe(input) {

       console.log("subscribed" + input.ID)
     }
  } // close componenet

export default App;
