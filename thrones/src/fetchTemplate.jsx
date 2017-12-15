import React from 'react';
import Fetch from 'react-fetch';


    
    




class app extends React.Component {
    
constructor (props){
            super(props);
            this.state = {results: [] }
            
        }
    
componentDidMount () {
    
 this._fetchIT ();

}    
 
                
  render() {
    
    
        
    return (
    <div>
    <h1>Fetch Template</h1>    
    {this._apiResponseMap ()}
    </div>
       
    );
  }
    

_apiResponseMap (){
    
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

export default app;
