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

export default function SwipeSessionPage() {
    const [restaurants, setRestaurants] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const currentIndexRef = useRef(-1);
    const lowestIndexSwiped = useRef(-1);
    const roomId = useOutletContext()[0];
    const [socket, setSocket] = useState();
    const [matchesIsOpen, setMatchesIsOpen] = useState(false);
    const [likesAndDislikes, setLikesAndDislikes] = useState([]);
    const [infoModalOpen, setInfoModalOpen] = useState(false);
    const [matchModalOpen, setMatchModalOpen] = useState(false);
    const [restaurantMatch, setRestaurantMatch] = useState({});
    
    const restaurantRefs = useMemo(
        () => Array(restaurants.length).fill(0).map((i) => React.createRef()), [restaurants]
    )

    const canSwipe = currentIndex >= 0;
    const canGoBack = currentIndex < restaurants.length - 1;

    useEffect(() => {
        const newSocket = io('http://localhost:3500');

        setSocket(newSocket);

        newSocket.emit("join_room", roomId);

        newSocket.on("restaurants", (restaurants) => {
            setRestaurants(restaurants);

            setCurrentIndex(restaurants.length - 1);
            currentIndexRef.current = restaurants.length - 1;
            lowestIndexSwiped.current = restaurants.length;
        });

        newSocket.on("likes_and_dislikes", (updatedLikesAndDislikes) => {
            setLikesAndDislikes(updatedLikesAndDislikes);
        });

        newSocket.on("match_found", (restaurant) => {
            setMatchModalOpen(true);
            setRestaurantMatch(restaurant);
        });

        return () => {
            newSocket.disconnect();
        };
    }, []);

    const updateCurrentIndex = (val) => {
        setCurrentIndex(val)
        currentIndexRef.current = val;

        if (val + 1 < lowestIndexSwiped.current) {
            lowestIndexSwiped.current = val + 1;
        }
    }

    const outOfFrame = (idx) => {
        currentIndexRef.current >= idx && restaurantRefs[idx].current.restoreCard();
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
            <Header />
            <MatchModal isOpen={matchModalOpen} setIsOpen={setMatchModalOpen} restaurantMatch={restaurantMatch}/>
            <div className="content-container">
                <div className="card-container">
                    {restaurants.map((restaurant, index) => {
                        return (
                            <TinderCard
                                ref={restaurantRefs[index]}
                                key={index}
                                className='card'
                                preventSwipe={['up', 'down']}
                                outOfFrame={() => outOfFrame(index)}
                                onSwipe={(dir) => swiped(dir, index)}
                                swipeRequirementType={'position'}
                                swipeThreshold={100}
                            >
                                <div
                                    className="card-box"
                                    style={index === currentIndex || index === currentIndex - 1 || index === currentIndex + 1 ? { boxShadow: 'rgba(0, 0, 0, 0.2) 0px 5px 10px' } : { boxShadow: 'none' }}
                                >
                                    <div className="card-image-container">
                                        <img className="card-image" src={require('../../images/RedRobin.jpg')} />
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
                                        <button className="view-more-button pressable" onTouchStart={() => {}} onClick={() => setInfoModalOpen(true)}>
                                            View more
                                        </button>
                                    </div>
                                </div>
                            </TinderCard>
                        )
                    }
                    )}
                </div>
                <InfoModal isOpen={infoModalOpen} setIsOpen={setInfoModalOpen} restaurant={restaurants.length > 0 ? restaurants[currentIndex] : null}/>
                <Buttons canSwipe={canSwipe} canGoBack={canGoBack} handleSwipe={handleSwipe} goBack={goBack}/>
                <Footer setMatchesIsOpen={setMatchesIsOpen} roomId={roomId}/>
            </div>
            <VotesModal isOpen={matchesIsOpen} setIsOpen={setMatchesIsOpen} likesAndDislikes={likesAndDislikes} restaurants={restaurants} lowestIndexSwiped={lowestIndexSwiped}/>
        </div>
    )
};