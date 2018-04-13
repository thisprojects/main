import React from 'react';
import Fetch from 'react-fetch';
import './App.css';

class SaveQuote extends React.Component {

render() {



if (this.props.saved.length){

  return (
<div>
<div>
{this.props.exists ? <p className="fadeOut">This Quote Is Already In The Bank!</p> : <p></p>}
</div>
<div>
{this.props.saved.map (input  => // map the array and return the output items in HTML list

    <ul key={input.toString()}>
        <li key={input.toString()}>{input}</li>
    </ul>

)}

</div>
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
Input Your quote Here
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
            this.state = {results: ["Re-Rendering - Quote Is Empty"], waiting: false, tries: 0, message: "", savedQuotes: [], exists: false, toggle: true, formValue: "" };



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
      {this.state.toggle ? <DisplayQuote results={this.state.results} message={this.state.message} /> : this._textBox()}
      </div>
      <div className="buttons">
      {this.state.waiting ? <div></div> : this._buttons()}
      </div>

      <SaveQuote saved={this.state.savedQuotes} exists={this.state.exists} />
      </div>

    );
  }

_textBox() {


return (
  <form onSubmit={this._saveIt.bind(this, this.state.formValue, "Yourself")}>
      <label>
          <input type="text" value={this.state.formValue} placeholder="Enter Your Quote!" onChange={this._handleChange.bind(this)} />
      </label>
      <input type="submit" value="Submit Quote" />
  </form>
)

}

_handleChange (event) {

 this.setState({formValue: event.target.value, exists: false}); // updates our name as it is typed into the box

}



_napTime(apiTries){


this.setState({results:["Re-Rendering - Quote Is Empty"], waiting: true, message: "Acquiring Inspiration...", exists: false, toggle: true});
setTimeout(this._fetchIT.bind(this, apiTries), 1500);

}

_buttons() {

  return (
    <div>
    <button id="newQuote" onClick={this._napTime.bind(this, 1)}>Get Random Quote!</button>
    {this.state.toggle?
                      <button id="saveQuote" onClick={this._saveIt.bind(this, this.state.results.quoteText, this.state.results.quoteAuthor)}>Save Quote</button>
                      : <b></b> }
    <button className="inputQbutton" onClick={this._toggleQuote.bind(this)}>Enter Your Own Quote!</button>
    </div>
  );


}

_toggleQuote() {

this.setState({toggle: false, exists:false, results: []})
console.log(this.state.toggle);

}

_saveIt(quoteText, quoteAuthor, event){

event.preventDefault();


let z = quoteText + " - " + quoteAuthor
let x = this.state.savedQuotes.indexOf(z);

if (x === -1){
this.setState({savedQuotes: this.state.savedQuotes.concat([z])});

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
