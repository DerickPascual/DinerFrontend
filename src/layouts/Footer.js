import './Footer.css';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
    const navigate = useNavigate();

    const privacyTermsHandler = () => {
        navigate('/privacy-policy-and-tos')
    }

    return (
        <div className="footer-container">
            <h4><a onClick={privacyTermsHandler}>Privacy Policy and Terms of Service</a></h4>
        </div>
    )
}