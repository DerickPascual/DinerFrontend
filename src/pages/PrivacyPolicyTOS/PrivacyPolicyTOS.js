import Header from '../../layouts/Header';
import './PrivacyPolicyTOS.css';

export default function PrivacyPolicyTOS() {
    return (
        <div className="privacy-policy-body">
            <Header withGradient={true} />
            <div className="text-container">
                <div className="text-box">
                    <h2>Terms of Service 🤝</h2>
                    <p>Welcome to Diner 🥂! By using Diner, you agree to comply with these terms and conditions.</p>
                    <br></br>
                    <h3>1. Website Purpose</h3>
                    <p>Diner is a website that allows users to swipe on restaurants to decide where to eat. Diner uses the Google Places API to gather restaurant information.</p>
                    <br></br>
                    <h3>2. Third Party Services</h3>
                    <p>Diner uses the Google Places API for restaurant information. By using the website, you agree to be bound by <a href="https://policies.google.com/terms?hl=en" target="_blank">Google's Terms of Service</a> 🤝 as well.</p>
                    <br></br>
                    <h3>3. Disclaimer of Liability</h3>
                    <p>Diner does not guarantee the accuracy, availability, or quality of the restaurant information provided. Users are advised to exercise their judgment when making dining decisions.</p>
                    <br></br>
                    <h3>4. Privacy</h3>
                    <p>We temporarily store user-inputted locations to query the Google Places API. After queries are completed, we do not retain this data. For more information, view our privacy policy below.</p>
                    <br></br>
                    <h3>5. Modification of Terms</h3>
                    <p>Diner reserves the right to update or modify these Terms of Service at any time. Continued use of the website after such changes will constitute your acceptance of the updated terms.</p>
                    <br></br>
                    <h3>6. Governing Law</h3>
                    <p>These Terms of Service shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of laws principles.</p>
                    <br></br>
                    <hr></hr>
                    <br></br>
                    <h2>Privacy Policy 🔒</h2>
                    <p>At Diner 🥂, we are committed to ensuring the privacy and security of our users' personal information. This Privacy Policy outlines how we handle and protect the data collected when you use our website, specifically in relation to your location data.</p>
                    <br></br>
                    <h3>1. Information We Collect:</h3>
                    <p>When you start a swipe session, we may request access to your device's location or prompt you to enter your location. Your location data will be used solely for the purpose of finding nearby restaurants and other related places using the Google Places API. We do not collect, store, or share your location data beyond the immediate query to the API.</p>
                    <br></br>
                    <h3>2. Use of Google Places API:</h3>
                    <p>To provide you with information about nearby restaurants, our website uses the Google Places API. When you enter your location and start a swipe session, your device's location coordinates will be sent to Google's servers to retrieve relevant restaurant data. By reference, this means that by using our website, you are also bound by the <a href="https://policies.google.com/privacy" target="_blank">Google Privacy Policy</a> 🔒.</p>
                    <br></br>
                    <h3>3. Data Storage</h3>
                    <p>When a user starts a swipe session, Diner temporarily stores the user-inputted location to perform a Google Places API query to find nearby restaurants. Once this query is completed, the location data is not retained by our servers or stored in any external database or data storage facility. </p>
                    <br></br>
                    <h3>4. Information Sharing</h3>
                    <p>We do not share your location data with any third parties, except for transmitting it to Google's servers for the sole purpose of querying the Google Places API. We do not sell, rent, or lease your personal information to any other entity.</p>
                    <br></br>
                    <h3>5. Security Measures</h3>
                    <p>We use industry-standard encryption protocols to ensure data integrity during the API query process.</p>
                    <br></br>
                    <h3>6. Changes to Privacy Policy</h3>
                    <p>We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any significant changes by posting the updated policy on this website.</p>
                </div>
            </div>
            <div></div>
        </div>
    )
}