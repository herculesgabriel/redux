import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sum, subtract, multiply, divide, clear } from '../redux/actions/index'

class Operations extends Component {
  constructor(props){
    super(props);

    this.state = {
      value_1: 0,
      value_2: 0,
    }
  }


  render() {
    const { value_1, value_2 } = this.state;
    const { makeSum, makeSubtract, makeMultiply, makeDivide, letsClear } = this.props;
    return(
      <div>
        <h2>Operations</h2>
        <input
          type="number"
          name="value_1"
          id="value_1"
          value={value_1}
          onChange={ (event) => this.setState({ value_1: Number(event.target.value) }) }
        />
        <input
          type="number"
          name="value_2"
          id="value_2"
          value={value_2}
          onChange={ (event) => this.setState({ value_2: Number(event.target.value) }) }
        />
        <div>
          <button
          onClick={ () => makeSum(value_1, value_2) }
          >
            + 
          </button>
          <button
          onClick={ () => makeSubtract(value_1, value_2) }
          >
            -
          </button>
          <button
            onClick={ () => makeMultiply(value_1, value_2) }
          >
            *
          </button>
          <button
            onClick={ () => makeDivide(value_1, value_2) }
          >
            /
          </button>
          <button
            onClick={ () => { this.setState({value_1: 0, value_2: 0}); return letsClear()} }
          >
            CLEAR
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  makeSum: (a, b) => dispatch(sum(a, b)),
  makeSubtract: (a, b) => dispatch(subtract(a, b)),
  makeMultiply: (a, b) => dispatch(multiply(a, b)),
  makeDivide: (a, b) => dispatch(divide(a, b)),
  letsClear: () => dispatch(clear()),
});

export default connect(null, mapDispatchToProps)(Operations);
