import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/App.css';
import '../Styles/View.css';

export default function View(props) {
  const navigate = useNavigate();
  const pieceTypeO = props.pieceTypeO;
  const username = props.username;
  const [imageSrc, setImageSrc] = useState();



  // Notice that this useEffect has the opposite picture for Player2
  useEffect(() => {
    if (pieceTypeO) {
      setImageSrc(require('../assets/redX.png'));
    }
    else {
      setImageSrc(require('../assets/blueO.png'));
    }
  }, [setImageSrc]);


  return (
    <div className='main-div'>
      <div className="main-subdiv">
        <div className='top'>
          <h1>Hello {username}!</h1>

          <h3>What game would you like to view?</h3>
          <input placeholder='Insert Game ID' type={"text"} required />
          <button onClick={() => navigate(`/waiting`)}>VIEW GAME</button>
          <button onClick={() => navigate('/')}>BACK</button>
        </div>

        {/*     <div className='bottom'>
          <hr style={{ width: "50%" }} />
          <h2>You will be playing as:</h2>
          <img src={imageSrc} alt={pieceTypeO ? "BlueO" : "RedX"} />
        </div>
        <button onClick={() => navigate('/')}>BACK</button>
      </div> */}
      </div >
    </div >
  )
}