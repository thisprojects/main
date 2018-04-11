import React from 'react';
import Fetch from 'react-fetch';

class FetchTemplate extends React.Component {

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
      <div className="fetch-template">
        <h1>Fetch Template</h1>




        {this._jsonList()}


      </div>

    );
  }




_jsonList (){

    if (this.state.results.quoteText){
        let quote = this.state.results
        return (
            <div>
                    {quote.quoteText}


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

export default FetchTemplate;
