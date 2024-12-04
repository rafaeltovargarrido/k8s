import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [response, setResponse] = useState(''); // State to hold response from backend
  const [responseAdd, setResponseAdd] = useState(''); // State to hold response from backend
  const [responseSize, setResponseSize] = useState(''); // State to hold response from backend
  const [responseDelete, setResponseDelete] = useState(''); // State to hold response from backend
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


  // Function to fetch greeting from the backend
  const fetchRemove = () => {
    fetch('/api/delete')
      .then((res) => res.text())
      .then((data) => {
        console.log(data); // Log response to console
        setResponseDelete(data); // Set response in state to display on page
      })
      .catch((error) => console.error('Error:', error));
  };


  // Function to fetch greeting from the backend
  const fetchAdd = () => {
    fetch('/api/addToList')
      .then((res) => res.text())
      .then((data) => {
        console.log(data); // Log response to console
        setResponseAdd(data); // Set response in state to display on page
      })
      .catch((error) => console.error('Error:', error));
  };


  // Function to fetch greeting from the backend
  const fetchSize = () => {
    fetch('/api/getSize')
      .then((res) => res.text())
      .then((data) => {
        console.log(data); // Log response to console
        setResponseSize(data); // Set response in state to display on page
      })
      .catch((error) => console.error('Error:', error));
  };
  // Function to update the background image
  const updateBackgroundImage = () => {
    const randomImageUrl = `/images/randimage.png?timestamp=${new Date().getTime()}`;
    console.log("Updating background image to:", randomImageUrl);
    setBgImage(randomImageUrl); // Update state with the new image URL
  };

  // Use useEffect to update the background image on page load
  useEffect(() => {
    updateBackgroundImage();
  }, []);

  return (
    <div
      className="App"
    >
      <header className="App-header">
        <img src={bgImage} className="App-logo" alt="Random Logo" /> {/* Use bgImage here */}
        <p>Hola desde la clase.</p>
        <p>Edit <code>src/App.js</code> and save to reload 3.</p>
        <button className="App-button" onClick={fetchGreeting}>
          Say Hi to the backend
        </button>
        <p>{response}</p>

        <button className="App-button" onClick={fetchAdd}>
          Añadir
        </button>
        <p>{responseAdd}</p>

        <button className="App-button" onClick={fetchSize}>
          Tamaño
        </button>
        <p>{responseSize}</p>

        <button className="App-button" onClick={fetchRemove}>
          Eliminar
        </button>
        <p>{responseDelete}</p>        
      </header>
    </div>
  );
}

export default App;
