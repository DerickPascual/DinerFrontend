import './SwipeSessionPage.css';
import React, { useState, useRef, useMemo } from 'react';
import Header from '../layouts/Header';
import TinderCard from 'react-tinder-card';
import { Rating } from 'react-simple-star-rating';

const loaderData = [
    {
        name: '0',
        imgUrl: '../images/RedRobin.jpg',
        ratingValue: 4.4,
        numberRatings: 1238
    },
    {
        name: '1',
        imgUrl: '../images/RedRobin.jpg',
        ratingValue: 4.7,
        numberRatings: 92
    },
    {
        name: '2',
        imgUrl: '../images/RedRobin.jpg',
        ratingValue: 4.8,
        numberRatings: 1340
    },
    {
        name: '3',
        imgUrl: '../images/RedRobin.jpg',
        ratingValue: 4.4,
        numberRatings: 1238
    },
    {
        name: '4',
        imgUrl: '../images/RedRobin.jpg',
        ratingValue: 4.7,
        numberRatings: 92
    },
    {
        name: '5',
        imgUrl: '../images/RedRobin.jpg',
        ratingValue: 4.8,
        numberRatings: 1340
    },
    {
        name: '6',
        imgUrl: '../images/RedRobin.jpg',
        ratingValue: 4.4,
        numberRatings: 1238
    },
    {
        name: '7',
        imgUrl: '../images/RedRobin.jpg',
        ratingValue: 4.7,
        numberRatings: 92
    },
    {
        name: '8',
        imgUrl: '../images/RedRobin.jpg',
        ratingValue: 4.8,
        numberRatings: 1340
    },
    {
        name: '9',
        imgUrl: '../images/RedRobin.jpg',
        ratingValue: 4.4,
        numberRatings: 1238
    },
    {
        name: '10',
        imgUrl: '../images/RedRobin.jpg',
        ratingValue: 4.7,
        numberRatings: 92
    },
    {
        name: '11',
        imgUrl: '../images/RedRobin.jpg',
        ratingValue: 4.8,
        numberRatings: 1340
    },
    {
        name: '12',
        imgUrl: '../images/RedRobin.jpg',
        ratingValue: 4.4,
        numberRatings: 1238
    },
    {
        name: '13',
        imgUrl: '../images/RedRobin.jpg',
        ratingValue: 4.7,
        numberRatings: 92
    },
    {
        name: '14',
        imgUrl: '../images/RedRobin.jpg',
        ratingValue: 4.8,
        numberRatings: 1340
    },
    {
        name: '15',
        imgUrl: '../images/RedRobin.jpg',
        ratingValue: 4.4,
        numberRatings: 1238
    },
    {
        name: '16',
        imgUrl: '../images/RedRobin.jpg',
        ratingValue: 4.7,
        numberRatings: 92
    },
    {
        name: '17',
        imgUrl: '../images/RedRobin.jpg',
        ratingValue: 4.8,
        numberRatings: 1340
    }
]

export default function SwipeSessionPage() {
    const restaurants = loaderData;
    const [currentIndex, setCurrentIndex] = useState(restaurants.length - 1);
    const [lastDirection, setLastDirection] = useState();
    const currentIndexRef = useRef(restaurants.length - 1);

    const canSwipe = currentIndex >= 0;
    const canGoBack = currentIndex < restaurants.length - 1;

    const updateCurrentIndex = (val) => {
        setCurrentIndex(val)
        currentIndexRef.current = val;
    }

    const restaurantRefs = useMemo(
        () => Array(restaurants.length).fill(0).map((i) => React.createRef()), []
    )

    const outOfFrame = (idx) => {
        currentIndexRef.current >= idx && restaurantRefs[idx].current.restoreCard();
    }

    const swiped = (direction, index) => {
        setLastDirection(direction);
        updateCurrentIndex(index - 1);
    }

    const handleSwipe = async (dir) => {
        if (canSwipe && currentIndex < restaurants.length) {
            await restaurantRefs[currentIndex].current.swipe(dir) // Swipe the card!
          }
    }

    const goBack = async () => {
        if (!canGoBack) return;
        const newIndex = currentIndex + 1;
        updateCurrentIndex(newIndex);
        await restaurantRefs[newIndex].current.restoreCard();
    }

    return (
        <div>
            <Header />
            <div className="content-container">
                <div className="card-container">
                    {restaurants.map((restaurant, index) => {
                        return (
                            <TinderCard
                                ref={restaurantRefs[index]}
                                key={index}
                                className='card'
                                preventSwipe={['up', 'down']}
                                onSwipe={(dir) => swiped(dir, index)}
                                swipeThreshold={1}
                            >
                                <div
                                    className="card-box"
                                    style={index == currentIndex || index === currentIndex - 1 || index === currentIndex + 1 ? { boxShadow: 'rgba(0, 0, 0, 0.2) 0px 5px 10px' } : { boxShadow: 'none' }}
                                >
                                    <div className="card-image-container">
                                        <img className="card-image" src={require('../images/RedRobin.jpg')} />
                                    </div>
                                    <div className="card-description-container">
                                        <div className="card-name-container">
                                            <h3 className="card-name">{restaurant.name}</h3>
                                            <div>
                                                <h3 className="card-info-open-closed">Open</h3>
                                            </div>
                                        </div>
                                        <div className="card-info">
                                            <div className="card-info-rating">
                                                <Rating
                                                    initialValue={restaurant.ratingValue}
                                                    readonly={true}
                                                    allowFraction={true}
                                                    fillColor={'#FF9529'}
                                                    size={20}
                                                />
                                            </div>
                                            <h3 className="card-info-stars">{restaurant.ratingValue} stars</h3>
                                            <h4 className="card-info-number-ratings">{restaurant.numberRatings} ratings</h4>
                                        </div>
                                    </div>
                                </div>
                            </TinderCard>
                        )
                    }
                    )}
                </div>
                <div className="buttons-container">
                    <div className="single-button-container" style={{ opacity: !canSwipe && '0.5', backgroundColor: !canSwipe && '#242424', cursor: !canSwipe && 'default'}}>
                        <button className="swipe-button" onClick={() => handleSwipe('left')}>Swipe left</button>
                    </div>
                    <div className="single-button-container" style={{ opacity: !canGoBack && '0.5', backgroundColor: !canGoBack && '#242424',cursor: !canGoBack && 'default'}}>
                        <button className="swipe-button" onClick={() => goBack()}>Undo swipe</button>
                    </div>
                    <div className="single-button-container" style={{ opacity: !canSwipe && '0.5', backgroundColor: !canSwipe && '#242424', cursor: !canSwipe && 'default'}}>
                        <button className="swipe-button" onClick={() => handleSwipe('right')}>Swipe right</button>
                    </div>
                </div>
                <div className="footer-container">
                    <div>
                        <h3>Session PIN: <b className="session-pin">123456</b></h3>
                    </div>
                    <div className="matches-button-container">
                        <button className="matches-button">View Matches</button>
                    </div>
                </div>
            </div>
        </div>
    )
};