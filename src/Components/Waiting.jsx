
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/App.css';
import '../Styles/Waiting.css';

export default function Waiting(props) {
  const socket = props.socket;
  const gameID = props.gameID;
  const pieceTypeO = props.pieceTypeO;
  const navigate = useNavigate();
  const [buttonText, setButtonText] = useState('COPY GAME ID');
  const [imageSrc, setImageSrc] = useState();

  // When starting the page, check if there is a gameID, if not, redirect to home page
  useEffect(() => {
    if (!gameID) {
      navigate('/');
    }
  }, [gameID, navigate]);

  // Set the image source for the player's game piece
  useEffect(() => {
    if (pieceTypeO) {
      setImageSrc(require('../assets/blueO.png'));
    }
    else {
      setImageSrc(require('../assets/redX.png'));
    }
  }, [setImageSrc, pieceTypeO]);

  // Listen for "startGame" event from the server
  socket.on('startGame', (response) => {
    console.log(`${response.message}`);
    navigate(`/gameboard/:${gameID}`);
  });

  // Copy the game ID to the clipboard
  function copyGameID() {
    navigator.clipboard.writeText(gameID);
    setButtonText("COPIED");
  }


  return (
    <div className='main-div'>
      <div className="main-subdiv">
        <div className='top'>
          <h1>Waiting for the second player to connect...</h1>
          <hr style={{ width: "50%" }} />
          <strong>{gameID}</strong>
          <button onClick={copyGameID}>{buttonText}</button>
        </div>
        <div className='bottom'>
          <h2>You will be playing as:</h2>
          <img src={imageSrc} alt={pieceTypeO ? "BlueO" : "RedX"} />
        </div>
        <button onClick={() => navigate('/')}>BACK</button>
      </div>
    </div >
  )
}
