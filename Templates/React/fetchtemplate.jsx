import React from 'react';
import Fetch from 'react-fetch';






class Welcome extends React.Component {
    render (){
        return (<h1>Hello1 {this.props.value}</h1>);


    }

}

class List extends React.Component {

                render () {
   return (
       <ul>
           {this.props.list.map(station => <li key={station}> {station} </li>)}
       </ul>
   );
}



}


class ShoppingList extends React.Component {

constructor (props){
            super(props);
            this.state = {value: "hello", schnups: false, list: ["one","two","three"], results: [] }

        }

componentDidMount () {

 this._fetchIT ();

}


  render() {



    return (
      <div className="shopping-list">
        <h1>List of Stuff</h1>

        <ul>
        <List list={this.state.list}/>
        </ul>
        <Welcome value={this.state.value}/>
        {this._doStuff()}
        {this._jsonList()}
        <div>

        </div>
        <button onClick={this._testSt.bind(this, this.state.schnups)}>Click me!</button>
      </div>

    );
  }

_doStuff () {

    if (this.state.schnups){

    return (<h1> Bibobs </h1>);
     }
}

_testSt () {
        this.setState({value: "wibbums", schnups: !this.state.schnups, list: ["one", "two", "three", "four", 13] });
        this.setState({results: []});
        this._fetchIT();

    }
_jsonList (){

    if (this.state.results.length){
        let starwars = this.state.results
        return (
            <div>

                {starwars.map (starwars  =>
                <ul>
                <li key={starwars.toString()}>{starwars.name}</li>
                </ul>
                )}
            </div>
        )


    }else{

        return (

            <div>
            <h1>Loading!...</h1>
            </div>
        )
    }


}

_fetchIT () {
    fetch('https://swapi.co/api/people/')
   .then(response => response.json())
      .then(data => this.setState({ results: data.results }));


}

}

export default ShoppingList;
