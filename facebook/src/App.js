import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    

    
  render() {
      
      var egg = <h1> Snuggems </h1>;
      
      function sweggs () {
          
          return (
          
          <div>
              hello
          </div>      
          )
          
      };
      
    return (
      


      
      <div className="App">
        {egg}
        {sweggs()}
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
      
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );



  }
}

export default App;
