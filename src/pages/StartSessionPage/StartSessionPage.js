import './StartSessionPage.css';
import { useState, useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import Header from '../../layouts/Header';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import axios from 'axios';

export default function SessionStartPage() {
    const [address, setAddress] = useState();
    const [addressError, setAddressError] = useState();
    const [radiusFocused, setRadiusFocused] = useState(false);
    const [invalidRadius, setInvalidRadius] = useState(false);
    const [radiusError, setRadiusError] = useState();
    const [roomId, setRoomId, latitude, setLatitude, longitude, setLongitude, radius, setRadius] = useOutletContext();
    const [disableButton, setDisableButton] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setRadius(5);
        setLatitude('');
        setLongitude('');
    }, [])

    useEffect(() => {
        if (latitude && longitude) {
            setAddressError('');
        }
    }, [latitude, longitude]);

    useEffect(() => {
        const validateAddress = async () => {
            if (address) {
                const res = await geocodeByAddress(address.label)
                    .catch(() => {
                        setAddressError("Invalid address.");
                    });

                const coords = await getLatLng(res[0])
                    .catch(() => {
                        setAddressError("Invalid address.");
                    });

                setLatitude(coords.lat);
                setLongitude(coords.lng);
            }
        }

        validateAddress();
    }, [address]);

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

                if (5 <= possibleRadius && possibleRadius <= 30) {
                    setInvalidRadius(false);
                } else {
                    setInvalidRadius(true);
                }
            }

            setRadius(possibleRadius);
        }

        setRadiusError('');
    }

    const handleStartClick = async () => {
        if (invalidRadius) {
            setRadiusError("Invalid radius.");
            return;
        }

        if (!latitude || !longitude) {
            setAddressError('Invalid address');
            return;
        }

        const response = await axios.get('http://165.232.151.206/api/new-room-id');

        setRoomId(response.data.roomId);

        navigate('/swipe-session');
    }

    return (
        <div className="start-session-body">
            <Header withGradient={true} />
            <div className="start-session-container">
                <div className="start-session-box">
                    <div className="address-form-container">
                        <h3 className="address-prompt">Enter your address</h3>
                        <h4 className="use-location-text">Or, <a className="use-location-anchor" onClick={handleUseLocationClick}>use your current location.</a> This may take a second - the address box will turn green when your location is found.</h4>
                        <GooglePlacesAutocomplete
                            apiKey="AIzaSyC3tBK7HkBR-EwY46-8pe64osLYfx1FG9Q"
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
                                        color: "black",
                                        borderBottom: 'solid 1px black',
                                    }),
                                    placeholder: (provided) => ({
                                        ...provided,
                                        fontWeight: 'bold'
                                    })
                                }
                            }}
                        />
                        <div style={{marginTop: '10px', marginBottom: '-10px', width: '92%', textAlign: 'right'}}>
                            <img alt="google" src={require('../../images/google.png')}></img>
                        </div>
                        {addressError &&
                            <h4 className="error-message">{addressError}</h4>
                        }
                    </div>
                    <div className="radius-form-container">
                        <h3 className="radius-prompt">Enter a restaurant radius</h3>
                        <h4 className="radius-description">Values between 5 and 30 are accepted.</h4>
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
                    <button 
                        className="start-button" 
                        onClick={handleStartClick} 
                        >Start your session</button>
                </div>
            </div>
        </div>
    )
};