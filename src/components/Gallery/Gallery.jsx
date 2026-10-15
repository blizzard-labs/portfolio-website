import { useState, useRef, useEffect } from 'react';
import { galleryImages } from '../../data/content';
import './Gallery.css';

// Fisher-Yates shuffle, run once per page load so each visit sees a new order
const images = [...galleryImages];
for (let i = images.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [images[i], images[j]] = [images[j], images[i]];
}

// Alternate photos between the two rows; `index` stays the position in `images`
const rows = [0, 1].map((r) =>
  images.map((image, index) => ({ image, index })).filter(({ index }) => index % 2 === r)
);

const LOOP_COPIES = 3;
const AUTO_SPEED = 20; // px per second

// One infinitely looping row. `direction` sets which way it drifts on its own.
// Width of one full set of images (track holds LOOP_COPIES identical sets)
const getSetWidth = (track) => (track ? track.scrollWidth / LOOP_COPIES : 0);

const GalleryRow = ({ items, direction, trackRef, pauseRef, onSelect }) => {
  // Start in the middle set so there is room to scroll both directions
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const center = () => { track.scrollLeft = getSetWidth(track); };
    center();
    const observer = new ResizeObserver(center);
    observer.observe(track);
    return () => observer.disconnect();
  }, [trackRef]);

  // Seamless wrap: when leaving the middle set, jump by one set width
  const handleScroll = () => {
    const track = trackRef.current;
    const setWidth = getSetWidth(track);
    if (!track || !setWidth) return;
    if (track.scrollLeft < setWidth * 0.5) {
      track.scrollLeft += setWidth;
    } else if (track.scrollLeft > setWidth * 1.5) {
      track.scrollLeft -= setWidth;
    }
  };

  // Slow auto-scroll; `pauseRef.current()` says whether the strip is paused
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let visible = false;
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    io.observe(track);

    // scrollLeft may be rounded to whole pixels, so track position as a float
    let pos = track.scrollLeft;
    let last = performance.now();
    let frame;
    const tick = (now) => {
      const dt = Math.min(now - last, 100) / 1000;
      last = now;
      const active = visible && !document.hidden && !pauseRef.current(now);
      if (Math.abs(track.scrollLeft - pos) > 2) pos = track.scrollLeft; // user scrolled
      if (active) {
        pos += direction * AUTO_SPEED * dt;
        const setWidth = getSetWidth(track);
        if (setWidth && pos > setWidth * 1.5) pos -= setWidth;
        if (setWidth && pos < setWidth * 0.5) pos += setWidth;
        track.scrollLeft = pos;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
    };
  }, [direction, trackRef, pauseRef]);

  return (
    <div className="gallery-track" ref={trackRef} onScroll={handleScroll}>
      {Array.from({ length: LOOP_COPIES }).flatMap((_, copy) =>
        items.map(({ image, index }) => (
          <div
            key={`${copy}-${index}`}
            className="gallery-item"
            aria-hidden={copy !== 1}
            onClick={() => onSelect({ ...image, index })}
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
  );
};

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const topRef = useRef(null);
  const bottomRef = useRef(null);

  // Auto-scroll pauses while hovered, touched, or while the lightbox is open;
  // resumes shortly after manual interaction.
  const hoveringRef = useRef(false);
  const pausedUntilRef = useRef(0);
  const lightboxOpenRef = useRef(false);
  useEffect(() => {
    lightboxOpenRef.current = selectedImage !== null;
  }, [selectedImage]);

  const pauseRef = useRef((now) =>
    hoveringRef.current || lightboxOpenRef.current || now < pausedUntilRef.current
  );

  const pauseFor = (ms) => {
    pausedUntilRef.current = Math.max(pausedUntilRef.current, performance.now() + ms);
  };

  const scrollByItems = (direction) => {
    pauseFor(3000);
    [topRef, bottomRef].forEach(({ current: track }) => {
      track?.scrollBy({ left: direction * track.clientWidth * 0.6, behavior: 'smooth' });
    });
  };

  const prevImage = () => {
    setSelectedImage((prev) => {
      const newIndex = (prev.index - 1 + images.length) % images.length;
      return { ...images[newIndex], index: newIndex };
    });
  };

  const nextImage = () => {
    setSelectedImage((prev) => {
      const newIndex = (prev.index + 1) % images.length;
      return { ...images[newIndex], index: newIndex };
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

      <div
        className="gallery-strip"
        onPointerEnter={(e) => { if (e.pointerType === 'mouse') hoveringRef.current = true; }}
        onPointerLeave={(e) => { if (e.pointerType === 'mouse') hoveringRef.current = false; }}
        onTouchStart={() => pauseFor(60000)}
        onTouchEnd={() => { pausedUntilRef.current = 0; pauseFor(3000); }}
        onWheel={() => pauseFor(3000)}
      >
        <button
          className="carousel-btn carousel-btn-prev"
          onClick={() => scrollByItems(-1)}
          aria-label="Scroll left"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className="gallery-rows">
          <GalleryRow items={rows[0]} direction={1} trackRef={topRef} pauseRef={pauseRef} onSelect={setSelectedImage} />
          <GalleryRow items={rows[1]} direction={-1} trackRef={bottomRef} pauseRef={pauseRef} onSelect={setSelectedImage} />
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
