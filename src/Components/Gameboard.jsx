import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import redX from '../assets/redX.png';
import blueO from '../assets/blueO.png';
import '../Styles/App.css';
import '../Styles/Gameboard.css';

export default function Gameboard(props) {
  const navigate = useNavigate();
  const username = props.username;
  const gameID = props.gameID;
  const [playerPiece, setPlayerPiece] = useState('X');
  const [gameboard, setGameboard] = useState([]);
  const [gameData, setGameData] = useState();
  const [player1Piece, setPlayer1Piece] = useState('#');
  const [player2Piece, setPlayer2Piece] = useState('#');
  const socketRef = useRef();

  function getGameboard(gameID) {
    socketRef.current.emit("getGame", { gameID: gameID });
  }

  useEffect(() => {
    if (gameID) {
      // Connect to the server using socket.io
      socketRef.current = io.connect('http://localhost:8000');
      getGameboard(gameID);
      // Listen for "getGameSuccess" event
      socketRef.current.on("getGameSuccess", (data) => {
        const gameDataResponse = data.gameData;
        console.log(`Response: ${JSON.stringify(gameDataResponse)}`);
        setGameData(gameDataResponse);
        setGameboard(gameDataResponse.gameboard);
        // Check if the player is player 1 or player 2 in the gameboard data
        if (gameDataResponse.players[0] === username) {
          // Get the player piece from the gameboard data
          setPlayerPiece(gameDataResponse.player1Piece);
        } else {
          // Get the player piece from the gameboard data
          setPlayerPiece(gameDataResponse.player2Piece);
        }
        setPlayer1Piece(gameDataResponse.player1Piece);
        setPlayer2Piece(gameDataResponse.player2Piece);
      });
      // Listen for "getGameError" event
      socketRef.current.on("getGameError", (data) => {
        const error = data.error;
        console.error(`Error fetching gameboard: ${error}`);
      });
      // Listen for the move event from the server
      socketRef.current.on('moveMade', (data) => {
        console.log(`Move received: ${JSON.stringify(data)}`);
        // Update the gameboard state with the new move
        setGameboard(data.gameboard);
      });
      // Listen for the gameOver event from the server
      socketRef.current.on('gameOver', (data) => {
        console.log(data.winner)
        if (data.winner === "X") {
          return navigate('/Xwin');
        }
        if (data.winner === "O") {
          return navigate('/Owin');
        }
        if (data.winner === "T") {
          return navigate('/Draw');
        }
        // Redirect to the lobby page when the game is over
        navigate('/');
      });
    }
    // Clean up the socket connection when the component unmounts
    return () => {
      console.log("Disconnecting from server");
      socketRef.current.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameID]);

  function handleMove(cell) {
    console.log(`Attempting to fill ${cell} with gamePiece: ${playerPiece}`);
    // Emit the move event to the server using socket.io
    socketRef.current.emit('makeMove', {
      gameID: gameID,
      cell: cell,
      playerPiece: playerPiece,
      username: username
    })
  }






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