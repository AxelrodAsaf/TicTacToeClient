import React from 'react';
import '../Styles/App.css';
import '../Styles/Owin.css';
import blueO from '../assets/blueO.png';
import { useNavigate } from 'react-router-dom';

export default function OWin() {
  const navigate = useNavigate();
  return (
    <div className='main-div'>
      <div className='main-subdiv'>
        <h1 className='Owin-h1'> O WINS! </h1>
        <img src={blueO} alt='O' className='Owin-img' />
        <button style={{ marginTop: "5%" }} onClick={() => navigate(`/`)} type='button' className='home-button'>HOME</button>
      </div>
    </div>
  )
}
