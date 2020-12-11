# O que vamos aprender?
Hoje você vai aprender a integrar os conhecimentos adquiridos sobre Redux ao React.

# Você será capaz de:
Montar a estrutura necessária para o funcionamento do Redux no React através da criação e integração das seguintes partes:
- store
- reducers
- combineReducers
- Action creators
- Provider
- connect
- mapDispatchToProps
- mapStateToProps

# Por que isso é importante?
Depois de alguns projetos em React você já deve ter percebido como o **state** é importante dentro de sua aplicação. Uma vez que ele é algo que muitos componentes irão ler e atualizar, deixar que a lógica de sua manipulação fique nas mãos de cada trecho de código, em cada um desses componentes, pode facilmente elevar o nível de complexidade de sua aplicação.

Dentro do seu projeto muitas vezes você precisa levar uma informação a vários componentes diferentes, e você normalmente faz isso passando a informação através de **props**. À medida em que a aplicação cresce, o gerenciamento desses estados compartilhados entre os componentes torna-se uma tarefa complicada e desgastante e é aí que o Redux se torna interessante.

Utilizar o Redux para gerenciar o estado dos dados de sua aplicação tem o potencial de tornar o seu código menor, muito mais fácil de entender e de dar manutenção. Uma vez que você entender como as partes se conectam você vai conseguir trazer uma organização muito maior ao seu projeto.

Alguns exemplos de como o Redux facilita o desenvolvimento:

- **Única Fonte da Verdade:** Seu estado é armazenado num único lugar, garantindo uma fonte confiável daquela informação.
- **Código mais organizado:** Toda a manipulação dos dados também é feita num único lugar, facilitando a implementação.
- **Sem *prop drilling*:** O estado fica acessível em qualquer nível da árvore de componentes, eliminando a necessidade de ficar passando **props** pra todo lado.
- **Debug facilitado:** Durante o desenvolvimento, um histórico do seu estado é guardado e disponibilizado como uma espécie de linha do tempo, onde você consegue ver exatamente como seu estado foi sendo modificado ao longo do tempo e quais ações específicas foram responsáveis por essas mudanças.

# Conteúdos
**Tempo sugerido para realização: 30 minutos**

Antes de colocar a mão na massa, vamos relembrar o funcionamento do Redux.

### Store
É o objeto que representa o estado global da aplicação. Nele serão armazenados todos os dados que queremos compartilhar entre os componentes. A `store` será a nossa **Única Fonte da Verdade**.

### Reducers
São funções chamadas cada vez que uma ação é disparada dentro da aplicação. Essas funções são responsáveis por lidar com o gerenciamento do estado dentro da `store` de acordo com a ação recebida.

### Actions
São objetos que representam eventos ocorridos, como o clique de um botão pela pessoa usuária. Elas indicam para os `reducers` quais mudanças devem ser realizadas no estado.

### Dispatch
É a função provida pela `store` responsável por enviar `actions` para os `reducers`.

## Relembrando o fluxo

