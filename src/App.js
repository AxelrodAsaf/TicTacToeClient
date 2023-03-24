import React, { useState } from 'react';
import Start from './Components/Start';
import HostGame from './Components/Host';
import JoinGame from './Components/Join';
import ViewGame from './Components/View';
import Waiting from './Components/Waiting';
import Connecting from './Components/Connecting';
import Gameboard from './Components/Gameboard';
import { Routes, Route } from 'react-router-dom';
import './Styles/App.css';

function App() {
  const [username, setUsername] = useState('');
  const [pieceTypeO, setPieceTypeO] = useState(false);
  const [gameID, setGameID] = useState('');

  return (
    <div className="App">
      <Routes>
        <Route path={"/"} element={<Start username={username} setUsername={setUsername} pieceTypeO={pieceTypeO} setPieceTypeO={setPieceTypeO} gameID={gameID} setGameID={setGameID} />} />
        <Route path="/hostgame" element={<HostGame username={username} setUsername={setUsername} pieceTypeO={pieceTypeO} setPieceTypeO={setPieceTypeO} gameID={gameID} setGameID={setGameID} />} />
        <Route path="/waiting" element={<Waiting username={username} setUsername={setUsername} pieceTypeO={pieceTypeO} setPieceTypeO={setPieceTypeO} gameID={gameID} setGameID={setGameID} />} />
        <Route path="/joingame" element={<JoinGame username={username} setUsername={setUsername} pieceTypeO={pieceTypeO} setPieceTypeO={setPieceTypeO} gameID={gameID} setGameID={setGameID} />} />
        <Route path="/connecting" element={<Connecting  username={username} setUsername={setUsername} pieceTypeO={pieceTypeO} setPieceTypeO={setPieceTypeO} gameID={gameID} setGameID={setGameID} />} />
        <Route path="/viewgame" element={<ViewGame  username={username} setUsername={setUsername} pieceTypeO={pieceTypeO} setPieceTypeO={setPieceTypeO} gameID={gameID} setGameID={setGameID} />} />
        <Route path="/gameboard/:gameID" element={<Gameboard  username={username} setUsername={setUsername} pieceTypeO={pieceTypeO} setPieceTypeO={setPieceTypeO} gameID={gameID} setGameID={setGameID} />} />
        <Route path="*" element={<Start username={username} setUsername={setUsername} pieceTypeO={pieceTypeO} setPieceTypeO={setPieceTypeO} gameID={gameID} setGameID={setGameID} />} />
      </Routes>
    </div>
  );
}

export default App;
