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
  const socket = props.socket;

  // State variables to keep track of temporary values
  const [tempPieceType, setTempPieceType] = useState();
  const [currentTime, setCurrentTime] = useState();
  const [imageSrc, setImageSrc] = useState();

  // If there is no username, redirect to the start page
  useEffect(() => {
    if (!username) {
      navigate('/');
    }
  }, [username, navigate]);

  // Set the image source and slider value when the component mounts or when the piece type changes
  useEffect(() => {
    setImageSrc(pieceTypeO ? require('../assets/blueO.png') : require('../assets/redX.png'));
  }, [pieceTypeO]);

  // Get the current machine's date and time when the component mounts
  useEffect(() => {
    const date = new Date();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    const time = hour + '' + minute + '' + second;
    setCurrentTime(time);
  }, []);

  // When the piece type changes, update the temporary piece type and image source
  useEffect(() => {
    setTempPieceType(pieceTypeO ? "O" : "X");
    setImageSrc(pieceTypeO ? require('../assets/blueO.png') : require('../assets/redX.png'));
  }, [pieceTypeO]);

  // Make a new variable called "gameID" that is made of the current time, the piece type, and the username
  const tempGameID = currentTime + tempPieceType + username;

  // Set the gameID to the tempGameID variable
  useEffect(() => {
    setGameID(tempGameID);
  }, [tempGameID, setGameID]);

  // When the player wants to create the game, send it to the database and redirect them to the waiting page
  async function handleNext() {
    console.log('Attempting to create game');
    try {
      socket.emit('createGame', {
        username: username,
        pieceTypeO: pieceTypeO,
        gameID: tempGameID,
        player1Piece: tempPieceType
      });
      setGameID(tempGameID);
      navigate('/waiting');
    } catch (error) {
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
          <button style={{ fontWeight: "bold" }} onClick={() => handleNext()}>NEXT</button>
        </div>
      </div>
    </div>
  )
}
