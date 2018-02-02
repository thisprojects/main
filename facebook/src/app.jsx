import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Fetch from 'react-fetch';

class Interact extends React.Component {

  constructor(props){
                      super(props);
                      this.state = {phpResponse: ""};
  } // close constructor


componentDidMount() {
this._phpFetch();


}



        render() {
                    return (
                              <div className="interact">
                                <p>{this.props.componentName}</p>
                              </div>
                    )
        }

        _phpFetch (){



          // fetch('http://localhost:8888/oldstuff/post.php').then(response => response.json()).then(data => this.setState({phpResponse: data}));

          var x = "test";
 fetch('http://localhost:8888/post.php', {
   method: 'POST',
   body: JSON.stringify({message: 'slub slub'})

}).then (response => response.json()).then(data => console.log(data));


        }

}

class Userdetails extends React.Component {

        render () {
                    return (
                            <div className="userDetails">
                                    {this.props.picture ? <img src={this.props.picture}></img> : <p></p>}
                                    <br />
                                    {this.props.firstname}
                                    <br />
                                    {this.props.lastname}
                            </div>
                  )
       }
}

class App extends Component {

      constructor(props){
                          super(props);
                          this.state = {loggedIn: false, picture: "", firstname: "", lastname: ""};
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
                    return (
                              <div className="App">
                                  <div className="login">
                                        <h1 className="App-title">Milk Club</h1>

                                        {this.state.loggedIn ?
                                        <button onClick={this._fbLogout.bind(this)}> Sign Out </button> :
                                        <button onClick={this._fbLogin.bind(this)}>Login With Facebook</button>}

                                        <div>
                                                {this.state.loggedIn ? <p>Logged in</p> : <p>Please Log In</p>}
                                                <Userdetails firstname={this.state.firstname} lastname={this.state.lastname} picture={this.state.picture} />
                                                <Interact componentName="Events" />
                                                <Interact componentName="Comments" />

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
                                                    this.setState({picture: response.picture.data.url, firstname: response.first_name, lastname: response.last_name });
                                          }.bind(this));
                        }.bind(this));
      }// end of fb get data

      } // close componenet

export default App;