![](https://i.imgur.com/8DLb77a.png)

Como você pode ver na imagem acima, existe um ciclo claro dentro do Redux:
- Um evento acontece na *user interface* (UI), provocada pela pessoa usuária ou por processos internos do aplicativo
- Esse evento dispara uma `action`
- Essa `action` é enviada através do `dispatch` para a `store`
- A `store` se utiliza dos `reducers` para responder ao evento e manipular o estado conforme necessário
- A mudança de estado provoca uma nova renderização nos componentes que se alimentam das informações providas pela `store`

## Redux com React

Vamos criar uma aplicação React para colocar em prática esses conceitos que acabamos de ver.

Iremos criar uma calculadora simples que, para fins didáticos, faz apenas multiplicações, mas que guarda o histórico dos cálculos feitos em uma lista. No final, você terá um resultado parecido com este:

![](https://i.imgur.com/w8GbtKe.png)

Pode parecer pouco, mas ao final desse dia você terá aprendido muito sobre Redux no React. Animado pra começar? Vamos nessa!

## Primeiros passos
Como toda boa aventura, vamos começar com um **create-react-app**. Abra um terminal do seu Linux, navegue até sua pasta de exercícios e digite o comando abaixo:
```javascript
npx create-react-app redux-calculator
```
Depois que o processo de instalação concluir, abra a pasta criada no Visual Studio Code através dos seguintes comandos:
```bash
cd redux-calculator && code .
```
Vamos precisar instalar duas bibliotecas no nosso projeto para usar o Redux. Instale-as com o seguinte comando:
```bash
npm install redux react-redux
```
Em seguida, vamos criar a estrutura básica do Redux parte por parte. Para facilitar o processo, crie a seguinte estrutura de pastas e arquivos dentro da pasta `src`:

![](https://i.imgur.com/kCLeXSO.png)

Vamos começar pela **store**. Recomendo que você digite cada trecho de código, pois isso ajuda a memorizar os passos. Abra o arquivo `src/redux/store/index.js`. Aqui criaremos o objeto que vai representar o estado global da nossa aplicação:

```javascript
import { createStore } from 'redux';

const store = createStore();

export default store;
```
O `createStore` é uma função que importamos do pacote `redux` que faz exatamente o que o nome sugere: **cria o store**. O primeiro argumento que a função recebe é um `reducer`, que é a função responsável por lidar com as demandas da nossa `store`. Para implementar o `reducer` abra o arquivo `src/redux/reducers/calculateReducer.js` e digite o seguinte código:

```javascript
const INITIAL_STATE = {
  history: [],
  result: 0,
};

const calculateReducer = (state = INITIAL_STATE, action) => {
  return state;
};

export default calculateReducer;
```
Primeiro nós criamos um objeto que representa o estado inicial da aplicação chamado `INITIAL_STATE`. Esse objeto possui uma chave `result`, que guardará o resultado da multiplicação, e uma chave `history`, que é um array que guardará cada multiplicação que fizermos em formato de *string*.

Em seguida criamos o *reducer* propriamente dito, que é a função que vai lidar com a lógica de mexer nesse nosso estado. Por enquanto, ela está apenas retornando o estado atual, mas logo voltaremos aqui para implementar sua lógica.

O `calculateReducer` que exportamos desse arquivo é o *reducer* que precisamos para o `createStore`. Porém, se passarmos apenas ele como parâmetro ele será o **único** *reducer* responsável por manipular toda a store na nossa aplicação. Isso é um problema por si só? Não. Porém, se nossa aplicação cresce e aumentamos o número de manipulações, se torna necessário criar outros reducers para separar bem as responsabilidades. Portanto, é boa prática preparar o terreno para receber outros *reducers* no futuro e fazemos isso através de outra função chamada `combineReducers`.

Abra o arquivo `src/redux/reducers/index.js`. Nele coloque o seguinte código:
```javascript
import { combineReducers } from 'redux';

import calculateReducer from './calculateReducer';

const rootReducer = combineReducers({ calculateReducer });

export default rootReducer;
```

O `combineReducers` é uma função que aceita um objeto como parâmetro. Esse objeto recebe todos os *reducers* que quisermos disponibilizar na nossa aplicação, portanto, se tivéssemos mais de um reducer, essa função ficaria assim, por exemplo:

```javascript
const rootReducer = combineReducers({
  reducerOne,
  reducerTwo,
  reducerThree,
});
```
OBS.: Reparou que passamos apenas o nome do *reducer* dentro do objeto? Graças ao ES6 não precisamos digitar `{ chave: valor }` dentro de um objeto quando queremos usar o mesmo nome como chave. Entretanto, você poderia definir um nome qualquer para guardar o seu reducer, como por exemplo `{ multiplier: calculateReducer }`.

Ao final do arquivo apenas exportamos o `rootReducer`, que guarda todos os nossos *reducers* e é ele mesmo que vamos passar para o nosso `createStore`. Atualizando o `src/redux/store/index.js`:

```javascript
// import { createStore } from 'redux';

import rootReducer from '../reducers';

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

// export default store;
```
Certo. Importamos o `rootReducer` que acabamos de criar e o passamos como parâmetro para o `createStore`, mas o que é esse segundo parâmetro? Não precisa se preocupar em entender como ele funciona, mas o que ele faz é permitir que você possa usar a **extensão do Redux no navegador** para facilitar o desenvolvimento, tal como usamos a extensão *Components*, do React, pois ela permite verificar todo o fluxo de *actions* e estado acontecendo em tempo real.

Bem, agora só falta implementar a lógica da multiplicação no nosso *reducer*. Como o Redux funciona orientado aos eventos, precisamos criar a representação desse evento, que é o que chamamos de **actions**.

Para tal, vamos abrir o arquivo `src/redux/actions/index.js` e criar a seguinte estrutura:
```javascript
export const MULTIPLY = 'MULTIPLY';

export const multiply = (a, b) => ({
  type: MULTIPLY,
  a,
  b,
});
```
O `multiply` é uma **action creator** e, se você bem lembra, nada mais é do que uma função que retorna um objeto. Esse objeto é a nossa *action* e, por sua vez, precisa ter obrigatoriamente uma chave `type` que guarda uma *string* representando a ação a ser realizada.

Observe também que é que boa prática criar uma variável apenas para guardar essa *string*, do jeitinho como fizemos no código, e ainda a exportamos para usar no arquivo do *reducer* mais tarde.

Além disso, como esse objeto pode ter outras informações que sejam necessárias para aquela ação, estamos passando também dois valores, `a` e `b`, que receberemos como parâmetros na hora de chamarmos a função.

Pode parecer um pouco confuso agora, uma vez que estamos criando primeiro a estrutura de uma aplicação pronta, mas enquanto você estiver desenvolvendo seus próprios códigos ficará mais claro perceber o que sua `action creator` deve ter de informação. Por ora, apenas entenda que quando chamarmos essa função precisamos fornecer a ela os dois valores que queremos multiplicar e o *reducer* que se encarregue de fazer acontecer.

Por fim, no arquivo `src/redux/reducers/calculateReducer.js`:

```javascript
import { MULTIPLY } from '../actions';

// const INITIAL_STATE = {
//   history: [],
//   result: 0,
// };

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
    default:
      return state;
  }
};

// export default calculateReducer;
```

Uau, quanta coisa! Vamos por partes.

Primeiro importamos aquela variável que criamos no arquivo com as nossas *actions* para usar dentro da função `calculateReducer`. Essa função, por sua vez, é executada toda vez que uma *action* é disparada e recebe dois parâmetros: o `state` atual e a `action` disparada.

No nosso caso, a *action* que ele recebe é o objeto retornado da *action creator* `multiply` que criamos anteriormente. Apenas para relembrar a estrutura desse objeto:

```javascript
// export const multiply = (a, b) => (
  {
    type: MULTIPLY,
    a,
    b,
  }
// );
```

O *switch* verifica se o `type` da nossa *action* é 'MULTIPLY' e, em caso positivo, ele **retorna um novo objeto** que será o nosso **novo estado**. Lembre-se: nós **nunca** modificamos diretamente o estado atual; cada vez que quisermos modificar o estado, nós criamos uma cópia desse objeto com os novos valores e o retornamos, de modo que o estado anterior fique intacto. Isso é parte de como o Redux funciona e, caso você modifique o estado diretamente, sua aplicação vai se comportar de forma diferente do esperado.

Respeitando o que acabamos de ler acima, observe o que fizemos:
- Criamos um novo objeto: `{}`
- Copiamos dentro dele o estado anterior usando o spread: `{ ...state }`

No nosso exemplo atual isso não é necessário, pois iremos atualizar diretamente as duas únicas chaves dentro de nosso estado (`result` e `history`), mas é boa prática, pois assim outras chaves seriam automaticamente copiadas caso as implementássemos no futuro. Assim a gente não precisa reescrever cada *case* depois.
- Atualizamos a chave `result` com o valor resultante da multiplicação dos valores que a `action` carregava: `{ result: action.a * action.b }`

Essa chave guarda o valor atual da multiplicação.
- Atualizamos a chave `history` adicionando a representação dessa multiplicação ao array que ela continha.

A chave `history` é um array que contém dados no seguinte formato `'n1 x n2 = n3'`. Ou seja, caso a conta seja `3 x 6` queremos adicionar ao array a seguinte string `'3 x 6 = 18'`. Por que não usamos o método `push()`? Pois ele modifica o *array* original e não queremos isso. Portanto, apenas copiamos os valores que já existem lá dentro e colocamos o novo valor `[ ...state.history, novaString ]`. 

Pronto! Finalizamos a criação de toda a lógica da nossa aplicação no que diz repeito ao uso do Redux. Agora, vamos ver como consumimos essas informações dentro dos nossos componentes React.

## Criando os componentes

Dentro da pasta `src` vamos criar uma pasta chamada `components` e dois componentes dentro dela, `Input.jsx` e `CalculationsList.jsx`.

![](https://i.imgur.com/w4gVzZr.png)

Antes de partirmos para o código desses componentes, vamos importá-los dentro do `App.js` e conhecer a estrutura necessária para termos acesso ao Redux por toda a aplicação.

```javascript
import './App.css';

import Input from './components/Input';
import CalculationsList from './components/CalculationsList';

function App() {
  return (
    <>
      <Input />
      <CalculationsList />
    </>
  );
}

export default App;
```

Como esses componentes precisam ter acesso à nossa *store*, precisaremos envolvê-los com o componente `Provider`, fornecido pelo pacote `react-redux` e passar a `store` que criamos como *props* para ele:

```javascript
import { Provider } from 'react-redux';
// import './App.css';

import store from './redux/store';

/* import Input from './components/Input';
import CalculationsList from './components/CalculationsList';

function App() {
  return ( */
    <Provider store={store}>
      <Input />
      <CalculationsList />
    </Provider>
/*   );
}

export default App; */
```

Agora, os componentes `<Input />` e `<CalculationsList />`, bem como qualquer componente dentro deles, ou seja, abaixo na árvore, em qualquer nível, têm acesso ao nosso estado global.

Para entender como acessamos esse estado dentro dos componentes, vamos abrir o arquivo `src/components/Input.jsx` e digitar o seguinte código:

``` javascript
import { Component } from 'react';

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

    return (
      <div>
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
          onClick={/* aqui pediremos ao Redux para fazer a multiplicação */}
        >
          Multiplicar
        </button>
      </div>
    )
  };
}

export default Input;
```
Até aqui, esse é um código que você já deve estar bem familiarizado. Gaste um tempo entendendo o que ele faz, pois não tem nada que você já não tenha visto antes. Basicamente temos dois inputs que têm seus valores armazenados no *state* do componente e, ao clicarmos no botão, queremos enviar esses valores através de uma *action* para o *reducer* que vai cuidar de fazer a multiplicação pra gente.

Agora, implementaremos a parte de código do Redux e a explicação do que cada trecho faz vem em seguida:

```javascript
// import { Component } from 'react';
import { connect } from 'react-redux';

import { multiply } from '../redux/actions';

/* class Input extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value_1: 0,
      value_2: 0,
    };
  }

  render() {
    const { value_1, value_2 } = this.state; */
    const { makeMultiplication } = this.props;

    /* return (
      <div>
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
          type="button" */
          onClick={() => makeMultiplication(value_1, value_2)}
        /* >
          Multiplicar
        </button>
      </div>
    )
  };
} */

const mapDispatchToProps = (dispatch) => ({
  makeMultiplication: (a, b) => dispatch(multiply(a, b)),
});

export default connect(null, mapDispatchToProps)(Input);
```

Mais uma vez: por partes.

- Importamos a função `connect` do pacote `react-redux` e a utilizamos na exportação do componente

Essa sintaxe pode parecer muito estranha a princípio, mas perceba o que está acontecendo: `connect` é uma função e como abrimos parênteses logo em seguida, significa que estamos executando-a, passando `null` e `mapDispatchToProps` como parâmetros (falaremos sobre eles logo mais). Depois de executada, essa função retorna uma nova função; como estamos colocando outro parênteses, estamos executando esse função retornada, passando o `Input` como parâmetro. Legal, não é?! O fluxo é basicamente esse:
```
function1(param1, param2) { return function2 };
function2(Componente) { return ComponenteTurbinado };
```
- Criamos uma função chamada `mapDispatchToProps` que nos fornecerá acesso ao `dispatch` do Redux, retornando um objeto com os *dispatches* que precisarmos

Essa função recebe como parâmetro o `dispatch`, que é a função da nossa *store* responsável por enviar as *actions* ao *reducer*, lembra? Criamos uma chave chamada `makeMultiplication` que guarda uma função. Essa função é a execução do `dispatch` que recebemos como parâmetro. Dentro da *dispatch* precisamos ter a *action* que queremos enviar, certo? Portanto, em vez de a escrevermos diretamente dentro do `dispatch`, vamos importar a função que nós já criamos que retorna essa *action*, a `multiply`:
```javascript
import { multiply } from '../redux/actions';
```
E a executamos dentro do dispatch para que ela nos retorne a *action*:
```javascript
dispatch(multiply())
```
Quando precisarmos enviar essa action, só precisamos executar a chave `makeMultiplication`. E onde acessamos essa chave? A resposta está no nome que demos para a função: `mapDispatchToProps`. Exatamente. Estamos fazendo um "mapeamento" de dispatches para a *props* do componente. Portanto, toda chave criada dentro dessa função fica acessível como *props* dentro do próprio componente. Nesse caso, teremos uma *prop* chamada `makeMultiplication` no nosso componente `<Input />`.

- Uma vez que temos o `makeMultiplication` como *props*, podemos utilizá-lo dentro do nosso botão
```javascript
// const { value_1, value_2 } = this.state;
const { makeMultiplication } = this.props;
// ...
// <button
  // type="button"
  onClick={() => makeMultiplication(value_1, value_2)}
// >
  // Multiplicar
// </button>
// ...
// const mapDispatchToProps = (dispatch) => ({
  makeMultiplication: (a, b) => dispatch(multiply(a, b)),
// });
```

- Por fim, passamos a função que faz o mapeamento dentro do `connect`

Passamos a `mapDispatchToProps` como segundo parâmetro, pois o primeiro é reservado para quando queremos ler o estado do Redux. Como não precisamos fazer isso nesse componente, passamos `null` como valor desse parâmetro:
```javascript
export default connect(null, mapDispatchToProps)(Input);
```

Agora, abra o arquivo `src/components/CalculationsList.jsx`. Como esse componente não tem nenhuma funcionalidade além de ler o estado e mostrar em tela, sua implementação é bem mais simples:

```javascript
import { connect } from 'react-redux';

function CalculationsList({ history, result }) {
  return (
    <>
      <h2>Resultado</h2>
      <p>{result}</p>
      
      <h2>Histórico</h2>
      <ul>
        {history.map((entry, index) => <li key={`${entry}-${index}`}>{entry}</li>)}
      </ul>
    </>
  );
}

const mapStateToProps = (state) => ({
  history: state.calculateReducer.history,
  result: state.calculateReducer.result,
});

export default connect(mapStateToProps)(CalculationsList);
```
Novamente importamos o `connect` para termos acesso ao Redux dentro do nosso componente. Dessa vez criamos uma função que recebe como parâmetro o estado global da aplicação, a `store` propriamente dita.

Como o nome da função já indica, estamos fazendo o mapeamento do estado para a *props* do componente. Se você bem se lembra, o nosso *state* tem a seguinte estrutura:
```javascript
{
  history: [],
  result: 0,
};
```
Como temos acesso a esse estado através do reducer apropriado que passamos como parâmetro dentro do `createStore`, nós o acessamos dessa forma:
```javascript
state.calculateReducer.history
```

Recebemos `history` como *props* e, já que se trata de um *array*, podemos fazer um *map* para exibir seu conteúdo dentro de uma lista.

Note que dessa vez passamos apenas um primeiro parâmetro para o `connect`, sendo ele a função que têm acesso ao estado global. Portanto, os dois parâmetros que ela recebe são uma função que acessa a `store` e uma função que acessa o `dispatch`, semelhantes a `store.getState()` e `store.dispatch()` do Redux. Os nomes que demos a essas funções são apenas convenção, pois facilitam o entendimento do que elas fazem.

## Considerações finais
Finalmente! Chegamos ao fim da nossa aplicação e eu imagino que você deve estar no mínimo impressionado com tanto conteúdo. Antes de mais nada: calma. Realmente são muitas partes para conectar, mas depois que você praticar vai ficando mais óbvio o que fica aonde.

Dá uma olhada na aplicação que acabamos de criar, testa no seu navegador, dá uma olhada nos códigos e não se esquece de usar a extensão do Redux no navegador:

![](https://i.imgur.com/DY9DfzP.png)

Logo mais você vai estar dominando o Redux e, consequentemente, dominando o mundo.

# Exercícios
Agora que você viu como todas partes se conectam, que tal praticamos um pouco?

Nesses exercícios você vai se utilizar do código que desenvolvemos hoje para adicionar novas funcionalidades ao nosso aplicativo.

Recomendamos que você crie uma branch para realizar cada exercício. Não se preocupe, pois iremos te guiar nesse processo em cada exercício. Para relembrar:

**Criar nova branch e mudar para ela**
```bash
git checkout -b novaBranch
```
**Trocar de branch**
```bash
git checkout main
```

### Exercício 1 - Adicione a operação de soma

Atualmente só é possível fazer contas de multiplicação. Implemente a operação de soma na aplicação.

- Para este exercício crie uma nova branch a partir da **main**

**Requisitos:**
- [ ] A implementação deverá ser feita adicionando **mais um botão** na tela com o texto "Somar"
- [ ] Cada botão deverá ser responsável por realizar um tipo de operação

### Exercício 2 - Permita apagar o histórico

Faça com que seja possível apagar todo o histórico de cálculos feitos anteriormente.

- Para este exercício crie uma nova branch a partir da branch que você criou no exercício 1

**Requisitos:**
- [ ] A implementação deverá ser feita adicionando **mais um botão** na tela com o texto "Limpar histórico"
- [ ] Ao clicar no botão de apagar a lista deve ficar vazia e, portanto, não aparecer mais em tela
- [ ] O resultado do último cálculo deverá continuar aparecendo na tela
- [ ] Caso a pessoa usuária faça uma nova operação, a representação do cálculo deverá aparecer normalmente como o primeiro item da lista

### Exercício 3 - Implemente as quatro operações matemáticas 

Adicione as outras duas operações à aplicação. No entanto, dessa vez um único botão deve solicitar o cálculo.

- Para este exercício crie uma nova branch a partir da branch que você criou no exercício 2

**Requisitos:**
- [ ] Além do botão de limpar a lista criado no último exercício, **deve existir apenas um botão com o texto "Calcular"**
- [ ] Deve existir uma caixa de seleção (*select*) para que a pessoa usuária escolha qual operação deseja realizar
- [ ] O valor desse *select* deve ser guardado no estado do próprio componente
- [ ] Ao clicar no botão calcular **o componente deve decidir qual *action* será enviada**, correspondente à operação que o usuário escolher
- [ ] Você deve criar uma função dentro do componente para lidar com a lógica desse clique

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

## Recursos Adicionais (opcional)

- [Documentation - React Redux: Quick Start](https://react-redux.js.org/introduction/quick-start)
- [Extensão - Redux Devtools Extension](https://github.com/zalmoxisus/redux-devtools-extension#installation)
- [Artigo: Entenda Redux de Uma Vez por Todas](https://medium.com/@hliojnior_34681/entenda-react-e-redux-de-uma-vez-por-todas-c761bc3194ca)
- [Curso - Getting Started with Redux - by Dan Abramov](https://egghead.io/courses/getting-started-with-redux)
- [Artigo: Iniciando com Redux](https://medium.com/reactbrasil/iniciando-com-redux-c14ca7b7dcf)
