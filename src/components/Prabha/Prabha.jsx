import { prabha } from '../../data/content';
import './Prabha.css';

const Prabha = () => {
  return (
    <section id="prabha" className="prabha section">
      <div className="prabha-background">
        <div className="prabha-pattern"></div>
      </div>
      
      <div className="container">
        <div>
          <div className="section-header">
            <span className="section-number">03</span>
            <h2 className="section-title">Prabha Initiative</h2>
            <div className="section-line"></div>
          </div>

          <div className="prabha-content">
            <div className="prabha-intro-row">
              <div className="prabha-logo-wrapper">
                <div className="prabha-logo-frame">
                  <img 
                    src="/assets/img/prabhalogo.png" 
                    alt="Prabha Initiative Logo"
                    className="prabha-logo"
                  />
                  <div className="image-corner top-left"></div>
                  <div className="image-corner top-right"></div>
                  <div className="image-corner bottom-left"></div>
                  <div className="image-corner bottom-right"></div>
                </div>
                <div className="prabha-logo-caption">
                  <span className="caption-line"></span>
                  <span className="caption-text">Fig. 3</span>
                </div>
              </div>
              <p className="prabha-description">
                {prabha.description}
              </p>
            </div>

            <div className="prabha-values">
              <h4 className="values-title">Our Foundation</h4>
              <div className="values-grid">
                {prabha.values.map((value, index) => (
                  <div 
                    key={index}
                    className="value-card"
                  >
                    <span className="value-number">0{index + 1}</span>
                    <h5 className="value-title">{value.title}</h5>
                    <p className="value-description">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="prabha-cta">
              <div className="cta-ornament">✦ ✦ ✦</div>
              <h4 className="cta-title">Join Our Pilot Program</h4>
              <p className="cta-description">
                We're onboarding a limited number of student physiotherapists for our 
                Summer 2026 pilot program. Be part of making compassionate care accessible to all.
              </p>
              <a
                href={prabha.interestForm}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-button"
              >
                Complete Interest Form
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Prabha;
