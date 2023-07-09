import './Home.css';
import Header from '../layouts/Header.js';
import { useNavigate } from 'react-router-dom'; 
import { useState } from 'react';

export default function Home() {
    const navigate = useNavigate();
    const [pin, setPin] = useState();
    const [error, setError] = useState(false);

    const handleJoinClick = () => {
        setError("Sorry! We don't recognize that PIN. Please try again.");
    };

    const handlePinInputChange = (e) => {
        setPin(e.target.value);
        setError(false);
    }

    const handleStartClick = () => {
        navigate('/start-session');
    };

    return (
        <div>
            <Header />
            <div className="hero-container">
                <h2 className="hero-proposal">A simple, Tinder for restaurants web app.</h2>
                {/*<h2 className="hero-question">"Where do <i className="hero-italic">you</i> want to eat?"</h2>*/}
            </div>
            <div className="join-container">
                <div className="join-box">
                    <h3 className="join-prompt">Join a session</h3>
                    <input 
                        className="join-input"
                        placeholder="Session PIN"
                        value={pin}
                        onChange={handlePinInputChange}
                        style={{
                            backgroundColor: error ? 'rgb(255, 228, 226)' : 'white',
                            outline: error && 'rgb(255, 59, 48) solid 2px'
                        }}
                        ></input>
                    {
                        error &&
                        <h4 className='error-message'>{error}</h4>
                    }
                    <div className="join-button-container">
                        <button className="home-button" onClick={handleJoinClick}>Enter</button>
                    </div>
                </div>
            </div>
            <div className="start-container">
                <h3 className='start-prompt'>Or...</h3>
                <button className="home-button" onClick={handleStartClick}>Start a session</button>
            </div>
        </div>
    )
};