import './App.css';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [roomId, setRoomId] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [radius, setRadius] = useState(5);

  return (
    <div className="page">
      <Outlet context={[roomId, setRoomId, latitude, setLatitude, longitude, setLongitude, radius, setRadius]} />
    </div>
  );
}

export default App;
