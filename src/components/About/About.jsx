import { personalInfo } from '../../data/content';
import './About.css';

const About = () => {
  return (
    <section id="about" className="about section">
      {/* Social Icons Sidebar */}
      <div className="social-sidebar">
        <a href="https://github.com/blizzard-labs" target="_blank" rel="noopener noreferrer" className="social-icon" title="GitHub">
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>
        <a href="https://linkedin.com/in/krishnabhatt25" target="_blank" rel="noopener noreferrer" className="social-icon" title="LinkedIn">
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>
        <a href="https://youtube.com/@krishnabhatt_" target="_blank" rel="noopener noreferrer" className="social-icon" title="YouTube">
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        </a>
        <a href="https://orcid.org/0009-0001-0844-5050" target="_blank" rel="noopener noreferrer" className="social-icon" title="ORCID">
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.025-5.325 5.025h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 4.022-2.484 4.022-3.722 0-2.016-1.284-3.722-4.097-3.722h-2.222z"/>
          </svg>
        </a>
        <a href="mailto:krishbhatt2019@gmail.com" className="social-icon" title="Email">
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
          </svg>
        </a>
        <div className="social-line"></div>
      </div>
      <div className="container">
        <div className="about-grid">
          <div className="about-image-wrapper">
            <div className="about-image-frame">
              <img 
                src={personalInfo.headshot} 
                alt={personalInfo.name}
                className="about-image"
              />
              <div className="image-corner top-left"></div>
              <div className="image-corner top-right"></div>
              <div className="image-corner bottom-left"></div>
              <div className="image-corner bottom-right"></div>
            </div>
            <div className="about-image-caption">
              <span className="caption-line"></span>
              <span className="caption-text">Fig. 1</span>
            </div>
            <p className="about-habitat-text">{personalInfo.bio}</p>
          </div>

          <div className="about-content">
            <div className="section-header">
              <span className="section-number">01</span>
              <h2 className="section-title">Krishna Bhatt</h2>
              <div className="section-line"></div>
            </div>

            <p className="about-bio">
              I'm currently a high school junior. My dream is that all people will be enabled with the independence to fully live their lives.
            </p>

            <div className="about-interests">
              <h3 className="interests-title">My Interests and Cool Skills</h3>
              <div className="interests-grid">
                {personalInfo.interests.map((interest, index) => (
                  <div 
                    key={index}
                    className="interest-item"
                  >
                    <span className="interest-field">{interest.field}</span>
                    <span className="interest-divider">—</span>
                    <span className="interest-focus">{interest.focus}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
