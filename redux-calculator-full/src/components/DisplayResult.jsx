import React, { Component } from 'react';
import { connect } from 'react-redux';

class DisplayResult extends Component {
  render() {
    const { result } = this.props;
    return(
      <div>
        <h2>DisplayResult</h2>
        <p>{result}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  result: state.operationsReducer.result,
});

export default connect(mapStateToProps, null)(DisplayResult);
