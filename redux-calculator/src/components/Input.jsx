import { Component } from 'react';
import { connect } from 'react-redux';
import { multiply } from '../redux/actions/index'

class Input extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value_1: 0,
      value_2: 0,
    };
  }

  render() {
    const { value_1, value_2 } = this.state;
    const { makeMultiplication } = this.props; // Como lá embaixo eu usei a função dispatch to props, eu despachei o conteúdo makeMultiplication para as props

    return (
      <div>
        <label htmlFor="value_1">
          <input
            type="number"
            name="value_1"
            id="value_1"
            value={value_1}
            onChange={
              (event) => this.setState({ value_1: Number(event.target.value) })
            }
          />
        </label>
        
        <label htmlFor="value_2">
          <input
            type="number"
            name="value_2"
            id="value_2"
            value={value_2}
            onChange={ (event) => this.setState({ value_2: Number(event.target.value) }) }
          />
        </label>

        <button
          onClick={() => makeMultiplication(value_1, value_2)}
        >
          Multiplicar
        </button>
      </div>
    )
  };
}

const mapDispatchToProps = (dispatch) => ({ // Esse dispatch é recebido como parâmetro é a função dispatch que vai ser usada com o import do multiply(a, b)
  makeMultiplication: (a, b) => dispatch(multiply(a, b)), // aqui eu uso o dispatch que foi importado
});

export default connect(null, mapDispatchToProps)(Input); // A função connect retorna uma função por isso recebe outros parênteses

// connect()() executa connect() ela retorna uma função, função(), executa a função! Legal.
