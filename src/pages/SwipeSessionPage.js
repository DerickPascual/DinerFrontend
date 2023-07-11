import './SwipeSessionPage.css';
import Header from '../layouts/Header';
import TinderCard from 'react-tinder-card';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

export default function SwipeSessionPage() {

    const swiped = () => {

    }

    return (
        <div>
            <Header />
            <div className="card-container">
                <TinderCard
                    preventSwipe={['up', 'down']}
                    onCardLeftScreen={(dir) => {console.log(`Out of frame! Swipe direction: ${dir}`)}}
                >
                    <div className="card-box">
                        <div className="card-image-container">
                            <img className="card-image" src={require('../images/RedRobin.jpg')}/>
                        </div>
                        <div className="card-description-container">
                            <div className="card-name-container">
                                <h3 className="card-name">Red Robin Gourmet Burgers and Brews</h3>
                                <div>
                                    <h3 className="card-info-open-closed">Open</h3>
                                </div>
                            </div>
                            <div className="card-info">
                                <div className="card-info-rating">
                                    <Rating
                                        readOnly
                                        value={4.4}
                                        precision={.1}
                                        icon={<StarIcon style={{ color: '#FF9529' }} fontSize="inherit" />}
                                        emptyIcon={<StarIcon style={{ color: '#484848' }} fontSize="inherit" />}
                                    />
                                </div>
                                <h3 className="card-info-stars">4.4 stars</h3>
                                <h4 className="card-info-number-ratings">1238 ratings</h4>
                            </div>
                        </div>
                    </div>
                </TinderCard>
            </div>
        </div>
    )
};