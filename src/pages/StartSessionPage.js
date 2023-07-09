import './StartSessionPage.css';
import { useState, useEffect } from 'react';
import Header from '../layouts/Header';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

export default function SessionStartPage() {
    const [address, setAddress] = useState();
    const [addressError, setAddressError] = useState();
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
    const [radius, setRadius] = useState(10);
    const [radiusFocused, setRadiusFocused] = useState(false);
    const [invalidRadius, setInvalidRadius] = useState(false);
    const [radiusError, setRadiusError] = useState();

    useEffect(() => {
        if (latitude && longitude) {
            setAddressError('');
        }
    }, [latitude, longitude]);

    const success = (location) => {
        setAddress();
        setLatitude(location.coords.latitude);
        setLongitude(location.coords.longitude);
    }

    const handleUseLocationClick = () => {
        if (navigator.geolocation) {
            navigator.permissions
                .query({ name: "geolocation" })
                .then((result) => {
                    if (result.state === "granted") {
                        navigator.geolocation.getCurrentPosition(success);
                    } else if (result.state === "prompt") {
                        navigator.geolocation.getCurrentPosition(success);
                    } else if (result.state === "denied") {
                        alert("Please enable location sharing for this website.\nSee this for help: https://support.google.com/chrome/answer/142065?hl=en&co=GENIE.Platform%3DDesktop");
                    }
                });
        } else {
            alert("Sorry not available!");
        }
    }

    const handleRadiusFocus = () => {
        setRadiusFocused(!radiusFocused);
    }

    const handleRadiusChange = (e) => {
        let possibleRadius = e.target.value;
        const regex = /^[0-9]+$/;

        if (possibleRadius === '' || regex.test(possibleRadius)) {

            if (possibleRadius === '') {
                setInvalidRadius(true);
            } else {
                possibleRadius = parseInt(possibleRadius);

                if (5 <= possibleRadius && possibleRadius <= 50) {
                    setInvalidRadius(false);
                } else {
                    setInvalidRadius(true);
                }
            }

            setRadius(possibleRadius);
        }

        setRadiusError('');
    }

    const handleStartClick = () => {
        if (invalidRadius) setRadiusError("Invalid radius.");

        

        if (!(latitude || longitude)) setAddressError("Invalid address.");
    }

    return (
        <div>
            <Header />
            <div className="start-session-container">
                <div className="start-session-box">
                    <div className="address-form-container">
                        <h3 className="address-prompt">Enter your address</h3>
                        <GooglePlacesAutocomplete
                            apiKey={process.env.REACT_APP_MAPS_API_KEY}
                            selectProps={{
                                value: address || '',
                                onChange: setAddress,
                                placeholder: latitude && longitude ? "Using your current location!" : "Enter your address",
                                styles: {
                                    container: (provided) => ({
                                        ...provided,
                                        width: '270px',
                                    }),
                                    control: (provided, state) => ({
                                        ...provided,
                                        backgroundColor: addressError ? 'rgb(255, 228, 226)' : latitude && longitude ? 'rgb(236, 255, 226)' : 'white',
                                        border: state.isFocused ? 0 : 0,
                                        boxShadow: state.isFocused ? 0 : 0,
                                        '&:hover': {
                                            border: state.isFocused ? 0 : 0
                                        },
                                        outline: addressError ? 'rgb(255, 59, 48) solid 2px' : 
                                                 latitude && longitude ? 'rgb(26, 156, 39) solid 2px' :
                                                 state.isFocused && 'rgb(0, 122, 255) solid 2px'

                                    }),
                                    option: (provided) => ({
                                        ...provided,
                                        color: "black"
                                    }),
                                    placeholder: (provided) => ({
                                        ...provided,
                                        fontWeight: 'bold'
                                    })
                                }
                            }}
                        />
                        <h4 className="use-location-text">Or, <a className="use-location-anchor" onClick={handleUseLocationClick}>use your current location</a></h4>
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
                                outline: (radiusError || invalidRadius) && 'rgb(221, 65, 56) solid 2px'
                            }}
                        >
                            <input
                                className="radius-input"
                                maxLength={2}
                                onFocus={handleRadiusFocus}
                                onBlur={handleRadiusFocus}
                                value={radius}
                                onChange={handleRadiusChange}
                                style={{
                                    backgroundColor: (radiusError || invalidRadius) && 'rgb(255, 228, 226)'
                                }}
                            >
                            </input>
                            <div
                                className="radius-label"
                                style={{
                                    boxShadow: radiusFocused ? '0 2px 0 rgb(0, 122, 255), 0 -2px 0 rgb(0, 122, 255), 2px 0 0 rgb(0, 122, 255)' : 'none',
                                    backgroundColor: (radiusError || invalidRadius) && 'rgb(220, 195, 195)'
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