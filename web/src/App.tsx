import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import CustomerForm from "./CustomerForm";

function App() {

  let [flaskMessage, setFlaskMessage] = useState("Failed to connect to the server.")

  useEffect(() => {
    fetch("http://localhost:5000/api/hello")
    .then((response) => {
      response.text().then((text) => setFlaskMessage(text)).catch(error => console.log(error));
    })
    .catch((error) => console.log(error));
  }, []);

  return (
    <div className="App">
      <CustomerForm/>
    </div>
  );
}

export default App;
