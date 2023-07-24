import './SwipeSessionPage.css';
import React, { useState, useRef, useMemo, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import Header from '../../layouts/Header';
import TinderCard from 'react-tinder-card';
import { Rating } from 'react-simple-star-rating';
import io from 'socket.io-client';
import MatchModal from './components/MatchModal/MatchModal';
import VotesModal from './components/VotesModal/VotesModal';
import Footer from './components/Footer/Footer';
import Buttons from './components/Buttons/Buttons';
import InfoModal from './components/InfoModal/InfoModal';
import LoadingCard from './components/LoadingCard/LoadingCard';
import CardCarousel from './components/CardCarousel/CardCarousel';
import { useNavigate } from 'react-router-dom';
/* global google */

const getPlaceDetails = (service, request) => {
    return new Promise((resolve, reject) => {
        service.getDetails(request, (results, status)=> {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                resolve(results);
            } else {
                reject(status);
            }
        })
    })
}

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

        const newSocket = io(process.env.NODE_ENV === 'development' ? 'http://localhost:3500' : 'https://api.letsdiner.com');

        setSocket(newSocket);

        // Comment this out to edit loading screens
        newSocket.emit("join_room", roomId, latitude, longitude, radius);

        /*Comment this out to edit loading screens */
        newSocket.on("new_room_restaurants", async (restaurants) => {
            // retrieve restaurant details
            const map = new google.maps.Map(document.createElement('div'));

            const service = new google.maps.places.PlacesService(map);

            for (const restaurant of restaurants) {
                const request = {
                    placeId: restaurant.placeId,
                    fields: [
                        'formatted_address',
                        'photo',
                        'url',
                        'opening_hours',
                        'reviews'
                    ]
                }

                const restaurantDetails = await getPlaceDetails(service, request);
                restaurant.address = restaurantDetails.formatted_address;
                
                if (restaurantDetails.formatted_address) {
                    restaurant.address = restaurantDetails.formatted_address;
                }
        
                if (restaurantDetails.url) {
                    restaurant.url = restaurantDetails.url;
                }
        
                if (restaurantDetails.opening_hours && restaurantDetails.opening_hours.weekday_text) {
                    restaurant.hours = restaurantDetails.opening_hours.weekday_text;
                }

                if (restaurantDetails.reviews) {
                    for (const review of restaurantDetails.reviews) {
                        restaurant.reviews.push({
                            url: review.author_url,
                            profilePhoto: review.profile_photo_url,
                            rating: review.rating,
                            relativeTimeDescription: review.relative_time_description,
                            text: review.text
                        })
                    }
                }

                if (restaurantDetails.photos) {
                    let photoCount = 0;
                    for (const photo of restaurantDetails.photos) {
                        if (photoCount >= 5) break;
        
                        restaurant.photos.push({ url: photo.getUrl(), htmlAttributions: photo.html_attributions ? photo.html_attributions : []});
                        photoCount++;
                    }
                }

                console.log(restaurant.photos);
            }

            newSocket.emit("new_room_restaurants_with_details", (restaurants));

            setRestaurants(restaurants);
            setCurrentIndex(restaurants.length - 1);
            currentIndexRef.current = restaurants.length - 1;
            lowestIndexSwiped.current = restaurants.length;
            setInitialLoad(false);
        });

        newSocket.on("existing_room_restaurants", (restaurants) => {
            setRestaurants(restaurants);
            setCurrentIndex(restaurants.length - 1);
            currentIndexRef.current = restaurants.length - 1;
            lowestIndexSwiped.current = restaurants.length;
            setInitialLoad(false);
        })

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
                        <LoadingCard />
                    }
                    {/* When user reaches end */}
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
                                    // for lazy loading
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