import React from 'react';
import '../Styles/App.css';
import '../Styles/Draw.css';
import { useNavigate } from 'react-router-dom';

export default function Draw() {
  const navigate = useNavigate();
  return (
    <div className='main-div'>
      <div className='main-subdiv'>
        <h1 className='draw-h1'> The game ended in a draw! </h1>
        <button style={{ marginTop: "5%" }} onClick={() => navigate(`/`)} type='button' className='home-button'>HOME</button>
      </div>
    </div>
  )
}
