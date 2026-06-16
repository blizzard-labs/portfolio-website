import { useState, useRef, useEffect } from 'react';
import { galleryImages } from '../../data/content';
import './Gallery.css';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef(null);

  const imagesPerSlide = 9; // 3 columns x 3 rows
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

  const prevImage = () => {
    setSelectedImage((prev) => {
      const newIndex = (prev.index - 1 + galleryImages.length) % galleryImages.length;
      return { ...galleryImages[newIndex], index: newIndex };
    });
  };

  const nextImage = () => {
    setSelectedImage((prev) => {
      const newIndex = (prev.index + 1) % galleryImages.length;
      return { ...galleryImages[newIndex], index: newIndex };
    });
  };

  useEffect(() => {
    if (!selectedImage) return;
    const handleKey = (e) => {
      if (e.key === 'ArrowLeft') prevImage();
      else if (e.key === 'ArrowRight') nextImage();
      else if (e.key === 'Escape') setSelectedImage(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selectedImage]);

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
          <button
            className="lightbox-nav lightbox-nav-prev"
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            aria-label="Previous image"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            className="lightbox-nav lightbox-nav-next"
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            aria-label="Next image"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
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
              <span className="caption-text">
                <span className="caption-fig">Fig. {selectedImage.index + 1}</span>
                {selectedImage.alt && (
                  <span className="caption-alt">{selectedImage.alt}</span>
                )}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
