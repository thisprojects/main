import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    
componentDidMount() {  // facebook signin  button render
    
    window.fbAsyncInit = function() {
            console.log("test"); 
            window.FB.init({
            appId      : '527899994260788',
            cookie     : true,
            xfbml      : true,
            version    : 'v2.11'
            });
      
           window.FB.AppEvents.logPageView();  
       window.FB.getLoginStatus(function(response) {
              if (response.status === 'connected') {
                console.log('Logged in.');
  }
  else {
    window.FB.login();
  }
});
   window.FB.getLoginStatus(function(response) {
  
    const user = response.authResponse.userID; 
    console.log(user);
       window.FB.api(user, {fields:'first_name,last_name,picture'}, function(response) {
      console.log(response); 
  }
);
});     
        
      };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
    
 
    
}
    
  render() {
      
             
      
    return (
       
      <div className="App">

        <h1 className="App-title">Social App</h1>
        
     
        
        <div className="login">
        
        <button>Login With Facebook </button>
        </div>
        </div>
    );



  }
}

export default App;
