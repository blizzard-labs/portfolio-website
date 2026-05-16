import { motion } from 'framer-motion';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-top">
            <div className="footer-ornament">
              <span className="ornament-line"></span>
              <span className="ornament-symbol">✦</span>
              <span className="ornament-line"></span>
            </div>
          </div>

          <div className="footer-main">
            <div className="footer-brand">
              <h3 className="footer-name">Krishna Bhatt</h3>
              <p className="footer-tagline">
                Neuroscience · Computation · Engineering
              </p>
            </div>

            <nav className="footer-nav">
              <a href="#about">About</a>
              <a href="#research">Research</a>
              <a href="#prabha">Prabha</a>
              <a href="#experience">Experience</a>
              <a href="#gallery">Gallery</a>
            </nav>
          </div>

          <div className="footer-bottom">
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
