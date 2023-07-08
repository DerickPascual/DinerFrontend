import './StartSessionPage.css';
import { useState } from 'react';
import Header from '../layouts/Header';

export default function SessionStartPage() {
    const [address, setAddress] = useState();
    const [addressError, setAddressError] = useState();
    const [radius, setRadius] = useState(5);
    const [radiusFocused, setRadiusFocused] = useState(false);
    const [radiusError, setRadiusError] = useState();

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
        setAddressError('');
    }

    const handleRadiusFocus = () => {
        setRadiusFocused(!radiusFocused);
    }

    const handleRadiusChange = (e) => {
        setRadius(e.target.value);
        setRadiusError('');
    }

    const handleStartClick = () => {
        setRadiusError("Invalid radius.");
        setAddressError("Invalid address.");
    }

    return (
        <div>
            <Header />
            <div className="start-session-container">
                <div className="start-session-box">
                    <div className="address-form-container">
                        <h3 className="address-prompt">Enter your address</h3>
                        <input
                            className="address-input"
                            placeholder="Enter your address"
                            value={address}
                            onChange={handleAddressChange}
                            style={{
                                backgroundColor: addressError && 'rgb(255, 228, 226)',
                                outline: addressError && 'rgb(255, 59, 48) solid 2px'
                            }}
                        ></input>
                        <h4 className="use-location-text">Or, <a className="use-location-anchor">use your current location</a></h4>
                        {addressError &&
                            <h4 className="error-message">{addressError}</h4>
                        }
                    </div>
                    <div className="radius-form-container">
                        <h3 className="radius-prompt">Enter a restaurant radius</h3>
                        <h4 className="radius-description">Values between 5 and 50 are accepted.</h4>
                        <div
                            className="radius-input-container"
                            style={{
                                outline: radiusError && 'rgb(221, 65, 56) solid 2px'
                            }}
                        >
                            <input
                                className="radius-input"
                                onFocus={handleRadiusFocus}
                                onBlur={handleRadiusFocus}
                                value={radius}
                                onChange={handleRadiusChange}
                                style={{
                                    backgroundColor: radiusError && 'rgb(255, 228, 226)'
                                }}
                            >
                            </input>
                            <div
                                className="radius-label"
                                style={{
                                    boxShadow: radiusFocused ? '0 2px 0 rgb(0, 122, 255), 0 -2px 0 rgb(0, 122, 255), 2px 0 0 rgb(0, 122, 255)' : 'none',
                                    backgroundColor: radiusError && 'rgb(220, 195, 195)'
                                }}

                            >miles</div>
                        </div>
                        {radiusError &&
                            <h4 className="error-message">{radiusError}</h4>
                        }
                    </div>
                    <hr className="divider" />
                    <button className="start-button" onClick={handleStartClick}>Start your session</button>
                </div>
            </div>
        </div>
    )
};