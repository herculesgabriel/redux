import DisplayHistory from './components/DisplayHistory';
import DisplayResult from './components/DisplayResult';
import Operations from './components/Operations';

function App() {
  return (
    <div className="App">
      <h1>Calculadora Master</h1>
      <DisplayResult />
      <Operations />
      <DisplayHistory />
    </div>
  );
}

export default App;
