import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import redX from '../assets/redX.png';
import blueO from '../assets/blueO.png';
import '../Styles/App.css';
import '../Styles/Gameboard.css';

export default function Gameboard(props) {
  const navigate = useNavigate();
  const username = props.username;
  const gameID = props.gameID;
  const pieceTypeO = props.pieceTypeO;
  const [gameboard, setGameboard] = useState([]);

  async function getGameboard(gameID) {
    const response = await axios.get(`http://localhost:8000/getGame/${gameID}`);
    const gameboardData = response.data;
    console.log(gameboardData)
    setGameboard(gameboardData);
  }

  useEffect(() => {
    if (gameID) {
      getGameboard(gameID);
    }
  }, [gameID]);

  return (
    <div className='main-div'>
      <div className='main-subdiv'>
        <div className='top-text'>
          <h1>Hello {username}!</h1>
          <h1>You are playing as {pieceTypeO}.</h1>
        </div>
        <div className='gameboard-div'>
          <table className='gameboard'>
            <tbody>
              {gameboard.map((subArray, i) => (
                <tr key={`subArray-${i}`} className='subArray'>
                  {subArray.map((value, j) => {
                    const row = Math.floor(j / 3);
                    const col = i * 3 + (j % 3);
                    return (
                      <td key={`value-${j}`} className={`value row-${row} col-${col}`}>
                        {value === "X" &&
                        <img src={redX} alt='X' className='x-icon'/>
                        }
                        {value === "O" &&
                        <img src={blueO} alt='O' className='o-icon'/>
                        }
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>

        </div>


        <button onClick={() => navigate(`/joingame`)} type='button' className='button-start'>BACK</button>
        <button onClick={() => navigate(`/`)} type='button' className='button-start'>EXIT</button>
      </div>
    </div>
  );
}