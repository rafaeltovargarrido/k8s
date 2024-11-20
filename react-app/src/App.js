import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';


function App() {
  const [response, setResponse] = useState(''); // State to hold response from backend

  // Function to fetch greeting from the backend
  const fetchGreeting = () => {
    fetch('/api/hi')
        .then((res) => res.text())
      .then((data) => {
        console.log(data); // Log response to console
        setResponse(data); // Set response in state to display on page
      })
      .catch((error) => console.error('Error:', error));
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hola desde la clase.
        </p>
        <p>
          Edit <code>src/App.js</code> and save to reload 3.
        </p>
        <button className="App-button" onClick={fetchGreeting}>
          Say Hi to the backend
        </button>
        <p>{response}</p>
      </header>
    </div>
  );
}

export default App;
