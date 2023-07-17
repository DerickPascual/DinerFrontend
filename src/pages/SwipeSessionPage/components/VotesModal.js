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
                    {/* Need to make this a separate component */}
                    <div className="title-container">
                        <h1>Votes</h1>
                        <hr></hr>
                    </div>
                    {likesAndDislikes.slice().reverse().map((restaurantLikesAndDislikes, index) => {

                        if (restaurants.length - 1 - lowestIndexSwiped.current < index) {
                            return;
                        }

                        return (
                            <div>
                                <div className="restaurant-container">
                                    <div className="restaurant-name-container">
                                        <h2>{restaurants.slice().reverse()[index].name}</h2>
                                    </div>
                                    <hr></hr>
                                    <div className="likes-dislikes-container">
                                        <div className="likes-container">
                                            <RestaurantIcon
                                                fontSize="large"
                                                style={{
                                                    color: '#3BD16F'
                                                }} />
                                            <h3 className="likes-dislikes-num">{restaurantLikesAndDislikes.likes}</h3>
                                        </div>
                                        <div className="dislikes-container">
                                            <CloseIcon
                                                fontSize="large"
                                                style={{
                                                    color: '#f1444c'
                                                }} />
                                            <h3 className="likes-dislikes-num">{restaurantLikesAndDislikes.dislikes}</h3>
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