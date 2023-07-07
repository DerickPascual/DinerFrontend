import './App.css';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="page">
      <Outlet />
    </div>
  );
}

export default App;
