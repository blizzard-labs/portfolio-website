import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { projects } from '../../data/content';
import ProjectSpotlight from './ProjectSpotlight';
import './Research.css';

// Shown on the project cards too, so visitors see what's still underway
const isDevLabel = (label) => label?.toUpperCase() === 'IN DEVELOPMENT';
const isInDevelopment = (project) => [project.status, ...(project.tags || [])].some(isDevLabel);

const Research = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);

  // Lock page scroll while the modal is open; Escape closes the topmost layer
  useEffect(() => {
    if (!selectedProject) return;
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      if (lightboxImage) setLightboxImage(null);
      else setSelectedProject(null);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [selectedProject, lightboxImage]);

  const getStatusClass = (status) => {
    switch (status) {
      case 'PUBLISHED': return 'status-published';
      case 'PREPRINT':
      case 'PREPRINT POSTED': return 'status-preprint';
      case 'STARTUP': return 'status-startup';
      case 'PATENT PENDING': return 'status-patent';
      default: return '';
    }
  };

  return (
    <section id="research" className="research section">
      <div className="container">
        <div>
          <div className="section-header">
            <h2 className="section-title">My Research Projects</h2>
            <div className="section-line"></div>
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
          <div className="projects-timeline">
            {projects.filter((project) => !project.archived).map((project) => (
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
                    {isInDevelopment(project) && (
                      <span className="project-status status-dev">In Development</span>
                    )}
                  </div>
                  <p className="project-subtitle">{project.subtitle}</p>
                </div>

                <div className="project-arrow">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </div>
              </article>
            ))}
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
              className={`project-modal${selectedProject.layout === 'spotlight' ? ' is-spotlight' : ''}`}
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
                {isInDevelopment(selectedProject) && (
                  <span className="modal-status status-dev">In Development</span>
                )}
                {selectedProject.status && !isDevLabel(selectedProject.status) && (
                  <span className={`modal-status ${getStatusClass(selectedProject.status)}`}>
                    {selectedProject.status}
                  </span>
                )}
                {selectedProject.tags?.filter((tag) => !isDevLabel(tag)).map((tag) => (
                  <span key={tag} className="modal-status status-tag">
                    {tag}
                  </span>
                ))}
              </div>

              <h2 className="modal-title">
                {(selectedProject.subtitle
                  ? `${selectedProject.title}: ${selectedProject.subtitle}`
                  : selectedProject.title
                ).split(/(\S+-\S+)/).map((part, i) =>
                  i % 2 ? <span key={i} className="nowrap">{part}</span> : part
                )}
              </h2>

              <div className="modal-divider"></div>

              <div className="modal-description">
                <p>
                  {selectedProject.description}
                  {selectedProject.teammates?.length > 0 && (
                    <>{' '}<strong>Teammates: {selectedProject.teammates.join(', ')}</strong></>
                  )}
                </p>

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

              {selectedProject.layout === 'spotlight' && (
                <ProjectSpotlight
                  key={selectedProject.id}
                  project={selectedProject}
                  onOpenImage={setLightboxImage}
                  blockKeys={!!lightboxImage}
                />
              )}

              {selectedProject.layout !== 'spotlight' && selectedProject.images?.length > 0 && (
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

              {selectedProject.layout !== 'spotlight' && (
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
              )}
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
            draggable="false"
            onClick={(e) => e.stopPropagation()}
            onContextMenu={(e) => e.preventDefault()}
          />
        </div>
      )}
    </section>
  );
};

export default Research;
