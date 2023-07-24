import TinderCard from 'react-tinder-card';
import LinearProgress from '@mui/material/LinearProgress';
import { useState, useEffect } from 'react';

export default function LoadingCard() {
    const [restaurantLoadProgress, setRestaurantLoadProgress] = useState(0);

    useEffect(() => {
        let timer;
        if (restaurantLoadProgress < 92) {
            timer = setInterval(() => {
                setRestaurantLoadProgress((oldProgress) => {
                    // set to 7.5, 7.5 in case loading 40 restaurants
                    return oldProgress + 3 + Math.random() * 5;
                })
            }, 500);
            // set interval to 500 in case loading 40 restaurants
        }

        return () => clearInterval(timer);
    }, [restaurantLoadProgress])

    return (
        <TinderCard
            className='card'
            preventSwipe={['up', 'down', 'left', 'right']}
        >
            <div
                className="card-box"
                style={{ boxShadow: 'rgba(0, 0, 0, 0.2) 0px 5px 10px' }}
            >
                <div style={{ position: 'absolute', top: '50%', textAlign: 'center', width: '100%' }}>
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
                </div>
            </div>
        </TinderCard>
    )
};