import './Footer.css';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
    const navigate = useNavigate();

    const privacyTermsHandler = () => {
        navigate('/privacy-policy-and-tos')
    }

    return (
        <div className="footer-container">
            <h4 style={{width: '100%'}}><a onClick={privacyTermsHandler}>Terms and Privacy Policy</a></h4>
        </div>
    )
}