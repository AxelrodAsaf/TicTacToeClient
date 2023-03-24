import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/App.css';
import '../Styles/Connecting.css';

export default function Connecting(props) {
  const gameID = props.gameID;
  const pieceTypeO = props.pieceTypeO;
  const username = props.username;
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState();

  // When starting the page, check if there is a gameID, if not, redirect to home page
  useEffect(() => {
    if (!gameID) {
      navigate('/');
    }
    if (!username) {
      navigate('/');
    }
  }, [gameID, navigate]);

  useEffect(() => {
    if (!pieceTypeO) {
      setImageSrc(require('../assets/blueO.png'));
    }
    else {
      setImageSrc(require('../assets/redX.png'));
    }
  }, [setImageSrc]);


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


        <div className='bottom'>
          <h2>{username}, you will be playing as:</h2>
          <img src={imageSrc} alt={pieceTypeO ? "BlueO" : "RedX"} />
        </div>
        <button onClick={() => navigate('/')}>BACK</button>
      </div>
    </div >
  )
}
