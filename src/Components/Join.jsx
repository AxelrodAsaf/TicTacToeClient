import { io } from 'socket.io-client';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/App.css';
import '../Styles/Join.css';

export default function Join(props) {
  const navigate = useNavigate();
  const username = props.username;
  const setGameID = props.setGameID;
  const [buttonText, setButtonText] = useState("JOIN");

  // Handle the click of the join button
  async function handleJoin() {
    const inputValue = document.getElementById("joinGameID").value;
    setGameID(inputValue);
    console.log(inputValue);

    try {
      // Create a new socket instance
      const socket = io('http://localhost:8000');
      // Send the "joinGame" event to the server with the data
      socket.emit('joinGame', { username: username, gameID: inputValue });

      // Listen for "joinGameSuccess" event from the server
      socket.on('joinGameSuccess', (response) => {
        console.log(response.message);
        // Change the button text to "JOIN GAME" and navigate to "/gameboard" page
        setButtonText("JOIN GAME");
        navigate(`/gameboard/:${inputValue}`);
      });

      // Listen for "joinGameError" event from the server
      socket.on('joinGameError', (response) => {
        console.error(response.error);
        // Change the button text to "JOIN GAME" and display the error message
        setButtonText("JOIN GAME");
        alert(response.error);
      });
    } catch (error) {
      console.log(error);
    }
  }




  return (
    <div className='main-div'>
      <div className="main-subdiv">
        <div className='top'>
          <h1>Hello {username}!</h1>

          <h3>What game would you like to join?</h3>
          <input id="joinGameID" placeholder='Insert Game ID' type={"text"} required />
          <button style={{ width: "auto"}} onClick={() => handleJoin()}>{buttonText}</button>
          <button onClick={() => navigate('/')}>BACK</button>
        </div>
      </div >
    </div >
  )
}
