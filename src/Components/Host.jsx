import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/App.css';
import '../Styles/Host.css';

export default function Host(props) {
  const navigate = useNavigate();
  const username = props.username;
  const pieceTypeO = props.pieceTypeO;
  const setPieceTypeO = props.setPieceTypeO;
  const setGameID = props.setGameID;
  const [tempPieceType, setTempPieceType] = useState();
  const [currentTime, setCurrentTime] = useState();
  const [imageSrc, setImageSrc] = useState();

  // Check to see if there is a user, if not, redirect to start page
  useEffect(() => { if (!username) { navigate('/'); } }, [username, navigate]);

  // When the page renders, set the image src and slider value to X
  useEffect(() => {
      setImageSrc(true);
  }, [pieceTypeO]);

  // When the page renders, get the current machine's date and time
  useEffect(() => {
    const date = new Date();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    const time = hour + '' + minute + '' + second;
    setCurrentTime(time);
  }, []);

  // When the piece type changes, update the piece type in a temp varibale
  useEffect(() => {
    if (pieceTypeO) {
      setTempPieceType("O");
      setImageSrc(require('../assets/blueO.png'));
    }
    else {
      setTempPieceType("X");
      setImageSrc(require('../assets/redX.png'));
    }
  }, [pieceTypeO, setTempPieceType, setImageSrc]);

  // Make a new variable called gameID that is made of the currentTime, the pieceTypeO, and the username
  const tempGameID = currentTime + tempPieceType + username;

  // Set the gameID to the tempGameID variable
  useEffect(() => {
    setGameID(tempGameID);
  }, [tempGameID, setGameID]);

  // When the player wants to create the game, send it to the database and redirect them to the waiting page
  async function handleNext() {
    console.log("Attempting to create game");
    try {
    const response = await axios.post('http://localhost:8000/createGame', {
      username: username,
      pieceTypeO: pieceTypeO,
      gameID: tempGameID
    })
    console.log(response);
    return navigate(`/gameboard/${tempGameID}`); // For testing purposes, send directly to the gameboard
    // return navigate('/waiting');
    }
    catch (error) {
      console.log(error);
    }
  }


  return (
    <div className='main-div'>
      <div className='main-subdiv'>
        <h1>To host a new game {username}, please select what you'd prefer playing as.</h1>

        <div className='slider-options'>
          <img src={imageSrc} alt={pieceTypeO ? "BlueO" : "RedX"} />
          <label className="switch"><input type="checkbox" value={pieceTypeO} defaultChecked={pieceTypeO} onChange={(e) => setPieceTypeO(e.target.checked)} /><span className="slider round"></span></label>
        </div>

        <div className='nav-handles'>
          <button onClick={() => navigate('/')}>BACK</button>
          <button style={{fontWeight: "bold"}} onClick={() => handleNext()}>NEXT</button>
        </div>
      </div>
    </div>
  )
}
