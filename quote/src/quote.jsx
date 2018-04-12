import React from 'react';
import Fetch from 'react-fetch';

class DisplayQuote extends React.Component{

render (){
  if (this.props.results.quoteText){

      let quote = this.props.results
      return (
          <div>
                  {quote.quoteText}
                  <br/>
                  {quote.quoteAuthor}
          </div>
      )

  }else{

      return (

          <div>
          <h1>{this.props.message}</h1>
          </div>
      )
  }



}
}
class Quote extends React.Component {

constructor (props){
            super(props);
            this.state = {results: [], waiting: false, tries: 0, message: "" };

        }

componentDidMount () {

 this._napTime(1);

}

  render() {

console.log(this.state.results);
    return (
      <div className="quote">

      <div className="header">
          <h1>Amazing Quotes</h1>
      </div>

      <div className="quote">
        <DisplayQuote results={this.state.results} message={this.state.message} />
      </div>
      <div className="buttons">
      {this.state.waiting ? <button>Please Wait!</button> : <button onClick={this._napTime.bind(this, 1)}>New quote!</button>}
      </div>
      </div>

    );
  }

_napTime(tries){
this.setState({results:[], waiting: true, message: "Acquiring Inspiration..."});
setTimeout(this._fetchIT.bind(this, tries), 1500);

}


_fetchIT (tries) {

    fetch('http://localhost:80/quoteproxy.php')
      .then (response => response.json())
      .then(data => this.setState({ results: data, waiting:false})).catch((error) => {

        console.log(error + " Bad Json Response - Re-Initiating Call To API , Attempts = " + tries);
        if (tries >= 5){

          this.setState({message: "API Connection Failed. Please Try Again!", waiting: false});
          return;
        }

        this._napTime(tries+=1);
      });
}
}

export default Quote;
