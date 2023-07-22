import './Header.css';
import { useNavigate } from 'react-router-dom';

export default function Header({ withGradient }) {
    const navigate = useNavigate();

    const handleDinderClick = () => {
        navigate('/home');
    }

    return (
        <div
            className="header"
            style={{
                background: withGradient && '-webkit-linear-gradient(rgba(0, 0, 0, 0.95),  rgba(255, 255, 255, 0))'

            }}>
            <h1 className='diner'><a onClick={handleDinderClick}>Diner</a></h1>
        </div>
    )
};