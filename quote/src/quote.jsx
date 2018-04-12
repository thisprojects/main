import React from 'react';
import Fetch from 'react-fetch';

class Quote extends React.Component {

constructor (props){
            super(props);
            this.state = {results: [], waiting: false };

        }

componentDidMount () {

 this._napTime();

}

  render() {

console.log(this.state.results);
    return (
      <div className="quote">

      <div className="header">
          <h1>Amazing Quotes</h1>
      </div>

      <div className="quote">
        {this._jsonList()}
      </div>
      {this.state.waiting ? <button>Please Wait!</button> : <button onClick={this._napTime.bind(this)}>New quote!</button>}
      </div>

    );
  }

_napTime(){
this.setState({results:[], waiting: true});
setTimeout(this._fetchIT.bind(this), 1500);

}
_jsonList (){

    if (this.state.results.quoteText){

        let quote = this.state.results
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
            <h1>Gathering Inspiration...</h1>
            </div>
        )
    }
}

_fetchIT () {


    fetch('http://localhost:80/quoteproxy.php')
      .then (response => response.json())
      .then(data => this.setState({ results: data, waiting:false })).catch((error) => {
        console.log(error + " Bad Json Response - Re-Initiating Call To API")

        this._napTime();

      });

}
}

export default Quote;
