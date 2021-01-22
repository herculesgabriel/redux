import React, { Component } from 'react';
import { connect } from 'react-redux';

class DisplayHistory extends Component {
  render() {
    const { history } = this.props;
    return(
      <div>
        <ul>
          { history.map((value, index) => <li key={index}>{value}</li> ) }
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  history: state.operationsReducer.history,
})

export default connect(mapStateToProps, null)(DisplayHistory);
