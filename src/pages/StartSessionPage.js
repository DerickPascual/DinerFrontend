import './StartSessionPage.css';
import { useState } from 'react';
import Header from '../layouts/Header';

export default function SessionStartPage() {
    const [radiusFocused, setRadiusFocused] = useState(false);

    const handleRadiusFocus = () => {
        setRadiusFocused(!radiusFocused);
    }

    return (
        <div>
            <Header />
            <div className="start-session-container">
                <div className="start-session-box">
                    <h3 className="address-prompt">Enter your address</h3>
                    <input className="address-input"></input>
                    <h4>Or, <a className="use-location-anchor">use your current location</a></h4>
                    <h3 className="radius-prompt">Enter a restaurant radius</h3>
                    <h4 className="radius-description">Values between 5 and 50 are accepted.</h4>
                    <div className="radius-input-container">
                        <input className="radius-input" onFocus={handleRadiusFocus} onBlur={handleRadiusFocus}></input>
                        <div 
                            className="radius-label"
                            style={{
                                boxShadow: radiusFocused ? '0 2px 0 rgb(0, 122, 255), 0 -2px 0 rgb(0, 122, 255), 2px 0 0 rgb(0, 122, 255)' : 'none'
                            }}
                        
                        >miles</div>
                    </div>
                    <hr className="divider"/>
                    <button className="start-button">Start your session</button>
                </div>
            </div>
        </div>
    )
};