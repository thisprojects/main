import React from 'react';
import Fetch from 'react-fetch';

class SaveQuote extends React.Component {

render() {



if (this.props.saved.length){

  return (
<div>
{this.props.exists ? <p>This Quote Is Already In The Bank!</p> : <p></p>}

{this.props.saved.map (input  => // map the array and return the output items in HTML list

    <ul key={input.toString()}>
        <li key={input.toString()}>{input}</li>
    </ul>

)}

</div>
)


}else {

  return (

    <div></div>
  )
}

}
}

class InputQuote extends React.Component {

render() {

return (

<div>
Enter your own quote!
</div>

)

}

}

class DisplayQuote extends React.Component{

render (){
  if (this.props.results.quoteText){

      let quote = this.props.results
      return (

          <div className="quoteBox">
                  {quote.quoteText}
                  <br/>
                  {quote.quoteAuthor}
          </div>
      )

  }else{

      return (

          <div className="messageBox">
          <h1>{this.props.message}</h1>
          </div>
      )
  }



}
}
class Quote extends React.Component {

constructor (props){
            super(props);
            this.state = {results: ["Re-Rendering - Quote Is Empty"], waiting: false, tries: 0, message: "", savedQuotes: [], exists: false };



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
      {this.state.waiting ? <p>Please Wait!</p> : this._buttons()}



      </div>
      <InputQuote />
      <SaveQuote saved={this.state.savedQuotes} exists={this.state.exists}/>
      </div>

    );
  }

_napTime(apiTries){


this.setState({results:["Re-Rendering - Quote Is Empty"], waiting: true, message: "Acquiring Inspiration...", exists: false});
setTimeout(this._fetchIT.bind(this, apiTries), 1500);

}

_buttons() {

  return (
    <div>
    <button id="newQuote" onClick={this._napTime.bind(this, 1)}>New Quote!</button>
    <button id="saveQuote" onClick={this._saveIt.bind(this)}>Save Quote</button>
    </div>
  );


}

_saveIt(){

let x = this.state.savedQuotes.indexOf(this.state.results.quoteText);
console.log (x);
if (x == -1){
this.setState({savedQuotes: this.state.savedQuotes.concat([this.state.results.quoteText])});

}else{

this.setState({exists: true})
console.log ("this quote already exists");

}


}


      _fetchIT (apiTries) {

          fetch('http://localhost:80/quoteproxy.php')
                .then (response => response.json())
                  .then(data => this.setState({ results: data, waiting:false}))
                    .catch((error) => {
                                          console.log(error + " Bad Json Response - Re-Initiating Call To API , Attempts = " + apiTries);

                                            if (apiTries >= 5){
                                                    this.setState({message: "API Connection Failed. Please Try Again!", waiting: false});
                                            }else{
                                                    this._napTime(apiTries+=1);
                                            }
         });
      }
}

export default Quote;
