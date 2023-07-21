import './InfoModal.css';
import ReactModal from 'react-modal';
import { Rating } from 'react-simple-star-rating';
import GoogleIcon from '@mui/icons-material/Google';

export default function InfoModal({ isOpen, setIsOpen, restaurant }) {

    const handleGoogleRedirect = (url) => {
        window.open(url, "_blank");
    }

    const handleReviewRedirect = (url) => {
        window.open(url, "_blank");
    }

    return (
        <div>
            {restaurant &&
                <div>
                    <ReactModal
                        isOpen={isOpen}
                        onRequestClose={() => setIsOpen(false)}
                        className="info-modal"
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
                                overflowX: 'hidden'
                            }
                        }}
                    >
                        <h2 className="info-modal-restaurant-name">{restaurant.name}</h2>
                        <div className="info-modal-description-container">
                            <div className="info-modal-address-container">
                                <h4 className="info-modal-address">{restaurant.address}</h4>
                            </div>
                            <div className="info-modal-rating-container">
                                <h4 className="info-modal-rating-text" style={{ paddingTop: '0px' }}>{restaurant.ratingValue}</h4>
                                <div className="info-modal-rating" style={{ margin: '10px' }}>
                                    <Rating
                                        initialValue={restaurant.ratingValue}
                                        readonly={true}
                                        allowHover={false}
                                        allowFraction={true}
                                        size={18}
                                        onClick={() => { }}
                                        showTooltip={false}
                                        disableFillHover={true}
                                    />
                                </div>
                                <h4 className="info-modal-rating-text">({restaurant.numberRatings})</h4>
                            </div>
                            <div className="info-modal-price-container">
                                <p className="info-modal-price">{'$'.repeat(restaurant.priceLevel)}</p>
                            </div>
                            <div className="info-modal-restaurant-description-container">
                                <p className="info-modal-restaurant-description">{restaurant.description}</p>
                            </div>
                            <div className="info-modal-hours-container">
                                <h4 className="info-modal-hours-header">Hours: <b className="info-modal-hours-open-text">Open now</b></h4>
                                {restaurant.hours.map((day) => {
                                    return (
                                        <p>{day}</p>
                                    )
                                })}
                            </div>
                            <button className="info-modal-view-on-google-button" onClick={() => handleGoogleRedirect(restaurant.url)}>
                                <p className="info-modal-view-on-google-text">View Restaurant on Google</p>
                                <GoogleIcon fontSize={'small'}/>
                            </button>
                            <div className="info-modal-reviews-container">
                                <h3>Reviews</h3>
                                {restaurant.reviews.length === 0 &&
                                    <p className="empty-reviews-message">Nothing to see here.</p>
                                }   
                                {restaurant.reviews.map((review) => {
                                    return (
                                        <div className="info-modal-single-review-container" onClick={() => handleReviewRedirect(review.url)}>
                                            <div className="info-modal-review-left-side-container">
                                                <img className="info-modal-review-photo" src={review.profilePhoto} referrerPolicy='no-referrer'/>
                                                <div className="review-rating-container">
                                                    <Rating
                                                        initialValue={review.rating}
                                                        readonly={true}
                                                        allowHover={false}
                                                        allowFraction={true}
                                                        size={18}
                                                        showTooltip={false}
                                                        disableFillHover={true}
                                                    />
                                                </div>
                                                <p className="review-time-desc">{review.relativeTimeDescription}</p>
                                            </div>
                                            <div className="review-right-side-container">
                                                <p>{review.text}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>

                        </div>
                    </ReactModal>
                </div>
            }
        </div>
    )
};