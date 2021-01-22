import { Provider } from 'react-redux';

import './App.css';
import Input from './components/Input';
import CalculationsList from './components/CalculationsList';
import store from './redux/store';

function App() {
  return (
    <div className="App">
      <Provider store={ store }>
        <Input />
        <CalculationsList />
      </Provider>
    </div>
  );
}

export default App;
