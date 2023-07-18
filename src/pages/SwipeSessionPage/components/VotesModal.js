import './VotesModal.css';
import ReactModal from 'react-modal';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import CloseIcon from '@mui/icons-material/Close';

export default function VotesModal({ isOpen, setIsOpen, likesAndDislikes, lowestIndexSwiped, restaurants }) {
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

                        return (
                            <div>
                                <div className="restaurant-container">
                                    <div className="restaurant-name-container">
                                        <h3>{restaurants.slice().reverse()[index].name}</h3>
                                    </div>
                                    <hr></hr>
                                    <div className="likes-dislikes-container">
                                        <div className="likes-container">
                                            <RestaurantIcon
                                                fontSize="large"
                                                style={{
                                                    color: '#3BD16F'
                                                }} />
                                            <p className="likes-dislikes-num">{restaurantLikesAndDislikes.likes}</p>
                                        </div>
                                        <div className="dislikes-container">
                                            <CloseIcon
                                                fontSize="large"
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