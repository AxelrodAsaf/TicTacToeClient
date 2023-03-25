import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/App.css';
import '../Styles/Waiting.css';

export default function Waiting(props) {
  const gameID = props.gameID;
  const pieceTypeO = props.pieceTypeO;
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState();
  const [gameData, setGameData] = useState();
  const [isGameFull, setIsGameFull] = useState(false);

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

  // Check if there are 2 players in the game
  useEffect(() => {
    async function check() {
      // Find the game with the given gameID
      async function findGame() {
        const response = await axios.get(`http://localhost:8000/getgame/${gameID}`);
        console.log(response.data.players.length);
        setGameData(response.data);
        if (response.data.players.length === 2) {
          setIsGameFull(true);
        }
      }
      if (!isGameFull) {
        await findGame();
      }
    }
    check();
  }, [gameID, gameData, isGameFull]);

  // Navigate to gameboard if the game is full
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isGameFull) {
        navigate(`/gameboard/${gameID}`);
      } else {
        navigate(`/gameboard/${gameID}`);
        clearInterval(intervalId);
      }
    }, 3000);
    return () => clearInterval(intervalId);
  }, [isGameFull, gameID, navigate]);

  // Copy the game ID to the clipboard
  function copyGameID() {
    navigator.clipboard.writeText(gameID);
  }


  return (
    <div className='main-div'>
      <div className="main-subdiv">
        <div className='top'>
          <h1>Waiting for the second player to connect...</h1>
          <hr style={{ width: "50%" }} />
          <strong>{gameID}</strong>
          <button onClick={copyGameID}>COPY GAME ID</button>
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
