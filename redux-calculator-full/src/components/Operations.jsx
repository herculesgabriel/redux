import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clear, handleCalculate, SUM, SUBTRACT, MULTIPLY, DIVIDE } from '../redux/actions'
class Operations extends Component {
  constructor(props){
    super(props);

    this.state = {
      value_1: 0,
      value_2: 0,
      operation: SUM,
    }
  }


  render() {
    const { value_1, value_2, operation } = this.state;
    const { letsClear, letsCalculate } = this.props;
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
        <select
          name="operations"
          id="operations"
          value={operation}
          onChange={(event) => this.setState({ operation: event.target.value })}
        >
          <option value={SUM}>Sum</option>
          <option value={SUBTRACT}>Subtract</option>
          <option value={MULTIPLY}>Multiply</option>
          <option value={DIVIDE}>Divide</option>
        </select>
        
        <button
          onClick={ () => letsCalculate(value_1, value_2, operation) }
        >
          Calcular
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
  letsCalculate: (a, b, op) => dispatch(handleCalculate(a, b, op)),
  letsClear: () => dispatch(clear()),
});

export default connect(null, mapDispatchToProps)(Operations);
