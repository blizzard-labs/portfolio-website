import { motion } from 'framer-motion';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-main">
            <p className="copyright">
              © {currentYear} Krishna Bhatt.
            </p>
            <p className="footer-latin">
              <em>यत भावो-तत भवति।</em>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
