import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Notebook.css';

const BASE = '/assets/notebook';

const useIsNarrow = () => {
  const query = '(max-width: 768px)';
  const [narrow, setNarrow] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = (e) => setNarrow(e.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);
  return narrow;
};

const Notebook = ({ isOpen, onClose }) => {
  const [pages, setPages] = useState([]);
  const pageCount = pages.length;
  const pageSrc = (n) => `${BASE}/${pages[n - 1].src}`;
  const thumbSrc = (n) => `${BASE}/${pages[n - 1].thumb}`;
  // Last page navigated to (1-based); the visible spread is derived from it
  const [anchor, setAnchor] = useState(1);
  const isNarrow = useIsNarrow();
  const perView = isNarrow ? 1 : 2;
  const stripRef = useRef(null);

  useEffect(() => {
    if (!isOpen || pageCount) return;
    fetch(`${BASE}/manifest.json`)
      .then((res) => res.json())
      .then((data) => setPages(data.pages))
      .catch(() => setPages([]));
  }, [isOpen, pageCount]);

  // Keep spreads aligned to odd pages when showing two at a time
  const spreadStart = useCallback(
    (n) => (perView === 2 ? n - ((n - 1) % 2) : n),
    [perView]
  );

  const page = spreadStart(anchor);

  const goTo = useCallback(
    (n) => {
      if (!pageCount) return;
      const target = spreadStart(Math.min(Math.max(n, 1), pageCount));
      if (target === page) return;
      setAnchor(target);
    },
    [pageCount, spreadStart, page]
  );

  const next = useCallback(() => goTo(page + perView), [goTo, page, perView]);
  const prev = useCallback(() => goTo(page - perView), [goTo, page, perView]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, onClose, next, prev]);

  // Keep the active thumbnail centered in the strip
  useEffect(() => {
    const active = stripRef.current?.querySelector('.notebook-thumb.active');
    active?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, [page, isOpen, pageCount]);

  // Preload neighbouring spreads
  useEffect(() => {
    if (!pageCount) return;
    for (let n = page - perView; n < page + perView * 2; n++) {
      if (n >= 1 && n <= pageCount) new Image().src = `${BASE}/${pages[n - 1].src}`;
    }
  }, [page, perView, pages, pageCount]);

  // Horizontal swipe on the page stage flips pages
  const touchStartX = useRef(null);
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) < 50) return;
    if (dx > 0) prev();
    else next();
  };

  const visible = [];
  for (let n = page; n < page + perView && n <= pageCount; n++) visible.push(n);

  const atStart = page <= 1;
  const atEnd = page + perView > pageCount;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="notebook-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="notebook-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Notebook"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
            onContextMenu={(e) => e.preventDefault()}
          >
            <header className="notebook-header">
              <h2 className="notebook-title">My Big Fat Notebook :) ... a small snippet</h2>
              <div className="notebook-actions">
                <button className="notebook-close" onClick={onClose} aria-label="Close notebook">
                  ×
                </button>
              </div>
            </header>

            <div
              className="notebook-stage"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <button
                className="notebook-arrow left"
                onClick={prev}
                disabled={atStart}
                aria-label="Previous pages"
              >
                <svg viewBox="0 0 24 64" aria-hidden="true">
                  <polyline points="18,4 6,32 18,60" />
                </svg>
              </button>

              <div className="notebook-spread-wrap">
                <div className={`notebook-spread per-${perView}`}>
                  {visible.map((n) => (
                    <img
                      key={n}
                      src={pageSrc(n)}
                      alt={`Notebook page ${n}`}
                      className="notebook-page"
                      draggable="false"
                    />
                  ))}
                </div>
              </div>

              <button
                className="notebook-arrow right"
                onClick={next}
                disabled={atEnd}
                aria-label="Next pages"
              >
                <svg viewBox="0 0 24 64" aria-hidden="true">
                  <polyline points="6,4 18,32 6,60" />
                </svg>
              </button>
            </div>

            <div className="notebook-strip" ref={stripRef}>
              {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  className={`notebook-thumb ${visible.includes(n) ? 'active' : ''}`}
                  onClick={() => goTo(n)}
                  aria-label={`Go to page ${n}`}
                >
                  <img src={thumbSrc(n)} alt="" loading="lazy" draggable="false" />
                  <span>{n}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default Notebook;
