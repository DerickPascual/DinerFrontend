import './SwipeSessionPage.css';
import React, { useState, useRef, useMemo, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import Header from '../../layouts/Header';
import TinderCard from 'react-tinder-card';
import { Rating } from 'react-simple-star-rating';
import io from 'socket.io-client';
import MatchModal from './components/MatchModal';
import VotesModal from './components/VotesModal';
import Footer from './components/Footer';
import Buttons from './components/Buttons';
import InfoModal from './components/InfoModal';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import CardCarousel from './components/CardCarousel';
import LinearProgress from '@mui/material/LinearProgress';
import { useNavigate } from 'react-router-dom';

export default function SwipeSessionPage() {
    const [restaurants, setRestaurants] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(-100);
    const currentIndexRef = useRef(-100);
    const lowestIndexSwiped = useRef(-100);
    const [roomId, setRoomId, latitude, setLatitude, longitude, setLongitude, radius, setRadius] = useOutletContext();
    const [socket, setSocket] = useState();
    const [matchesIsOpen, setMatchesIsOpen] = useState(false);
    const [likesAndDislikes, setLikesAndDislikes] = useState([]);
    const [infoModalOpen, setInfoModalOpen] = useState(false);
    const [matchModalOpen, setMatchModalOpen] = useState(false);
    const [restaurantMatch, setRestaurantMatch] = useState({});

    const [initialLoad, setInitialLoad] = useState(true);
    // set to false if loading 40 restaurants
    const [showFindingRestaurantsMsg, setShowFindingRestaurantsMsg] = useState(true);
    const [restaurantLoadProgress, setRestaurantLoadProgress] = useState(0);

    const restaurantRefs = useMemo(
        () => Array(restaurants.length).fill(0).map((i) => React.createRef()), [restaurants]
    )

    const canSwipe = currentIndex >= 0;
    const canGoBack = currentIndex < restaurants.length - 1;

    const navigate = useNavigate();

    useEffect(() => {
        if (!roomId) {
            navigate('/home');
        }

        const newSocket = io('https://dinerbackend-3497fdac4949.herokuapp.com/');

        setSocket(newSocket);

        // Comment this out to edit loading screens
        newSocket.emit("join_room", roomId, latitude, longitude, radius);

        newSocket.on("initial_load_finished", () => {
            setShowFindingRestaurantsMsg(true);
        });

        /*Comment this out to edit loading screens */
        newSocket.on("restaurants", (restaurants) => {
            setRestaurants(restaurants);

            setCurrentIndex(restaurants.length - 1);
            currentIndexRef.current = restaurants.length - 1;
            lowestIndexSwiped.current = restaurants.length;
            setRestaurantLoadProgress(100);
            setShowFindingRestaurantsMsg(false);
            setInitialLoad(false);
        });

        newSocket.on("likes_and_dislikes", (updatedLikesAndDislikes) => {
            setLikesAndDislikes(updatedLikesAndDislikes);
        });

        newSocket.on("match_found", (restaurant) => {
            setMatchModalOpen(true);
            setRestaurantMatch(restaurant);
        });

        newSocket.on("additional_restaurants", (additionalRestaurants) => {

            setRestaurants((currentRestaurants) => {
                console.log(currentRestaurants);
                console.log(additionalRestaurants);

                const newRestaurantList = [...additionalRestaurants, ...currentRestaurants];

                console.log(`New restaurant List ${newRestaurantList}`);

                return newRestaurantList;
            });

            setCurrentIndex((currentIndex) => currentIndex + additionalRestaurants.length);
            currentIndexRef.current += additionalRestaurants.length;
            console.log(currentIndexRef.current);
        });

        return () => {
            newSocket.disconnect();
        };
    }, []);

    useEffect(() => {
        let timer;
        if (showFindingRestaurantsMsg && restaurantLoadProgress < 80) {
            timer = setInterval(() => {
                setRestaurantLoadProgress((oldProgress) => {
                    // set to 7.5, 7.5 in case loading 40 restaurants
                    return oldProgress + 15 + Math.random() * 5;
                })
            }, 200);
            // set interval to 500 in case loading 40 restaurants
        }

        return () => clearInterval(timer);
    }, [showFindingRestaurantsMsg, restaurantLoadProgress])


    const updateCurrentIndex = (val) => {
        setCurrentIndex(val)
        currentIndexRef.current = val;

        if (val + 1 < lowestIndexSwiped.current) {
            lowestIndexSwiped.current = val + 1;
        }
    }

    const swiped = (direction, index) => {
        // ensures swipe only happen once, since for some reason swipe handler can be called 10+ times on a swipe
        // Since currentIndexRef.current will always be updated after the first call with a specific index
        if (index === currentIndexRef.current) {

            socket.emit("swipe", index, direction);
            updateCurrentIndex(index - 1);
        }
    }

    const handleSwipe = async (dir) => {
        if (canSwipe && currentIndex < restaurants.length) {
            await restaurantRefs[currentIndex].current.swipe(dir) // Swipe the card!
        }
    }

    const goBack = async () => {
        if (!canGoBack) return;
        const newIndex = currentIndex + 1;
        socket.emit("undo", newIndex);
        updateCurrentIndex(newIndex);
        await restaurantRefs[newIndex].current.restoreCard();
    }

    return (
        <div className="swipe-session-body">
            <Header withGradient={true} />
            <MatchModal isOpen={matchModalOpen} setIsOpen={setMatchModalOpen} restaurantMatch={restaurantMatch} />
            <div className="content-container">
                <div className="card-container">
                    {initialLoad &&
                        <TinderCard
                            className='card'
                            preventSwipe={['up', 'down', 'left', 'right']}
                        >
                            <div
                                className="card-box"
                                style={{ boxShadow: 'rgba(0, 0, 0, 0.2) 0px 5px 10px' }}
                            >
                                <div style={{ position: 'absolute', top: '50%', textAlign: 'center', width: '100%' }}>
                                    {showFindingRestaurantsMsg ?
                                        <div>
                                            <h2>Finding restaurants...</h2>
                                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                <LinearProgress
                                                    style={{
                                                        width: '90%',
                                                        marginTop: '20px',
                                                        borderRadius: '30px'
                                                    }}
                                                    value={restaurantLoadProgress}
                                                    variant={'determinate'}
                                                />
                                            </div>
                                        </div>
                                        :
                                        // this whole logic is useful in the case that 40 restaurants are loaded instead of 20
                                        <h2>Preparing your swipe room...</h2>
                                    }
                                </div>
                            </div>
                        </TinderCard>
                    }
                    {(currentIndex === -1 || currentIndex === 0) &&
                         <div 
                            className="end-text-box"
                         >
                                <div style={{ position: 'absolute', top: '30%'}}>
                                    <h2>Look's like you've reached the end. Time to dine!</h2>
                                </div>
                            </div>

                    }
                    {restaurants.map((restaurant, index) => {
                        return (
                            <TinderCard
                                ref={restaurantRefs[index]}
                                key={index}
                                className='card'
                                preventSwipe={['up', 'down']}
                                onSwipe={(dir) => swiped(dir, index)}
                                swipeRequirementType='position'
                                swipeThreshold={100}
                            >
                                {(index === currentIndex || index === currentIndex - 1 || index === currentIndex + 1 || index === currentIndex - 2 || index === currentIndex + 2) ?
                                    <div
                                        className="card-box"
                                        style={index === currentIndex || index === currentIndex - 1 || index === currentIndex + 1 ? { boxShadow: 'rgba(0, 0, 0, 0.2) 0px 5px 10px' } : { boxShadow: 'none' }}
                                    >
                                        <div className="card-image-container">
                                            <CardCarousel currentIndex={currentIndex} index={index} restaurant={restaurant} />
                                        </div>
                                        <div className="card-description-container">
                                            <div className="card-name-container">
                                                <h3 className="card-name">{restaurant.name}</h3>
                                                <div>
                                                    <h3 className="card-info-price">{'$'.repeat(restaurant.priceLevel)}</h3>
                                                </div>
                                            </div>
                                            <div className="card-info">
                                                <div className="card-info-rating">
                                                    <Rating
                                                        initialValue={restaurant.ratingValue}
                                                        readonly={true}
                                                        allowHover={false}
                                                        allowFraction={true}
                                                        fillColor={'#FF9529'}
                                                        size={20}
                                                        onClick={() => { }}
                                                        showTooltip={false}
                                                        disableFillHover={true}
                                                    />
                                                </div>
                                                <h3 className="card-info-stars">{restaurant.ratingValue} stars</h3>
                                                <h4 className="card-info-number-ratings">{restaurant.numberRatings} ratings</h4>
                                            </div>
                                        </div>
                                        <div className="card-view-more-container">
                                            <div style={{ width: '59px' }}>

                                            </div>
                                            <button className="view-more-button pressable" onTouchStart={() => { }} onClick={() => setInfoModalOpen(true)}>
                                                View more
                                            </button>
                                            <img alt="Google" src={require('../../images/google.png')} className="card-google-img" />
                                        </div>
                                    </div> :
                                    (index < currentIndex) &&
                                    <div className="card-box">

                                    </div>
                                }
                            </TinderCard>
                        )
                    }
                    )}
                </div>
                <InfoModal isOpen={infoModalOpen} setIsOpen={setInfoModalOpen} restaurant={restaurants.length > 0 ? restaurants[currentIndex] : null} />
                <Buttons canSwipe={canSwipe} canGoBack={canGoBack} handleSwipe={handleSwipe} goBack={goBack} />
                {!initialLoad && <Footer setMatchesIsOpen={setMatchesIsOpen} roomId={roomId} />}
            </div>
            <VotesModal isOpen={matchesIsOpen} setIsOpen={setMatchesIsOpen} likesAndDislikes={likesAndDislikes} restaurants={restaurants} lowestIndexSwiped={lowestIndexSwiped} />
        </div>
    )
};