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
  const [playerPiece, setPlayerPiece] = useState("X");
  const [gameboard, setGameboard] = useState([]);

  async function getGameboard(gameID) {
    const response = await axios.get(`http://localhost:8000/getGame/${gameID}`);
    console.log(`Response: ${JSON.stringify(response.data)}`);
    const gameboardData = response.data;
    console.log(gameboardData)
    setGameboard(gameboardData.gameboard);
    // Check if the player is player 1 or player 2 in the gameboard data
    if (gameboardData.players[0] === username) {
      setPlayerPiece("O");
    } else if (gameboardData.players[1] === username) {
      setPlayerPiece("X");
    }
  }

  function handleMove(cell) {
    console.log(`Filling ${cell} gamePiece: ${playerPiece}`);
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
          <h1>You are playing as {playerPiece}</h1>
        </div>
        <div className='gameboard-div'>
          <table className='gameboard'>
            <tbody>
              {gameboard.map((subArray, i) => (
                <tr key={`subArray-${i}`} className='subArray'>
                  {subArray.map((value, j) => {
                    const cell = i * 3 + (j % 3);
                    return (
                      <td key={`value-${j}`} className={`value cell-${cell}`} onClick={()=> handleMove(cell)}>
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