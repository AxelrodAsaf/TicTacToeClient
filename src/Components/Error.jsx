import React from 'react';
import '../Styles/App.css';
import '../Styles/PlayerDisconnected.css';
import { useNavigate } from 'react-router-dom';

export default function Error() {
  const navigate = useNavigate();


  return (
    <div className='main-div'>
      <div className='main-subdiv'>
        <h1 className='draw-h1'> There was an error, sorry about that!! </h1>
        <button style={{ marginTop: "5%" }} onClick={() => navigate(`/`)} type='button' className='home-button'>CLICK HERE TO GO BACK HOME</button>
      </div>
    </div>
  )
}
