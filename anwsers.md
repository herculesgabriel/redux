# Gabarito

### Exercício 1 - Adicione a operação de soma

Atualmente só é possível fazer contas de multiplicação. Implemente a operação de soma na aplicação.

- Para este exercício crie uma nova branch a partir da **main**

**Requisitos:**
- [ ] A implementação deverá ser feita adicionando **mais um botão** na tela com o texto "Somar"
- [ ] Cada botão deverá ser responsável por realizar um tipo de operação

```
src/components/Input.jsx
```
```javascript
import { Component } from 'react';
import { connect } from 'react-redux';

import { multiply, sum } from '../redux/actions';

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
    const { makeMultiplication, makeSum } = this.props;

    return (
      <div>
        <h1>Calculadora</h1>

        <label htmlFor="value_1">
          <input
            type="number"
            id="value_1"
            name="value_1"
            value={value_1}
            onChange={(e) => this.setState({ value_1: Number(e.target.value) })}
          />
        </label>

        <label htmlFor="value_2">
          <input
            type="number"
            id="value_2"
            name="value_2"
            value={value_2}
            onChange={(e) => this.setState({ value_2: Number(e.target.value) })}
          />
        </label>

        <button
          type="button"
          onClick={() => makeMultiplication(value_1, value_2)}
        >
          Multiplicar
        </button>

        <button
          type="button"
          onClick={() => makeSum(value_1, value_2)}
        >
          Somar
        </button>
      </div>
    )
  };
}

const mapDispatchToProps = (dispatch) => ({
  makeMultiplication: (a, b) => dispatch(multiply(a, b)),
  makeSum: (a, b) => dispatch(sum(a, b)),
});

export default connect(null, mapDispatchToProps)(Input);
```

```
src/redux/actions/index.js
```
```javascript
export const MULTIPLY = 'MULTIPLY';
export const SUM = 'SUM';

export const multiply = (a, b) => ({
  type: MULTIPLY,
  a,
  b,
});

export const sum = (a, b) => ({
  type: SUM,
  a,
  b,
});
```

```
src/redux/reducers/calculateReducer.js
```
```javascript
import { MULTIPLY, SUM } from '../actions';

const INITIAL_STATE = {
  history: [],
  result: 0,
};

const calculateReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MULTIPLY:
      return {
        ...state,
        result: action.a * action.b,
        history: [
          ...state.history,
          `${action.a} x ${action.b} = ${action.a * action.b}`,
        ],
      };
    case SUM:
      return {
        ...state,
        result: action.a + action.b,
        history: [
          ...state.history,
          `${action.a} + ${action.b} = ${action.a + action.b}`,
        ],
      };
    default:
      return state;
  }
};

export default calculateReducer;
```

### Exercício 2 - Permita apagar o histórico

Faça com que seja possível apagar todo o histórico de cálculos feitos anteriormente.

- Para este exercício crie uma nova branch a partir da branch que você criou no exercício 1

**Requisitos:**
- [ ] A implementação deverá ser feita adicionando **mais um botão** na tela com o texto "Limpar histórico"
- [ ] Ao clicar no botão de apagar a lista deve ficar vazia e, portanto, não aparecer mais em tela
- [ ] O resultado do último cálculo deverá continuar aparecendo na tela
- [ ] Caso a pessoa usuária faça uma nova operação, a representação do cálculo deverá aparecer normalmente como o primeiro item da lista

