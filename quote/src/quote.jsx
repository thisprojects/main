import React from 'react';
import Fetch from 'react-fetch';
import './App.css';

class SaveQuote extends React.Component {

    render() {

        if (this.props.saved.length){

          return (
                    <div>

                          {this.props.exists ?
                                            <p className="exists fadeOut">This Quote And Author Combination Is Already In The Bank!</p>
                                            : <p></p> }

                          {this.props.saved.map (input  => // map the array and return the output items in HTML list

                              <ul key={input.toString()}>
                                  <li className="fadeIn" key={input.toString()}>{input}</li>
                              </ul>
                          )}

                    </div>
                )
        } else {
                return (
                          <div></div>
                )
       }
    }
}

class DisplayQuote extends React.Component{

    render (){

      let quote = this.props.results

      if (quote.quoteText){

          return (

            <div className="quoteBox fadeIn">
                 {quote.quoteText + " - " + quote.quoteAuthor}
            </div>
          )

      } else {
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
                    this.state = {results: [], waiting: false, message: "", savedQuotes: [], exists: false, toggle: true, formValue: "" };
}

componentDidMount () {

    this._napTime(1);
}
  render() {

    return (
      <div className="quote">

            <div className="header">
                <h1>Amazing Quotes</h1>
            </div>

            <div className="quote">
                  {this.state.toggle ?
                                    <DisplayQuote results={this.state.results} message={this.state.message} />
                                     : this._inputBox()}
            </div>

            <div className="buttons">
                  {this.state.waiting ?
                                      <div></div>
                                      : this._buttons()}
            </div>

            <SaveQuote saved={this.state.savedQuotes} exists={this.state.exists} />
      </div>
    );
  }

_inputBox() {

    return (
      <form onSubmit={this._saveIt.bind(this, this.state.formValue, "Yourself")}>
          <label>
              <input type="text" value={this.state.formValue} placeholder="Enter Your Quote!" onChange={this._updateAsYouType.bind(this)} />
          </label>
          <input type="submit" value="Save Quote" />
      </form>
    )

}

_updateAsYouType (event) {

    this.setState({formValue: event.target.value}); // updates our quote as it is typed into the box

}

_napTime(apiTries){

    this.setState({results:[], waiting: true, message: "Acquiring Inspiration...", toggle: true});

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

      this.setState({toggle: false, results: []}) // toggles between Entering own quote and getting a random one. Also resets any results already acquired from API.

}

_saveIt(quoteText, quoteAuthor, event){

    event.preventDefault();   //prevents form submit from reloading the page

    let z = quoteText + " - " + quoteAuthor
    let x = this.state.savedQuotes.indexOf(z);

        if (x === -1){
                        this.setState({savedQuotes: this.state.savedQuotes.concat([z])});
        }else{
                        this.setState({exists: true});

                        setTimeout(this._fadeTimer.bind(this), 3000);
        }
}

  _fadeTimer () {
                   this.setState({exists: false})
  }

  _fetchIT (apiTries) {

          fetch('http://localhost:80/quoteproxy.php')
                .then (response => response.json())
                  .then(data => this.setState({ results: data, waiting:false}))
                    .catch((error) => {
                                          console.log(error + " Bad Json Response - Re-Initiating Call To API , Attempts = " + apiTries);

                                            if (apiTries >= 5){
                                                    this.setState({message: "API Connection Failed. Please Try Again!", waiting: false});
                                            } else {
                                                    this._napTime(apiTries+=1);
                                            }
         });
  }
} // close Quote componenet

export default Quote;
