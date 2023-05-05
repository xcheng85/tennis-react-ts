import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Header } from './Header';
import { Wta } from './Wta';
import { Atp } from './Atp';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      {/* react fragments */}
      <Header />
      <Outlet />
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Tennis
        </a>
      </header>
      <Wta></Wta>
      <Atp></Atp> */}
    </div>
  );
}

export default App;