```
src/components/Input.jsx
```
```javascript
import { Component } from 'react';
import { connect } from 'react-redux';

import { multiply, sum, clearList } from '../redux/actions';

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
    const { makeMultiplication, makeSum, clear } = this.props;

    return (
      <div>
        <h1>Calculadora</h1>

        <label htmlFor="value_1">
          <input
            type="number"
            id="value_1"
            name="value_1"
            value={value_1}
            onChange={(e) => this.setState({ value_1: Number(e.target.value) })}
          />
        </label>

        <label htmlFor="value_2">
          <input
            type="number"
            id="value_2"
            name="value_2"
            value={value_2}
            onChange={(e) => this.setState({ value_2: Number(e.target.value) })}
          />
        </label>

        <button
          type="button"
          onClick={() => makeMultiplication(value_1, value_2)}
        >
          Multiplicar
        </button>

        <button
          type="button"
          onClick={() => makeSum(value_1, value_2)}
        >
          Somar
        </button>

        <button
          type="button"
          onClick={clear}
        >
          Limpar histórico
        </button>
      </div>
    )
  };
}

const mapDispatchToProps = (dispatch) => ({
  makeMultiplication: (a, b) => dispatch(multiply(a, b)),
  makeSum: (a, b) => dispatch(sum(a, b)),
  clear: () => dispatch(clearList()),
});

export default connect(null, mapDispatchToProps)(Input);
```

```
src/redux/actions/index.js
```
```javascript
export const MULTIPLY = 'MULTIPLY';
export const SUM = 'SUM';
export const CLEAR_LIST = 'CLEAR_LIST';

export const multiply = (a, b) => ({
  type: MULTIPLY,
  a,
  b,
});

export const sum = (a, b) => ({
  type: SUM,
  a,
  b,
});

export const clearList = () => ({ type: CLEAR_LIST });
```

```
src/redux/reducers/calculateReducer.js
```
```javascript
import { MULTIPLY, SUM, CLEAR_LIST } from '../actions';

const INITIAL_STATE = {
  history: [],
  result: 0,
};

const calculateReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MULTIPLY:
      return {
        ...state,
        result: action.a * action.b,
        history: [
          ...state.history,
          `${action.a} x ${action.b} = ${action.a * action.b}`,
        ],
      };
    case SUM:
      return {
        ...state,
        result: action.a + action.b,
        history: [
          ...state.history,
          `${action.a} + ${action.b} = ${action.a + action.b}`,
        ],
      };
    case CLEAR_LIST:
      return {
        ...state,
        history: [],
      };
    default:
      return state;
  }
};

export default calculateReducer;
```

### Exercício 3 - Implemente as quatro operações matemáticas 

Adicione as outras duas operações à aplicação. No entanto, dessa vez um único botão deve solicitar o cálculo.

- Para este exercício crie uma nova branch a partir da branch que você criou no exercício 2

**Requisitos:**
- [ ] Além do botão de limpar a lista criado no último exercício, **deve existir apenas um botão com o texto "Calcular"**
- [ ] Deve existir uma caixa de seleção (*select*) para que a pessoa usuária escolha qual operação deseja realizar
- [ ] O valor desse *select* deve ser guardado no estado do próprio componente
- [ ] Ao clicar no botão calcular **o componente deve decidir qual *action* será enviada**, correspondente à operação que o usuário escolher
- [ ] Você deve criar uma função dentro do componente para lidar com a lógica desse clique

