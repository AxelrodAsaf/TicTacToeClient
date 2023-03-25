import React from 'react';
import '../Styles/App.css';
import '../Styles/Xwin.css';
import redX from '../assets/redX.png';
import { useNavigate } from 'react-router-dom';

export default function XWin() {
  const navigate = useNavigate();
  return (
    <div className='main-div'>
      <div className='main-subdiv'>
        <h1 className='xwin-h1'> X WINS! </h1>
        <img src={redX} alt='X' className='xwin-img' />
        <button style={{ marginTop: "5%" }} onClick={() => navigate(`/`)} type='button' className='home-button'>HOME</button>
      </div>
    </div>
  )
}
