import { useState, useRef, useEffect } from 'react';
import { galleryImages } from '../../data/content';
import './Gallery.css';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const trackRef = useRef(null);
  const loopCopies = 3;

  // Width of one full set of images (track holds `loopCopies` identical sets)
  const getSetWidth = () => {
    const track = trackRef.current;
    return track ? track.scrollWidth / loopCopies : 0;
  };

  // Start in the middle set so there is room to scroll both directions
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const center = () => { track.scrollLeft = getSetWidth(); };
    center();
    const observer = new ResizeObserver(center);
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  // Seamless wrap: when leaving the middle set, jump by one set width
  const handleScroll = () => {
    const track = trackRef.current;
    const setWidth = getSetWidth();
    if (!track || !setWidth) return;
    if (track.scrollLeft < setWidth * 0.5) {
      track.scrollLeft += setWidth;
    } else if (track.scrollLeft > setWidth * 1.5) {
      track.scrollLeft -= setWidth;
    }
  };

  const scrollByItems = (direction) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth * 0.6, behavior: 'smooth' });
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
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKey);
    };
  }, [selectedImage]);

  // Horizontal swipe in the lightbox steps through images
  const touchStartX = useRef(null);
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) < 50) return;
    if (dx > 0) prevImage();
    else nextImage();
  };

  return (
    <section id="gallery" className="gallery section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Photo Diary</h2>
          <div className="section-line"></div>
        </div>
      </div>

      <div className="gallery-strip">
        <button
          className="carousel-btn carousel-btn-prev"
          onClick={() => scrollByItems(-1)}
          aria-label="Scroll left"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className="gallery-track" ref={trackRef} onScroll={handleScroll}>
          {Array.from({ length: loopCopies }).flatMap((_, copy) =>
            galleryImages.map((image, index) => (
              <div
                key={`${copy}-${index}`}
                className="gallery-item"
                aria-hidden={copy !== 1}
                onClick={() => setSelectedImage({ ...image, index })}
              >
                <img
                  src={image.src}
                  alt={copy === 1 ? image.alt : ''}
                  style={image.position && { objectPosition: image.position }}
                  loading="lazy"
                  draggable="false"
                />
                <div className="gallery-item-overlay">
                  <span className="diary-item-caption">
                    {image.alt}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        <button
          className="carousel-btn carousel-btn-next"
          onClick={() => scrollByItems(1)}
          aria-label="Scroll right"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="lightbox"
          onClick={() => setSelectedImage(null)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
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
