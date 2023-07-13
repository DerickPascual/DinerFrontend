import './Header.css';
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();

    const handleDinderClick = () => {
        navigate('/home');
    }

    return (
        <div className="header">
            <h1 className='dinder'><a onClick={handleDinderClick}>Dinder</a></h1>
        </div>
    )
};