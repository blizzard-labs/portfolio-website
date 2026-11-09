import ResponsiveImage from '../ResponsiveImage';
import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { galleryImages } from '../../data/content';
import './Gallery.css';

// Fisher-Yates shuffle, run once per page load so each visit sees a new order
const images = [...galleryImages];
for (let i = images.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [images[i], images[j]] = [images[j], images[i]];
}

// Distribute photos across three rows; `index` stays the position in `images`.
const rows = [0, 1, 2].map((r) =>
  images.map((image, index) => ({ image, index })).filter(({ index }) => index % 3 === r)
);
// Follow each row left-to-right, then advance to the next row.
const lightboxOrder = rows.flat().map(({ index }) => index);

const LOOP_COPIES = 3;
const AUTO_SPEED = 8; // px per second for the outer rows
const MIDDLE_SPEED_FACTOR = 0.75;

// Width of one full set of images (track holds LOOP_COPIES identical sets)
const getSetWidth = (track) => (track ? track.scrollWidth / LOOP_COPIES : 0);

const GalleryRow = ({ items, trackRef, onSelect }) => {
  // Center once before paint; resizing must preserve the current photo position.
  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let setWidth = getSetWidth(track);
    track.scrollLeft = setWidth;
    const observer = new ResizeObserver(() => {
      const nextWidth = getSetWidth(track);
      if (!nextWidth || nextWidth === setWidth) return;
      // Scrollbar changes only resize the viewport. If tiles themselves resize,
      // retain the same fractional position within the repeated image sets.
      track.scrollLeft = setWidth ? track.scrollLeft * nextWidth / setWidth : nextWidth;
      setWidth = nextWidth;
    });
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
            <ResponsiveImage
              src={image.src}
              sizes="(max-height: 686px) 160px, (max-height: 1114px) 23.34vh, 260px"
              maxWidth={1280}
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
  const middleRef = useRef(null);
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

  // Share one clock; the middle row drifts more gently in the opposite direction.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const tracks = [topRef.current, middleRef.current, bottomRef.current];
    if (tracks.some((track) => !track)) return;
    const visible = new Set();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) visible.add(target);
        else visible.delete(target);
      });
    });
    tracks.forEach((track) => observer.observe(track));

    const positions = tracks.map((track) => track.scrollLeft);
    const written = [...positions];
    let last = performance.now();
    let frame;
    const tick = (now) => {
      const distance = AUTO_SPEED * Math.min(now - last, 100) / 1000;
      last = now;
      const active = visible.size > 0 && !document.hidden && !pauseRef.current(now);
      tracks.forEach((track, index) => {
        // Only resync for external scrolling/resizing, not browser pixel rounding.
        if (track.scrollLeft !== written[index]) positions[index] = track.scrollLeft;
        if (active) {
          positions[index] += (index === 1 ? -MIDDLE_SPEED_FACTOR : 1) * distance;
          const setWidth = getSetWidth(track);
          if (setWidth && positions[index] > setWidth * 1.5) positions[index] -= setWidth;
          if (setWidth && positions[index] < setWidth * 0.5) positions[index] += setWidth;
          track.scrollLeft = positions[index];
        }
        written[index] = track.scrollLeft;
      });
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  const pauseFor = (ms) => {
    pausedUntilRef.current = Math.max(pausedUntilRef.current, performance.now() + ms);
  };

  const scrollByItems = (direction) => {
    pauseFor(3000);
    [topRef, middleRef, bottomRef].forEach(({ current: track }) => {
      track?.scrollBy({ left: direction * track.clientWidth * 0.6, behavior: 'smooth' });
    });
  };

  const stepImage = (direction) => {
    setSelectedImage((prev) => {
      if (!prev) return prev;
      const position = lightboxOrder.indexOf(prev.index);
      const newIndex = lightboxOrder[(position + direction + lightboxOrder.length) % lightboxOrder.length];
      return { ...images[newIndex], index: newIndex };
    });
  };

  const prevImage = () => stepImage(-1);
  const nextImage = () => stepImage(1);

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
          <GalleryRow items={rows[0]} trackRef={topRef} onSelect={setSelectedImage} />
          <GalleryRow items={rows[1]} trackRef={middleRef} onSelect={setSelectedImage} />
          <GalleryRow items={rows[2]} trackRef={bottomRef} onSelect={setSelectedImage} />
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
            <ResponsiveImage
              src={selectedImage.src}
              sizes="90vw"
              loading="eager"
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
