import { io } from 'socket.io-client';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/App.css';
import '../Styles/Join.css';

export default function Join(props) {
  const navigate = useNavigate();
  const username = props.username;
  const setGameID = props.setGameID;

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
        console.log("Sending a player2Joined message...")
        socket.emit("player2Joined", "Yes");
        navigate(`/gameboard/:${inputValue}`);
      });

      // Listen for "joinGameError" event from the server
      socket.on('joinGameError', (response) => {
        console.error(response.error);
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
          <button style={{ width: "auto"}} onClick={() => handleJoin()}>JOIN GAME</button>
          <button onClick={() => navigate('/')}>BACK</button>
        </div>
      </div >
    </div >
  )
}
