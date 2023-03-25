import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

  // Set a timer for 3 seconds and then redirect to home page
  useEffect(() => {
    setTimeout(() => {
      navigate(`/gameboard/${gameID}`);
    }, 1500);
  }, [navigate, gameID]);

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
