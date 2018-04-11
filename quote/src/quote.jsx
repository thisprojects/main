import React from 'react';
import Fetch from 'react-fetch';

class Quote extends React.Component {

constructor (props){
            super(props);
            this.state = {results: [] }

        }

componentDidMount () {

 this._fetchIT ();

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
      <button onClick={this._fetchIT.bind(this)}>New quote!</button>
      </div>

    );
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
      .then(data => this.setState({ results: data }));
}
}

export default Quote;
