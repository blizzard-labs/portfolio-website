import { useState, useRef } from 'react';
import { galleryImages } from '../../data/content';
import './Gallery.css';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef(null);

  // Split images into pairs for two-row display
  const imagesPerSlide = 6; // 3 columns x 2 rows
  const totalSlides = Math.ceil(galleryImages.length / imagesPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Get current slide images
  const getCurrentSlideImages = () => {
    const start = currentSlide * imagesPerSlide;
    return galleryImages.slice(start, start + imagesPerSlide);
  };

  return (
    <section id="gallery" className="gallery section">
      <div className="container">
        <div>
          <div className="section-header">
            <span className="section-number">05</span>
            <h2 className="section-title">Photo Diary</h2>
            <div className="section-line"></div>
          </div>

          

          <div className="gallery-carousel-wrapper">
            <button 
              className="carousel-btn carousel-btn-prev" 
              onClick={prevSlide}
              aria-label="Previous slide"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <div className="gallery-carousel" ref={carouselRef}>
              <div 
                key={currentSlide}
                className="gallery-grid"
              >
                {getCurrentSlideImages().map((image, index) => {
                  const globalIndex = currentSlide * imagesPerSlide + index;
                  return (
                    <div
                      key={globalIndex}
                      className="gallery-item"
                      onClick={() => setSelectedImage({ ...image, index: globalIndex })}
                    >
                      <img 
                        src={image.src} 
                        alt={image.alt}
                        loading="lazy"
                      />
                      <div className="gallery-item-overlay">
                        <span className="gallery-item-number">
                          Fig. {globalIndex + 1}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <button 
              className="carousel-btn carousel-btn-next" 
              onClick={nextSlide}
              aria-label="Next slide"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          <div className="carousel-dots">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${currentSlide === index ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="lightbox"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="lightbox-close"
              onClick={() => setSelectedImage(null)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </button>
            <img 
              src={selectedImage.src} 
              alt={selectedImage.alt}
            />
            <div className="lightbox-caption">
              <span className="caption-line"></span>
              <span className="caption-text">Fig. {selectedImage.index + 1}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
