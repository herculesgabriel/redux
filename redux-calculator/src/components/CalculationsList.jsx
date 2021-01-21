import { connect } from 'react-redux';

function CalculationsList({ history, result }) {
  return (
    <>
      <h2>Resultado</h2>
      <p>{result}</p>

      <h2>Histórico</h2>
      <ul>
        { history.map((entry, index) => <li key={`${entry}-${index}`}>{entry}</li> ) }
      </ul>
    </>
  );
}

const mapStateToProps = (state) => ({
  history: state.calculatorReducer.history,
  result: state.calculatorReducer.result,
});

export default connect(mapStateToProps, null)(CalculationsList);
