import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/App.css';
import '../Styles/Join.css';

export default function Join(props) {
  const navigate = useNavigate();
  const socket = props.socket;
  const username = props.username;
  const setGameID = props.setGameID;
  const [tempInputValue, setTempInputValue] = useState('');

  // Listen for "startGame" event from the server
  socket.on('startGame', (response) => {
    console.log(`${response.message}`);
    navigate(`/gameboard/:${tempInputValue}`);
  });

  // Listen for "joinGameError" event from the server
  socket.on('joinGameError', (response) => {
    console.error(response.error);
    navigate(`/`);
  });


  // Handle the click of the join button
  async function handleJoin() {
    const inputValue = tempInputValue;
    setGameID(inputValue);
    console.log(inputValue);

    try {
      // Send the "joinGame" event to the server with the data
      console.log("Emitting 'joinGame' event");
      socket.emit('joinGame', { gameID: inputValue, username: username });
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
          <input id="joinGameID" placeholder='Insert Game ID' type={"text"} required onChange={(e) => setTempInputValue(e.target.value)} />
          <button style={{ width: "auto" }} onClick={() => handleJoin()}>JOIN GAME</button>
          <button onClick={() => navigate('/')}>BACK</button>
        </div>
      </div >
    </div >
  )
}
