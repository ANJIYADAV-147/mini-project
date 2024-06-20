import {
  FaFacebookSquare,
  FaTwitter,
  FaPinterestSquare,
  FaInstagram,
} from 'react-icons/fa'
import logo from '../images/FooterLogo.png'
import './index.css'

const Footer = () => (
  <div className="footer-container">
    <div className="logo-company-container">
      <img src={logo} className="footer-logo" alt="website-footer-logo" />
      <h1 className="company-name">Tasty Kitchens</h1>
    </div>
    <p className="footer-des">
      The only thing we are serious about is food. Contact us on
    </p>

    <div className="social-media-icons-box">
      <FaPinterestSquare
        className="social-media-icon"
        testid="pintrest-social-icon"
      />
      <FaInstagram
        className="social-media-icon"
        testid="instagram-social-icon"
      />
      <FaTwitter className="social-media-icon" testid="twitter-social-icon" />
      <FaFacebookSquare
        className="social-media-icon"
        testid="facebook-social-icon"
      />
    </div>
  </div>
)
export default Footer
