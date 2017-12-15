import React from 'react';
import Fetch from 'react-fetch';



    
    

/////////////////////////////////////////////////////////////// House List Componenet ////////////////////////////////////////////////////////////////////////////////////////////////////

class Houselist extends React.Component {
    
   
  
    render (){
        
        console.log("house list");
        console.log(this.props.results);
                                            // log out props for testing 
        
      
        let results = this.props.results   // declare easy to read local variables from our props 
        let members = this.props.members
        let click = this.props.click
        let form = this.props.form
        
         
    
            if (!results.name && click===true){ // if we have NOT had the results back from the GoT API BUT the user has clicked to submit their name
                
                return (<h1>...Loading</h1>)
    
            }else if(results.name && click===true) { // when the results from the API are in
 
                return ( // return API info in list form - titles resturns results from 2nd api call - which is to the characters API 
                    <div>
                    <div className="nameBox">
                        
                        <h1>{form.charAt(0).toUpperCase() + form.slice(1)} of {results.name}</h1>
                        </div>
                    <div className="resultsTable">
                            <table>
                              <tr>
                                  <td>Coat of Arms: </td>
                                  <td>{results.coatOfArms ? results.coatOfArms : 'none'}</td>
                               </tr>
                                <tr>
                                    <td>Region: </td>
                                    <td>{results.region}</td>    
                                </tr>
                                <tr>
                                    <td>Titles: </td>
                                    <td>{this._arrayMap(this.props.results.titles)}</td>    
                                </tr>
                                
                                {members.name ? <tr><td>Current Lord: </td> <td>{members.name}</td></tr> : <tr><td>Current Lord:</td> <td>None</td></tr>} 
                                
                                <tr>
                                    <td>Words: </td>
                                    <td>{results.words ? results.words : 'None'}</td>
                                </tr>  
                                <tr>
                                    <td>Founded: </td>   
                                    <td>{results.founded ? results.founded : 'No Information'}</td>
                                </tr>
                                <tr>
                                    <td>Died Out: </td>
                                    <td>{results.diedOut ? results.diedOut : 'Still Active'}</td>
                                </tr>
                            </table>
                    </div> 
                    </div>

                )
        
            }else{
    
                return ( // if our submit button has not yet been clicked - return an empty div 
    
                    <div />
        
                )
    
            }   
    }
    

    
////////////////////////////////////////////////////////////////////////////////////// Array Map Method ///////////////////////////////////////////////////////////////////////////////////    
    
    _arrayMap (test){      // array map method
    
        if (test != ""){ // if the array argument is not empty 
    
            let input = test; // cache passed argument as local variable 
            console.log("array map");
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
                    <div className="header">
                <div className="logo">
                    <h1>Game of Thrones House Picker</h1>  
                    </div>
                    </div>
                        <div className="nameForm">
                            <form onSubmit={this._fetchIT.bind(this)}>
                                <label>
                                    <input type="text" value={this.state.formValue} placeholder="Thy Name" onChange={this._handleChange.bind(this)} />
                                </label>    
                                <input type="submit" value="Onwards" />    
                            </form>      
                    </div>
                <div className="house">
                    <Houselist members={this.state.members} results={this.state.results} click={this.state.click} form={this.state.formValue} />
                </div> 
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
        
           let x = this._randomHouse();

            fetch('https://cors-anywhere.herokuapp.com/https://anapioficeandfire.com/api/houses/'+ x).then(response => response.json()).then(data => this.setState({ results: data })).then (() => { // the first api call fetches random house information 
                
                if (this.state.results.swornMembers.length){ // if a character is given as current house lord  - we then contact characters API and request info on character 
                    
                    console.log("Characters api results"); 
                    
                    console.log(this.state.results.swornMembers); 
                    
                    fetch(this.state.results.swornMembers[0]).then(response => response.json()).then(data => this.setState({members:data}));
                    
                }
            
            }); // close api promises
            
    
    }  
    
    _randomHouse () { // pick random house and reset our state contents 
        
          let x = Math.floor((Math.random() * 400) +1);  // randomly choose a number for our house api call - there are 400 ish houses in the api DB  
        
          console.log("House Number " + x); // log the random number 
        
          this.setState({click: true, results: [], members: ""}); // each time the button is clicked - reset API results from both calls 
        
          return (x); 
        
    }

}

export default app;
