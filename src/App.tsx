import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/header/header';
import AppRouter from './AppRouter';
import ServerService from './components/serverService/serverService';

function App() {
  ServerService.createStore();

  return (
    <BrowserRouter>
      <div className="App">
        <Header></Header>
        <AppRouter></AppRouter>
      </div>
    </BrowserRouter>
  );
}

export default App;
