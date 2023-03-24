import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/App.css';
import '../Styles/Join.css';

export default function Join(props) {
  const navigate = useNavigate();
  const pieceTypeO = props.pieceTypeO;
  const username = props.username;
  const gameID = props.gameID;
  const setGameID = props.setGameID;
  const [imageSrc, setImageSrc] = useState();
  const [buttonText, setButtonText] = useState("JOIN");

  // Notice that this useEffect has the opposite picture for Player2
  useEffect(() => {
    if (pieceTypeO) {
      setImageSrc(require('../assets/redX.png'));
    }
    else {
      setImageSrc(require('../assets/blueO.png'));
    }
  }, [setImageSrc]);

  // Handle the click of the join button
  function handleJoin() {
    const inputValue = document.getElementById("joinGameID").value;
    setGameID(inputValue);
    console.log(inputValue);

    // Change the button text to "LOADING..." for 2 seconds
    setButtonText("LOADING...");
    setTimeout(() => {
      setButtonText("JOIN GAME");
      navigate(`/connecting`);
    }, 2000);
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
        {/* <div className='bottom'>
          <hr style={{ width: "50%" }} />
          <h2>You will be playing as:</h2>
          <img src={imageSrc} alt={pieceTypeO ? "BlueO" : "RedX"} />
        </div>
        <button onClick={() => navigate('/')}>BACK</button> */}
      </div >
    </div >
  )
}
