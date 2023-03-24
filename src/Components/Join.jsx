import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/App.css';
import '../Styles/Join.css';

export default function Join(props) {
  const navigate = useNavigate();
  const username = props.username;
  const setGameID = props.setGameID;
  const [buttonText, setButtonText] = useState("JOIN");

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