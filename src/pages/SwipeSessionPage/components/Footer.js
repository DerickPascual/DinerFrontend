import './Footer.css';

export default function Footer({ roomId, setMatchesIsOpen }) {
    return (
        <div className="footer-container">
            <div className="session-pin-text-container">
                <h3>Session PIN: <b className="session-pin">{roomId}</b></h3>
            </div>
            <div className="matches-button-container">
                <button className="matches-button" onClick={() => setMatchesIsOpen(true)}>View Swipes</button>
            </div>
        </div>
    )
}