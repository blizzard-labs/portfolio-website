import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { projects } from '../../data/content';
import './Research.css';

const Research = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);

  const getStatusClass = (status) => {
    switch (status) {
      case 'IN PROGRESS': return 'status-progress';
      case 'PUBLISHED': return 'status-published';
      case 'PREPRINT': return 'status-preprint';
      case 'STARTUP': return 'status-startup';
      case 'COMPLETED': return 'status-completed';
      case 'TO BE PATENTED': return 'status-patent';
      default: return '';
    }
  };

  return (
    <section id="research" className="research section">
      <div className="container">
        <div>
          <div className="section-header">
            <span className="section-number">02</span>
            <h2 className="section-title">Research & Projects</h2>
            <div className="section-line"></div>
          </div>

          <div className="projects-timeline">
            {projects.map((project, index) => (
              <article
                key={project.id}
                className="project-card"
                onClick={() => setSelectedProject(project)}
              >
                <div className="project-year">
                  <span className="year-bracket">[</span>
                  {project.year}
                  <span className="year-bracket">]</span>
                </div>
                
                <div className="project-content">
                  <div className="project-header">
                    <h3 className="project-title">{project.title}</h3>
                    <span className={`project-status ${getStatusClass(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                  <p className="project-subtitle">{project.subtitle}</p>
                  
                  <div className="project-tags">
                    {project.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span key={tagIndex} className="project-tag">{tag}</span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="project-tag more">+{project.tags.length - 3}</span>
                    )}
                  </div>
                </div>

                <div className="project-arrow">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </div>
              </article>
            ))}
          </div>

          <div className="research-hero-image">
            <img 
              src="/assets/img/tractogram3.png" 
              alt="Tractogram visualization"
              className="tractogram-image"
            />
            <div className="research-image-caption">
              <span className="caption-line"></span>
              <span className="caption-text">Fig. 2</span>
            </div>
          </div>
        </div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div
            className="project-modal-overlay"
            onClick={() => setSelectedProject(null)}
          >
            <div
              className="project-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="modal-close"
                onClick={() => setSelectedProject(null)}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </button>

              <div className="modal-header">
                <span className="modal-year">{selectedProject.year}</span>
                <span className={`modal-status ${getStatusClass(selectedProject.status)}`}>
                  {selectedProject.status}
                </span>
              </div>

              <h2 className="modal-title">{selectedProject.title}</h2>
              <p className="modal-subtitle">{selectedProject.subtitle}</p>

              <div className="modal-divider"></div>

              <div className="modal-description">
                <p>{selectedProject.description}</p>
                
                {selectedProject.motivation && (
                  <div className="modal-motivation">
                    <h4>Motivation</h4>
                    <ul>
                      {selectedProject.motivation.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="modal-tags">
                {selectedProject.tags.map((tag, index) => (
                  <span key={index} className="modal-tag">{tag}</span>
                ))}
              </div>

              {selectedProject.images && selectedProject.images.length > 0 && (
                <div className="modal-gallery">
                  <h4>Project Gallery</h4>
                  <div className="modal-gallery-grid">
                    {selectedProject.images.map((image, index) => (
                      <div 
                        key={index} 
                        className="modal-gallery-item"
                        onClick={(e) => {
                          e.stopPropagation();
                          setLightboxImage(image);
                        }}
                      >
                        <img src={image.src} alt={image.alt} />
                        <span className="gallery-item-caption">Fig. {index + 1}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="modal-resources">
                <h4>Resources</h4>
                <div className="resources-list">
                  {selectedProject.resources.map((resource, index) => (
                    <a
                      key={index}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="resource-link"
                    >
                      <span className="resource-label">{resource.label}</span>
                      {resource.note && (
                        <span className="resource-note">{resource.note}</span>
                      )}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="1.5"/>
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Image Lightbox */}
      {lightboxImage && (
        <div 
          className="lightbox-overlay"
          onClick={() => setLightboxImage(null)}
        >
          <button 
            className="lightbox-close"
            onClick={() => setLightboxImage(null)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </button>
          <img 
            src={lightboxImage.src} 
            alt={lightboxImage.alt}
            className="lightbox-image"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};

export default Research;