```
src/components/Input.jsx
```
```javascript
import { Component } from 'react';
import { connect } from 'react-redux';

import { multiply, sum, subtract, divide, clearList } from '../redux/actions';

class Input extends Component {
  constructor(props) {
    super(props);

    this.handleClickCalculate = this.handleClickCalculate.bind(this);

    this.state = {
      value_1: 0,
      value_2: 0,
      operation: 'sum',
    };
  }

  handleClickCalculate() {
    const { operation, value_1, value_2 } = this.state;
    const { makeSum, makeSubtraction, makeMultiplication, makeDivision } = this.props;

    if (operation === 'sum') return makeSum(value_1, value_2);
    if (operation === 'subtract') return makeSubtraction(value_1, value_2);
    if (operation === 'multiply') return makeMultiplication(value_1, value_2);
    if (operation === 'divide') return makeDivision(value_1, value_2);
  }

  render() {
    const { value_1, value_2, operation } = this.state;
    const { clear } = this.props;

    return (
      <div>
        <h1>Calculadora</h1>

        <label htmlFor="value_1">
          <input
            type="number"
            id="value_1"
            name="value_1"
            value={value_1}
            onChange={(e) => this.setState({ value_1: Number(e.target.value) })}
          />
        </label>

        <select
          name="operation"
          id="operation"
          value={operation}
          onChange={(e) => this.setState({ operation: e.target.value })}
        >
          <option value="sum">+</option>
          <option value="subtract">-</option>
          <option value="multiply">*</option>
          <option value="divide">/</option>
        </select>

        <label htmlFor="value_2">
          <input
            type="number"
            id="value_2"
            name="value_2"
            value={value_2}
            onChange={(e) => this.setState({ value_2: Number(e.target.value) })}
          />
        </label>

        <button
          type="button"
          onClick={this.handleClickCalculate}
        >
          Calcular
        </button>

        <button
          type="button"
          onClick={clear}
        >
          Limpar histórico
        </button>
      </div>
    )
  };
}

const mapDispatchToProps = (dispatch) => ({
  makeSum: (a, b) => dispatch(sum(a, b)),
  makeSubtraction: (a, b) => dispatch(subtract(a, b)),
  makeMultiplication: (a, b) => dispatch(multiply(a, b)),
  makeDivision: (a, b) => dispatch(divide(a, b)),
  clear: () => dispatch(clearList()),
});

export default connect(null, mapDispatchToProps)(Input);
```

```
src/redux/actions/index.js
```
```javascript
export const MULTIPLY = 'MULTIPLY';
export const SUM = 'SUM';
export const SUBTRACT = 'SUBTRACT';
export const DIVIDE = 'DIVIDE';
export const CLEAR_LIST = 'CLEAR_LIST';

export const multiply = (a, b) => ({
  type: MULTIPLY,
  a,
  b,
});

export const sum = (a, b) => ({
  type: SUM,
  a,
  b,
});

export const subtract = (a, b) => ({
  type: SUBTRACT,
  a,
  b,
});

export const divide = (a, b) => ({
  type: DIVIDE,
  a,
  b,
});

export const clearList = () => ({ type: CLEAR_LIST });
```

```
src/redux/reducers/calculateReducer.js
```
```javascript
import { MULTIPLY, SUM, SUBTRACT, DIVIDE, CLEAR_LIST } from '../actions';

const INITIAL_STATE = {
  history: [],
  result: 0,
};

const calculateReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MULTIPLY:
      return {
        ...state,
        result: action.a * action.b,
        history: [
          ...state.history,
          `${action.a} x ${action.b} = ${action.a * action.b}`,
        ],
      };
    case SUM:
      return {
        ...state,
        result: action.a + action.b,
        history: [
          ...state.history,
          `${action.a} + ${action.b} = ${action.a + action.b}`,
        ],
      };
    case SUBTRACT:
      return {
        ...state,
        result: action.a - action.b,
        history: [
          ...state.history,
          `${action.a} - ${action.b} = ${action.a - action.b}`,
        ],
      };
    case DIVIDE:
      return {
        ...state,
        result: action.a / action.b,
        history: [
          ...state.history,
          `${action.a} / ${action.b} = ${action.a / action.b}`,
        ],
      };
    case CLEAR_LIST:
      return {
        ...state,
        history: [],
      };
    default:
      return state;
  }
};

export default calculateReducer;
```

## Bônus

### Exercício 4 - Refatore a aplicação para trabalhar apenas com uma *action* 

Nos exercícios anteriores você criou uma *action* específica para cada operação. Agora, você deverá criar uma única *action* que indicará a operação a ser feita além de fornecer os valores para o cálculo.

- Para este exercício crie uma nova branch a partir da **main**

