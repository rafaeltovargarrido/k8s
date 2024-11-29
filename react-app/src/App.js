import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [response, setResponse] = useState(''); // State to hold response from backend
  const [bgImage, setBgImage] = useState(''); // State to hold the dynamic background image URL

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

  // Function to update the background image
  const updateBackgroundImage = () => {
    const randomImageUrl = `/images/randimage.png?timestamp=${new Date().getTime()}`; // Add a timestamp to avoid caching
    setBgImage(randomImageUrl); // Update state with the new image URL
  };

  // Use useEffect to update the background image on page load
  useEffect(() => {
    updateBackgroundImage();
  }, []);

  return (
    <div className="App" style={{ backgroundImage: `url(${bgImage})` }}> {/* Apply dynamic background */}
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
        <button className="App-button" onClick={updateBackgroundImage}>
          Refresh Background Image
        </button> {/* Button to manually refresh the background */}
      </header>
    </div>
  );
}

export default App;
