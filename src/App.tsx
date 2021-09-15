import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/header/header';
import AppRouter from './AppRouter';

function App() {
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
