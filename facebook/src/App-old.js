import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';










class App extends Component {

constructor(props){

  super(props);
  this.state = {loggedIn: false};
    this.test = {first_name: "empty", secondName: "empty", picture: "empty"};
} // close constructor

componentDidMount() {
  window.fbAsyncInit = function() {
          console.log("test");
          window.FB.init({
          appId      : '527899994260788',
          cookie     : true,
          xfbml      : true,
          version    : 'v2.11'
          });

         window.FB.AppEvents.logPageView();
};

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "https://connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));

} // close component did mount

  render() {

    return (

      <div className="App">
        <div className="login">
        <h1 className="App-title">Milk Club</h1>
        {this.state.loggedIn ? <button onClick={this._fbLogout.bind(this)}> Sign Out </button> : <button onClick={this._fbLogin.bind(this)}>Login With Facebook</button>}
        <div>
        {this.state.loggedIn ? this._fbGetdata() : <p>Please Log In</p>}
        </div>
        </div>
        </div>

    ); // close return
  } // close render


_fbLogin () {


  window.FB.getLoginStatus(function(response) {
         if (response.status === 'connected') {
           console.log('Logged in.');
           this.setState({loggedIn: true});
           this.test = true;
           console.log(this.state.loggedIn);
           console.log("this.test = " + this.test)
}
else {
  window.FB.login(function(response) {
      if (response.authResponse) {
       console.log('Fetching information.... ');
       this.setState({loggedIn: true});
       this.test = true;
       console.log("this.test = " + this.test)
      } else {
       console.log('User cancelled login or did not fully authorize.');
      }
  }.bind(this));

}
}.bind(this));



} // end of fb login

_fbLogout() {

  window.FB.logout(function(response) {

  });

  console.log("logged out");
  this.setState({loggedIn: false});

} // end of fb logout

_fbGetdata () {

window.FB.getLoginStatus(function(response) {

   const user = response.authResponse.userID;
   console.log(user);
      window.FB.api(user, {fields:'first_name,last_name,picture'}, function(response) {
        this.test = response;

     console.log(this.test.first_name);

  }
  );
}.bind(this));



}// end of fb get data






} // close componenet

export default App;
