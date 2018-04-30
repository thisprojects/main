import React, { Component } from 'react'

import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'


class SecondCounter extends Component {
render (){

const { value, onIncreaseClick, onDecreaseClick } = this.props

  return (
    <div>
    <p>second counter</p>
    <p>{value}</p>
    </div>



  )


}


}
// React component
class Counter extends Component {
  render() {
    const { value, onIncreaseClick, onDecreaseClick } = this.props
    console.log(this.props);
    return (
      <div>
      <div>
        <span>{value}</span>
        <button onClick={onIncreaseClick}>nib nobs</button>
        <button onClick={onDecreaseClick}>decrease</button>
      </div>
      <div>
      <SecondCounter />
      </div>
      </div>
    )
  }
}



// Action
const increaseAction = { type: 'increase' }
const decreaseAction = { type: 'decrease' }

// Reducer
function counter(state = { count: 0 }, action) {
  const count = state.count
  switch (action.type) {
    case 'increase':
      return { count: count + 1 }
    case 'decrease':
      return {count: count - 1 }
    default:
      return state
  }
}

// Store
const store = createStore(counter)

// Map Redux state to component props
function mapStateToProps(state) {
  return {
    value: state.count
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    onIncreaseClick: () => dispatch(increaseAction),
    onDecreaseClick: () => dispatch(decreaseAction)
  }
}

// Connected Component
const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
