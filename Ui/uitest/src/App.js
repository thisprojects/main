import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';


class App extends Component {
  render() {

    var slibslob = [
      {bibble: "schnibble", gobble: "wobble"},{ bibble: "tibble", gobble: "wobble"},
      {bibble: "wumpty", gobble: "dingdong"}
    ]

function Test (props) {
  console.log (slibslob);
  return (
    <div>
    <h1>hello, {props.name}</h1>
    {slibslob.map (input  => // map the array and return the output items in HTML list


                        <li>{input.bibble}</li>




                    )}

</div>
  )
}

const Nutjob = props => {
return (
  <div>
  {props.name}
<p>Nutjob!</p>
</div>
)
}


    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="butz">


<Modal trigger={<Button>Show Modal</Button>}>
    <Modal.Header>Up Your Bum Slugs</Modal.Header>
    <Modal.Content image>
      <Image wrapped size='medium' src='/assets/images/avatar/large/rachel.png' />
      <Modal.Description>
        <Header>Default Profile Image</Header>
        <p>Weve found the following gravatar image associated with your e-mail address.</p>
        <p>Is it okay to use this photo?</p>
      </Modal.Description>
    </Modal.Content>
  </Modal>
  <div>
  {this.test()}
  <Test name="wibbems"/>
  <Nutjob name="squibsquob"/>
  </div>
   </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );

  }
  test () {


        var slibslob = [
          {bibble: "schnibble", gobble: "wobble"},
          {bibble: "tibble", gobble: "wobble"},
          {bibble: "wumpty", gobble: "dingdong"},
          [{bibble:" inside wibble", gobble: "inside gobble"}]
        ]

    return (
      <div>
      {slibslob.map (input  => // map the array and return the output items in HTML list



                            <ul>
                            <li>{Array.isArray(input)? input.map ( nib => <ul><li>{nib.bibble}</li></ul>) : input.bibble}</li>

                            </ul>




                      )}
      </div>
    )
  }



}

export default App;
