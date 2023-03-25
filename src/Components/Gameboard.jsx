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
  const [gameData, setGameData] = useState();
  const [player1Piece, setPlayer1Piece] = useState("#");
  const [player2Piece, setPlayer2Piece] = useState("#");

  async function getGameboard(gameID) {
    const response = await axios.get(`http://localhost:8000/getGame/${gameID}`);
    console.log(`Response: ${JSON.stringify(response.data)}`);
    const gameDataResponse = response.data;
    console.log(gameDataResponse)
    setGameData(gameDataResponse);
    setGameboard(gameDataResponse.gameboard);
    // Check if the player is player 1 or player 2 in the gameboard data
    if (gameData.players[0] === username) {
      // Get the player piece from the gameboard data
      setPlayerPiece(gameData.player1Piece);
    } else {
      // Get the player piece from the gameboard data
      setPlayerPiece(gameData.player2Piece);
    }
    setPlayer1Piece(gameData.player1Piece);
    setPlayer2Piece(gameData.player2Piece);
  }

  async function handleMove(cell) {
    console.log(`Filling ${cell} gamePiece: ${playerPiece}`);
    // Make the move by making a request to the server
    const response = await axios.post(`http://localhost:8000/makeMove/${gameID}`, {
      cell: cell,
      playerPiece: playerPiece,
      username: username
    });
    if (response.status === 200) {
      console.log(`Response: ${JSON.stringify(response.data)}`);
    }
    else {
      console.log(`Response: ${JSON.stringify(response.data)}`);
    }
  }

  useEffect(() => {
    if (gameID) {
      getGameboard(gameID);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameID]);

  return (
    <div className='main-div'>
      <div className='main-subdiv'>
        <div className='top-text'>
          <div>
            <h1>{gameData?.players[0]}</h1>
            {player1Piece === "X" &&
              <img style={{ marginBottom: "50%" }} src={redX} alt='X' className='x-icon' />
            }
            {player1Piece === "O" &&
              <img style={{ marginBottom: "50%" }} src={blueO} alt='O' className='o-icon' />
            }
          </div>
          <div>
            <h1>{gameData?.players[1]}</h1>
            {player2Piece === "X" &&
              <img style={{ marginBottom: "50%" }} src={redX} alt='X' className='x-icon' />
            }
            {player2Piece === "O" &&
              <img style={{ marginBottom: "50%" }} src={blueO} alt='O' className='o-icon' />
            }
          </div>
        </div>
        <div className='gameboard-div'>
          <table className='gameboard'>
            <tbody>
              {gameboard.map((subArray, i) => (
                <tr key={`subArray-${i}`} className='subArray'>
                  {subArray.map((value, j) => {
                    const cell = i * 3 + (j % 3);
                    return (
                      <td style={{ cursor: "crosshair" }} key={`value-${j}`} className={`value cell-${cell}`} onClick={() => handleMove(cell)}>
                        {value === "X" &&
                          <img style={{ cursor: "not-allowed" }} src={redX} alt='X' className='x-icon' />
                        }
                        {value === "O" &&
                          <img style={{ cursor: "not-allowed" }} src={blueO} alt='O' className='o-icon' />
                        }
                        {value === "#" &&
                          <p>#</p>
                        }
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          <p>GameID: {gameID}</p>
          <p> Turn to play: </p>
          {gameData?.turn === "X" &&
            <img style={{ marginBottom: "15%" }} src={redX} alt='X' className='x-icon' />
          }
          {gameData?.turn === "O" &&
            <img style={{ marginBottom: "15%" }} src={blueO} alt='O' className='o-icon' />
          }
        </div>

        <div style={{ display: "flex", flexDirection: "row" }}>
          <button style={{ marginTop: "5%" }} onClick={() => navigate(`/joingame`)} type='button' className='button-start'>BACK</button>
          <button style={{ marginTop: "5%" }} onClick={() => navigate(`/`)} type='button' className='button-start'>EXIT</button>
        </div>
      </div>
    </div>
  );
}