import './VotesModal.css';
import ReactModal from 'react-modal';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import CloseIcon from '@mui/icons-material/Close';
import { Rating } from 'react-simple-star-rating';
import GoogleIcon from '@mui/icons-material/Google';

export default function VotesModal({ isOpen, setIsOpen, likesAndDislikes, lowestIndexSwiped, restaurants }) {
    const handleGoogleRedirect = (url) => {
        window.open(url, "_blank");
    }
    
    return (
        <div className="modal-container">
            <ReactModal
                isOpen={isOpen}
                onRequestClose={() => setIsOpen(false)}
                className="modal"
                style={{
                    overlay: {
                        backgroundColor: 'rgba(8, 8, 8, 0.9)',
                        overFlowY: 'auto'
                    },
                    content: {
                        border: 'none',
                        backgroundColor: ('#242424'),
                        borderRadius: '15px',
                        height: 'fit-content',
                        maxHeight: '80vh',
                        position: "absolute",
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }
                }}
            >
                <div className="title-container">
                    <h2>Votes</h2>
                    <hr></hr>
                </div>
                {lowestIndexSwiped.current === restaurants.length &&
                    <div className="empty-votes-message-container">
                        <p className="empty-votes-message">Start swiping to see votes!</p>
                    </div>
                }
                {likesAndDislikes.slice().reverse().map((restaurantLikesAndDislikes, index) => {

                    if (restaurants.length - 1 - lowestIndexSwiped.current < index) {
                        return;
                    }

                    const restaurant = restaurants.slice().reverse()[index];

                    return (
                        <div>
                            <div className="restaurant-container">
                                <div className="restaurant-top-container">
                                    <div className="restaurant-name-container">
                                        <h3>{restaurant.name}</h3>
                                    </div>
                                    <div className="restaurant-address-container">
                                        <p>{restaurant.address}</p>
                                    </div>
                                    <div className="restaurant-rating-container">
                                        <p className="restaurant-rating-value">{restaurant.ratingValue}</p>
                                        <Rating
                                            initialValue={restaurant.ratingValue}
                                            readonly={true}
                                            size={18}
                                            allowFraction={true}
                                        />
                                        <p className="restaurant-number-ratings">({restaurant.numberRatings})</p>
                                    </div>
                                    <div className="restaurant-price-container">
                                        <p>{'$'.repeat(restaurant.priceLevel)}</p>
                                    </div>
                                    <div>
                                        <button className="google-button" onClick={() => handleGoogleRedirect(restaurant.url)}>
                                            <p className="google-button-view-text">View on</p>
                                            <GoogleIcon 
                                                fontSize={'small'}
                                            />
                                        </button>
                                    </div>
                                </div>
                                <div className="likes-dislikes-container">
                                    <div className="likes-container">
                                        <RestaurantIcon
                                            fontSize="medium"
                                            style={{
                                                color: '#3BD16F'
                                            }} />
                                        <p className="likes-dislikes-num">{restaurantLikesAndDislikes.likes}</p>
                                    </div>
                                    <div className="dislikes-container">
                                        <CloseIcon
                                            fontSize="medium"
                                            style={{
                                                color: '#f1444c'
                                            }} />
                                        <p className="likes-dislikes-num">{restaurantLikesAndDislikes.dislikes}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </ReactModal>
        </div>
    )
};