import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/App.css';
import '../Styles/Start.css';

export default function Start(props) {
  const navigate = useNavigate();
  const username = props.username;
  const setUsername = props.setUsername;
  const [tempUsername, setTempUsername] = useState('');

  function defineUsername() {
    setUsername(tempUsername);
  }

  return (
    <div className='main-div'>
      <div className='main-subdiv'>
        <div className='texts-div' style={username ? { display: "none" } : {}}>
          <h1>Welcome to Asaf's Tic-Tac-Toe!</h1>
          <input onChange={(e) => setTempUsername(e.target.value)} type='text' className='input-text' placeholder='Enter your name...' />
          <button onClick={defineUsername}>SUBMIT</button>
        </div>
        <div className='secondStep-div' style={username ? {} : { display: "none" }}>
          <h1>Hello {username}!</h1>
          <h1>How would you like to play?</h1>
          <div className='buttons-div'>
            <button style={{ fontWeight: "bold", textDecoration: "underline" }} onClick={() => navigate(`/hostgame`)} type='button' className='button-start'>HOST A GAME</button>
            <button onClick={() => navigate(`/joingame`)} type='button' className='button-start'>JOIN A GAME</button>
            {/* <button onClick={() => navigate(`/viewgame`)} type='button' className='button-start'>VIEW A GAME</button> */}
          </div>
          <button onClick={() => window.location.reload()}>BACK</button>
        </div>
      </div>
    </div>
  )
}
