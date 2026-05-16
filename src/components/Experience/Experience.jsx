import { experience, awards, education } from '../../data/content';
import './Experience.css';

const Experience = () => {
  return (
    <section id="experience" className="experience section">
      <div className="container">
        <div>
          <div className="section-header">
            <span className="section-number">04</span>
            <h2 className="section-title">Experience & Honors</h2>
            <div className="section-line"></div>
          </div>

          <div className="experience-grid">
            {/* Experience Column */}
            <div className="experience-column">
              <h3 className="column-title">Professional Experience</h3>
              
              <div className="experience-list">
                {experience.map((exp, index) => (
                  <article 
                    key={index}
                    className="experience-item"
                  >
                    <div className="exp-header">
                      <h4 className="exp-role">{exp.role}</h4>
                      <span className="exp-period">{exp.period}</span>
                    </div>
                    <div className="exp-meta">
                      <span className="exp-org">{exp.organization}</span>
                      <span className="exp-divider">·</span>
                      <span className="exp-location">{exp.location}</span>
                    </div>
                    <p className="exp-description">{exp.description}</p>
                    <ul className="exp-highlights">
                      {exp.highlights.map((highlight, hIndex) => (
                        <li key={hIndex}>{highlight}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>

            {/* Awards Column */}
            <div className="awards-column">
              <h3 className="column-title">Distinctions & Awards</h3>
              
              <div className="awards-section">
                <h4 className="awards-category">Science Fair</h4>
                <ul className="awards-list">
                  {awards.scienceFair.map((award, index) => (
                    <li key={index} className="award-item">
                      <span className="award-title">{award.title}</span>
                      {award.event && <span className="award-event">{award.event}</span>}
                      <span className="award-year">{award.year || award.years}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="awards-section">
                <h4 className="awards-category">Entrepreneurship</h4>
                <ul className="awards-list">
                  {awards.entrepreneurship.map((award, index) => (
                    <li key={index} className="award-item">
                      <span className="award-title">{award.title}</span>
                      {award.event && <span className="award-event">{award.event}</span>}
                      {(award.year || award.years) && (
                        <span className="award-year">{award.year || award.years}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="awards-section">
                <h4 className="awards-category">Academic</h4>
                <ul className="awards-list">
                  {awards.academic.map((award, index) => (
                    <li key={index} className="award-item">
                      <span className="award-title">{award.title}</span>
                      {award.event && <span className="award-event">{award.event}</span>}
                      {(award.year || award.years) && (
                        <span className="award-year">{award.year || award.years}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Education Section */}
          <div className="education-section">
            <div className="education-header">
              <div className="edu-ornament">✦</div>
              <h3 className="education-title">Education</h3>
              <div className="edu-ornament">✦</div>
            </div>
            
            <div className="education-content">
              <h4 className="school-name">{education.school}</h4>
              <div className="education-stats">
                <div className="edu-stat">
                  <span className="edu-stat-label">GPA</span>
                  <span className="edu-stat-value">{education.gpa}</span>
                </div>
                <div className="edu-stat">
                  <span className="edu-stat-label">SAT</span>
                  <span className="edu-stat-value">{education.sat}</span>
                </div>
              </div>
              <div className="courses-grid">
                {education.courses.map((course, index) => (
                  <span key={index} className="course-item">{course}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
