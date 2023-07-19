import './App.css';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [roomId, setRoomId] = useState('');

  return (
    <div className="page">
      <Outlet context={[roomId, setRoomId]} />
    </div>
  );
}

export default App;
