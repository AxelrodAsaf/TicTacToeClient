import React, { useState } from 'react';
import Start from './Components/Start';
import HostGame from './Components/Host';
import JoinGame from './Components/Join';
// import ViewGame from './Components/View';
import Waiting from './Components/Waiting';
import Connecting from './Components/Connecting';
import Gameboard from './Components/Gameboard';
import Xwin from './Components/Xwin';
import Owin from './Components/Owin';
import Draw from './Components/Draw';
import { Routes, Route } from 'react-router-dom';
import './Styles/App.css';
import { io } from 'socket.io-client';
var socket = null;

function App() {
  const [username, setUsername] = useState('');
  const [pieceTypeO, setPieceTypeO] = useState(false);
  const [gameID, setGameID] = useState('');

  if (socket === null) {
    socket = io(`http://localhost:8000`);
    socket.on('connect', () => {
      console.log('Connected to server!');
    });
  }

  return (
    <div className="App">
      <Routes>
        <Route path={"/"} element={<Start username={username} setUsername={setUsername} pieceTypeO={pieceTypeO} setPieceTypeO={setPieceTypeO} gameID={gameID} setGameID={setGameID} socket={socket} />} />
        <Route path="/hostgame" element={<HostGame username={username} setUsername={setUsername} pieceTypeO={pieceTypeO} setPieceTypeO={setPieceTypeO} gameID={gameID} setGameID={setGameID} socket={socket} />} />
        <Route path="/waiting" element={<Waiting username={username} setUsername={setUsername} pieceTypeO={pieceTypeO} setPieceTypeO={setPieceTypeO} gameID={gameID} setGameID={setGameID} socket={socket} />} />
        <Route path="/joingame" element={<JoinGame username={username} setUsername={setUsername} pieceTypeO={pieceTypeO} setPieceTypeO={setPieceTypeO} gameID={gameID} setGameID={setGameID} socket={socket} />} />
        <Route path="/connecting" element={<Connecting username={username} setUsername={setUsername} pieceTypeO={pieceTypeO} setPieceTypeO={setPieceTypeO} gameID={gameID} setGameID={setGameID} socket={socket} />} />
        <Route path="/Xwin" element={<Xwin />} />
        <Route path="/Owin" element={<Owin />} />
        <Route path="/Draw" element={<Draw />} />
        {/* <Route path="/viewgame" element={<ViewGame  username={username} setUsername={setUsername} pieceTypeO={pieceTypeO} setPieceTypeO={setPieceTypeO} gameID={gameID} setGameID={setGameID} socket={socket}/>} /> */}
        <Route path="/gameboard/:gameID" element={<Gameboard username={username} setUsername={setUsername} pieceTypeO={pieceTypeO} setPieceTypeO={setPieceTypeO} gameID={gameID} setGameID={setGameID} socket={socket} />} />
        <Route path="*" element={<Start username={username} setUsername={setUsername} pieceTypeO={pieceTypeO} setPieceTypeO={setPieceTypeO} gameID={gameID} setGameID={setGameID} socket={socket} />} />
      </Routes>
    </div>
  );
}

export default App;