**Requisitos:**
- [ ] Deve existir uma caixa de seleção (*select*) para que a pessoa usuária escolha qual operação deseja realizar
- [ ] O valor desse *select* deve ser guardado no estado do próprio componente
- [ ] Deve existir apenas um único botão para realizar o cálculo com o texto "Calcular"
- [ ] Ao clicar no botão de calcular apenas uma *action* deverá ser despachada para o *reducer*
- [ ] A *action* deverá conter os valores para o cálculo e a operação a ser feita, nesse formato: `{ type: CALCULAR, a, b, operation }`
- [ ] A lógica dos cálculos deverá ser feita apenas dentro do arquivo `calculateReducer.js`
- [ ] Volte a implementar a lógica de limpar o histórico

Dica: você pode criar funções auxiliares dentro do arquivo `calculateReducer.js`, fora da função *reducer*.

```
src/components/Input.jsx
```
```javascript
import { Component } from 'react';
import { connect } from 'react-redux';

import { calculate, clearList } from '../redux/actions';

class Input extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value_1: 0,
      value_2: 0,
      operation: 'sum',
    };
  }

  render() {
    const { value_1, value_2, operation } = this.state;
    const { calculate, clear } = this.props;

    return (
      <div>
        <h1>Calculadora</h1>

        <label htmlFor="value_1">
          <input
            type="number"
            id="value_1"
            name="value_1"
            value={value_1}
            onChange={(e) => this.setState({ value_1: Number(e.target.value) })}
          />
        </label>

        <select
          name="operation"
          id="operation"
          value={operation}
          onChange={(e) => this.setState({ operation: e.target.value })}
        >
          <option value="sum">+</option>
          <option value="subtract">-</option>
          <option value="multiply">*</option>
          <option value="divide">/</option>
        </select>

        <label htmlFor="value_2">
          <input
            type="number"
            id="value_2"
            name="value_2"
            value={value_2}
            onChange={(e) => this.setState({ value_2: Number(e.target.value) })}
          />
        </label>

        <button
          type="button"
          onClick={() => calculate(value_1, value_2, operation)}
        >
          Calcular
        </button>

        <button
          type="button"
          onClick={clear}
        >
          Limpar histórico
        </button>
      </div>
    )
  };
}

const mapDispatchToProps = (dispatch) => ({
  calculate: (a, b, operation) => dispatch(calculate(a, b, operation)),
  clear: () => dispatch(clearList()),
});

export default connect(null, mapDispatchToProps)(Input);
```

```
src/redux/actions/index.js
```
```javascript
export const CALCULATE = 'CALCULATE';
export const CLEAR_LIST = 'CLEAR_LIST';

export const calculate = (a, b, operation) => ({
  type: CALCULATE,
  a,
  b,
  operation,
});

export const clearList = () => ({ type: CLEAR_LIST });
```

```
src/redux/reducers/calculateReducer.js
```
```javascript
import { CALCULATE, CLEAR_LIST } from '../actions';

const INITIAL_STATE = {
  history: [],
  result: 0,
};

const makeCalc = (operation, a, b) => {
  if (operation === 'sum') return a + b;
  if (operation === 'subtract') return a - b;
  if (operation === 'multiply') return a * b;
  if (operation === 'divide') return a / b;
};

const saveCalc = (operation, a, b) => {
  if (operation === 'sum') return `${a} + ${b} = ${a + b}`;
  if (operation === 'subtract') return `${a} - ${b} = ${a - b}`;
  if (operation === 'multiply') return `${a} * ${b} = ${a * b}`;
  if (operation === 'divide') return `${a} / ${b} = ${a / b}`;
};

const calculateReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CALCULATE:
      return {
        ...state,
        result: makeCalc(action.operation, action.a, action.b),
        history: [
          ...state.history,
          saveCalc(action.operation, action.a, action.b),
        ],
      };
    case CLEAR_LIST:
      return {
        ...state,
        history: [],
      };
    default:
      return state;
  }
};

export default calculateReducer;
```
