import React from 'react';
import Fetch from 'react-fetch';


    
    

/////////////////////////////////////////////////////////////// House List Componenet ////////////////////////////////////////////////////////////////////////////////////////////////////

class Houselist extends React.Component {
    
   
  
    render (){
        
        console.log(this.props.results); // log out props for testing 
        
      
        let results = this.props.results   // declare easy to read local variables from our props 
        let members = this.props.members
        let click = this.props.click
        let form = this.props.form
        
         
    
            if (!results.name && click===true){ // if we have NOT had the results back from the GoT API BUT the user has clicked to submit their name
                
                return (<h1>...Loading</h1>)
    
            }else if(results.name && click===true) { // when the results from the API are in
 
                return ( // return API info in list form - titles resturns results from 2nd api call - which is to the characters API 

                    <div className="nameBox">
                        
                        <h1>{form.charAt(0).toUpperCase() + form.slice(1)} of {results.name}</h1>
                        
                            <ul>
                                <li>Coat of Arms: {results.coatOfArms}</li>
                                <li>Region: {results.region}</li>    
                                
                                    <li>Titles: {this._arrayMap(this.props.results.titles)}</li>  
                                
                                {members.name ? <li>Current Lord: {members.name} </li> : <li>Current Lord: No Information </li>} 
                                <li>Words: {results.words ? results.words : 'None'}</li>    
                                <li>Founded: {results.founded ? results.founded : 'No Information'}</li>
                                <li>Died Out: {results.diedOut ? results.diedOut : 'Still Active'}</li>
                            </ul>
                    </div>   
                )
        
            }else{
    
                return ( // if none of the conditions are met - return an empty div - 
    
                    <div />
        
                )
    
            }   
    }
    

    
////////////////////////////////////////////////////////////////////////////////////// Array Map Method ///////////////////////////////////////////////////////////////////////////////////    
    
    _arrayMap (test){      // array map method
    
        if (test != ""){ // if the array argument is not empty 
    
            let input = test; // cache passed argument as local variable 
            console.log(input.toString()); 
                return (
            
                    <div key={input.toString()}>
                
                        {input.map (input  => // map the array and return the output items in HTML list 
                                    
                            <ul key={input.toString()}>
                                <li key={input.toString()}>{input}</li>  
                            </ul>
                                    
                        )} 
                
                    </div>
            
                ) // close render 
        
        }else{ // if the array argument is empty 
        
            return ( // return a list containing the string "none" 
            
                <ul>
                <li>None</li>
                </ul> 
            )
        }   // close else 
    
    }   // close array map method
    
} // close Houselist component 

//////////////////////////////////////////////////////////////////////////////////// Main App Component ///////////////////////////////////////////////////////////////////////////////////

class app extends React.Component {
    
    constructor (props){
            super(props);
            this.state = {results: [], formValue: "", click: false, members: [] } // set state to hold results from house API call , our name entry form and, button click and characters api call
            
    }
                    
    render() {
        
            return ( // displays our name form / box and then calls our house list componenet - to display results from API 
                
                <div>
                    <h1>Game of Thrones House Picker</h1>  
                        <div className="nameForm">
                            <form onSubmit={this._fetchIT.bind(this)}>
                                <label>
                                    <input type="text" value={this.state.formValue} placeholder="Pick Your Name" onChange={this._handleChange.bind(this)} />
                                </label>    
                                <input type="submit" value="submit" />    
                            </form>      
                        </div>  
                    <Houselist members={this.state.members} results={this.state.results} click={this.state.click} form={this.state.formValue} />
                </div>
       
            )
    }
    

/////////////////////////////////////////////////////////////////////////////// handle input box text method //////////////////////////////////////////////////////////////////////////////    
    _handleChange (event){
    
    
        this.setState({formValue: event.target.value}); // updates our name as it is typed into the box 
    
    }
 
    
////////////////////////////////////////////////////////////////////////////// API call method ///////////////////////////////////////////////////////////////////////////////////////////    
    
    
    _fetchIT (event) {
        
            event.preventDefault();    // prevent the form submit default behavoir 
        
            let x = Math.floor((Math.random() * 400) +1);  // randomly choose a number for our house api call - there are 400 ish houses in the api DB  
        
            console.log(x); // log the random number 
        
            this.setState({click: true, results: [], members: ""}); // each time the button is clicked - reset API results from both calls 

            fetch('https://cors-anywhere.herokuapp.com/https://anapioficeandfire.com/api/houses/'+ x).then(response => response.json()).then(data => this.setState({ results: data })).then (data => {
                
                if (this.state.results.swornMembers.length){
                    
                    console.log(this.state.results.swornMembers); 
                    fetch(this.state.results.swornMembers[0]).then(response => response.json()).then(data => this.setState({members:data})).then(data => console.log(this.state.members));
                    
                }
            
            
            
            }); // api calls in promise form - first fetches house data and then fetches character data - if any characters have a relationship to the house in the API info 
            
    
    }  

}

export default app;
