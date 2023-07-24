import './Home.css';
import Header from '../../layouts/Header.js';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
    const navigate = useNavigate();
    const [pin, setPin] = useState();
    const [error, setError] = useState(false);
    const [roomId, setRoomId] = useOutletContext();

    useEffect(() => {
        setRoomId('');
    },[])

    const handleJoinClick = async () => {
        if (!pin) {
            setError("Sorry! We don't recognize that PIN. Please try again.");
            return;
        }

        const trimmedPin = pin.trim();

        const response = axios.post(process.env.NODE_ENV === 'development' ? 'http://localhost:3500/api/check-room-id' : 'https://api.letsdiner.com/api/check-room-id', {
            roomId: trimmedPin
        }).then(() => {
            setRoomId(trimmedPin);
            navigate('/swipe-session');
        }).catch(() => {
            setError("Sorry! We don't recognize that PIN. Please try again.");
        })
    };

    const handlePinInputChange = (e) => {
        setPin(e.target.value.toUpperCase());
        setError(false);
    }

    const handleStartClick = () => {
        navigate('/start-session');
    };

    return (
        <div className="home-body">
            <div className="home-body-overlay">
            <Header withGradient={true}/>
                <div className="hero-container">
                    <h2 className="hero-proposal">Swipe ➡️, Savor 😋, Repeat 🔁.</h2>
                    {/*<h2 className="hero-question">"Where do <i className="hero-italic">you</i> want to eat?"</h2>*/}
                </div>
                <div className="join-start-container">
                    <div className="join-start-box">
                        <div className="join-container">
                            <div className="join-box">
                                <h3 className="join-prompt">Join a session:</h3>
                                <input
                                    className="join-input"
                                    placeholder="Session PIN"
                                    value={pin}
                                    onChange={handlePinInputChange}
                                    onKeyDown={(e) => e.key === 'Enter' && handleJoinClick()}
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
                            <h3 className='start-prompt'>Or, create one:</h3>
                            <button className="home-button" onClick={handleStartClick}>Start a session</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
};