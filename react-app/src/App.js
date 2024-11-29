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
    const randomImageUrl = `/images/randimage.png?timestamp=${new Date().getTime()}`;
    console.log("Updating background image to:", randomImageUrl);
    setBgImage(randomImageUrl); // Update state
  };

  // Use useEffect to update the background image on page load
  useEffect(() => {
    updateBackgroundImage();
  }, []);

  return (
    <div
      key={bgImage} // Force re-render when bgImage changes
      className="App"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
      }}
    >
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hola desde la clase.</p>
        <p>Edit <code>src/App.js</code> and save to reload 3.</p>
        <button className="App-button" onClick={fetchGreeting}>
          Say Hi to the backend
        </button>
        <p>{response}</p>
        <button className="App-button" onClick={updateBackgroundImage}>
          Refresh Background Image
        </button>
      </header>
    </div>
  );
}

export default App;
