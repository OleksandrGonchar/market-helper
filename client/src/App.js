import React from 'react';
import logo from './logo.svg';
import './App.css';

componentDidMount = () => {
  const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
  };
  fetch('/api/database', {
    headers,
    'method': 'POST'
  }).catch(e => console.log())
  .then(data => console.log(data));
}

function App() {
  componentDidMount();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
