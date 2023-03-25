import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import '../Styles/App.css';
import '../Styles/Connecting.css';

export default function Connecting(props) {
  const gameID = props.gameID;
  const username = props.username;
  const navigate = useNavigate();

  // When starting the page, check if there is a gameID, if not, redirect to home page
  useEffect(() => {
    if (!gameID) {
      navigate('/joingame');
    }
    if (!username) {
      navigate('/');
    }
  }, [gameID, navigate, username]);

  // Connect to the server when the component mounts
  useEffect(() => {
    const socket = io('http://localhost:8000');
    socket.on('connect', () => {
      console.log('Connected to server!');
      // Send the game ID and username to the server to connect to the game
      socket.emit('joinGame', { gameID: gameID, username: username });
    });
    // Disconnect from the server when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, [gameID, username]);

  // When the server sends the 'startGame' event, redirect to the game board
  useEffect(() => {
    const socket = io('http://localhost:8000');
    socket.on('startGame', () => {
      navigate(`/gameboard/${gameID}`);
    });
    // Disconnect from the server when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, [gameID, navigate]);

  return (
    <div className='main-div'>
      <div className="main-subdiv">
        <div className='top'>
          <h1>CONNECTING TO THE GAME</h1>
          <h3>This might take a moment...</h3>
          <hr style={{ width: "50%" }} />
          <h3>Game ID: {gameID}</h3>
          <hr style={{ width: "50%" }} />
        </div>
        <button onClick={() => navigate('/')}>BACK</button>
      </div>
    </div >
  )
}
