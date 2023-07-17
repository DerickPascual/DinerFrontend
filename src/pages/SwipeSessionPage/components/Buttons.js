import './Buttons.css';
import CloseIcon from '@mui/icons-material/Close';
import ReplayIcon from '@mui/icons-material/Replay';
import RestaurantIcon from '@mui/icons-material/Restaurant';

export default function Buttons({ canSwipe, canGoBack, handleSwipe, goBack }) {
    return (
        <div className="buttons-container">
            <div className="single-button-container" style={{ opacity: !canSwipe && '0.5', backgroundColor: !canSwipe && '#242424', cursor: !canSwipe && 'default' }}>
                <button className="swipe-button" onClick={() => handleSwipe('left')}>
                    <CloseIcon
                        fontSize={'large'}
                        style={{
                            color: '#f1444c'
                        }}
                    />
                </button>
            </div>
            <div className="single-button-container" style={{ opacity: !canGoBack && '0.5', backgroundColor: !canGoBack && '#242424', cursor: !canGoBack && 'default' }}>
                <button className="swipe-button" onClick={() => goBack()}>
                    <ReplayIcon
                        fontSize={'large'}
                        style={{
                            color: 'orange'
                        }}
                    />
                </button>
            </div>
            <div className="single-button-container" style={{ opacity: !canSwipe && '0.5', backgroundColor: !canSwipe && '#242424', cursor: !canSwipe && 'default' }}>
                <button className="swipe-button" onClick={() => handleSwipe('right')}>
                    <RestaurantIcon
                        fontSize={'large'}
                        style={{
                            color: '#3BD16F'
                        }} />
                </button>
            </div>
        </div>
    )
}