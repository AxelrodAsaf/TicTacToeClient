import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import redX from '../assets/redX.png';
import blueO from '../assets/blueO.png';
import '../Styles/App.css';
import '../Styles/Gameboard.css';
import LoadingSpinner from './LoadingSpinner';


export default function Gameboard(props) {
  const navigate = useNavigate();
  const username = props.username;
  const gameID = props.gameID;
  const socket = props.socket;
  const [playerPiece, setPlayerPiece] = useState('X');
  const [gameboard, setGameboard] = useState([]);
  const [gameData, setGameData] = useState();
  const [player1Piece, setPlayer1Piece] = useState('#');
  const [player2Piece, setPlayer2Piece] = useState('#');
  const [turnToPlay, setTurnToPlay] = useState();
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {

    socket.emit("getGame", { gameID: gameID });
    console.log("Trying to getGame");
    console.log("setIsLoading: " + isLoading);

    // Listen for "getGameSuccess" event
    socket.on("getGameSuccess", (data) => {
      console.log("getGameSuccess");
      setIsLoading(false);
      console.log("setIsLoading: " + isLoading);
      const gameDataResponse = data.gameData;
      setGameData(gameDataResponse);
      setGameboard(gameDataResponse.gameboard);
      setTurnToPlay(gameDataResponse.turn);

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
    socket.on("getGameError", (data) => {
      const error = data.error;
      console.error(`Error fetching gameboard: ${error}`);
    });

    // Listen for the move event from the server
    socket.on('moveMade', (data) => {
      console.log(`Move received: ${JSON.stringify(data)}`);
      // Update the gameboard state with the new move
      setGameboard(data.game.gameboard);
      setTurnToPlay(data.turn);
    });

    // Listen for the gameOver event from the server
    socket.on('gameOver', (data) => {
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

    // Listen for the playerDisconnected event from the server
    socket.on('playerDisconnected', (data) => {
      console.log(`Player disconnected`);
      navigate('/playerDisconnected');
    });

  }, [gameID, username, navigate, socket, isLoading]);


  function handleExit() {
    socket.emit('removePlayer', { gameID: gameID, username: username });
    console.log("Trying to remove Player");
    navigate('/');
  }

  function handleBack() {
    socket.emit('removePlayer', { gameID: gameID, username: username });
    console.log("Trying to remove Player");
    navigate(`/joingame`);
  }

  function handleMove(cell) {
    console.log(`Trying to fill ${cell} with gamePiece: ${playerPiece}`);
    // Emit the move event to the server using socket.io
    socket.emit('makeMove', {
      gameID: gameID,
      cell: cell,
      playerPiece: playerPiece,
      username: username
    })
  }


  return (
    <div className='main-div'>
      {isLoading ? <LoadingSpinner /> :
      <div className='main-subdiv'>
        <div className='top-text'>
          <div>
            <h1 style={{ textDecoration: "underline" }}>{gameData?.players[0]}</h1>
            {player1Piece === "X" &&
              <img style={{ marginBottom: "50%" }} src={redX} alt='X' className='x-icon' />
            }
            {player1Piece === "O" &&
              <img style={{ marginBottom: "50%" }} src={blueO} alt='O' className='o-icon' />
            }
          </div>
          <div>
            <h1 style={{ textDecoration: "underline" }}>{gameData?.players[1]}</h1>
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
            <tbody className={`${turnToPlay}-border`}>
              {gameboard.map((subArray, i) => (
                <tr key={`subArray-${i}`} className='subArray'>
                  {subArray.map((value, j) => {
                    const cell = i * 3 + (j % 3);
                    return (
                      <td style={{ cursor: "crosshair" }} key={`value-${j}`} className={`value cell-${cell}`} onClick={() => handleMove(cell)}>
                        {value === "X" &&
                          <img style={{ width: "65%", height: "65%", cursor: "not-allowed" }} src={redX} alt='X' className='x-icon' />
                        }
                        {value === "O" &&
                          <img style={{ width: "65%", height: "65%", cursor: "not-allowed" }} src={blueO} alt='O' className='o-icon' />
                        }
                        {value === "#" &&
                          <p></p>
                        }
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <p>GameID: {gameID}</p>
          <p> Turn to play: </p>
          {turnToPlay === "X" &&
            <img style={{ marginBottom: "15%" }} src={redX} alt='X' className='x-icon' />
          }
          {turnToPlay === "O" &&
            <img style={{ marginBottom: "15%" }} src={blueO} alt='O' className='o-icon' />
          }
        </div>

        <div style={{ display: "flex", flexDirection: "row" }}>
          <button style={{ marginTop: "5%" }} onClick={() => handleBack()} type='button' className='button-start'>BACK</button>
          <button style={{ marginTop: "5%" }} onClick={() => handleExit()} type='button' className='button-start'>EXIT</button>
        </div>
      </div>
      }
    </div>
  );
}