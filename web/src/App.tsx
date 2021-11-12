import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  let [flaskMessage, setFlaskMessage] = useState("Failed to connect to flask.")

  useEffect(() => {
    fetch("http://localhost:5000/api/hello")
    .then((response) => {
      response.text().then((text) => setFlaskMessage(text)).catch(error => console.log(error));
    })
    .catch((error) => console.log(error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
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
          Learn React
        </a>
        <p>
          {flaskMessage}
        </p>
      </header>
    </div>
  );
}

export default App;
