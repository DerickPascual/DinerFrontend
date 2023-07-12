import './App.css';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import io from 'socket.io-client';

function App() {
  const [roomId, setRoomId] = useState('');

  return (
    <div className="page">
      <Outlet context={[roomId, setRoomId]}/>
    </div>
  );
}

export default App;
