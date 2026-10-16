import { useState, useEffect, useLayoutEffect, useRef } from 'react';

// pdf.js is loaded on first use so it stays out of the main bundle
let pdfjsPromise;
const loadPdfjs = () =>
  (pdfjsPromise ??= Promise.all([
    import('pdfjs-dist/legacy/build/pdf.mjs'),
    import('pdfjs-dist/legacy/build/pdf.worker.min.mjs?url'),
  ]).then(([lib, worker]) => {
    lib.GlobalWorkerOptions.workerSrc = worker.default;
    return lib;
  }));

const ZOOM_MIN = 0.5;
const ZOOM_MAX = 4;
const PAGE_PADDING = 16;
// Keep canvases under iOS Safari's ~16.7M pixel limit
const MAX_PIXELS = 16e6;

const clampZoom = (z) => Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, z));

const PdfPage = ({ page, size, scale, root }) => {
  const ref = useRef(null);
  const renderedScale = useRef(0);
  const [nearView, setNearView] = useState(false);

  // Only draw pages within a screen of the visible area; long documents stay light
  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => setNearView(entry.isIntersecting),
      { root, rootMargin: '100% 0px' }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [root]);

  // Render offscreen, then copy, so the old bitmap stays visible (stretched) while zooming
  useEffect(() => {
    if (!scale || !nearView || renderedScale.current === scale) return;
    const dpr = window.devicePixelRatio || 1;
    const renderScale = Math.min(scale * dpr, Math.sqrt(MAX_PIXELS / (size.w * size.h)));
    const viewport = page.getViewport({ scale: renderScale });
    let task;
    const timer = setTimeout(() => {
      const off = document.createElement('canvas');
      off.width = Math.floor(viewport.width);
      off.height = Math.floor(viewport.height);
      task = page.render({ canvasContext: off.getContext('2d'), viewport });
      task.promise
        .then(() => {
          const canvas = ref.current;
          if (!canvas) return;
          canvas.width = off.width;
          canvas.height = off.height;
          canvas.getContext('2d').drawImage(off, 0, 0);
          renderedScale.current = scale;
        })
        .catch(() => {});
    }, 120);
    return () => {
      clearTimeout(timer);
      task?.cancel();
    };
  }, [page, size, scale, nearView]);

  return (
    <canvas
      ref={ref}
      className="pdf-page"
      style={{ width: size.w * scale, height: size.h * scale }}
    />
  );
};

const PdfViewer = ({ src, title }) => {
  const scrollRef = useRef(null);
  const [scrollEl, setScrollEl] = useState(null);
  const [pages, setPages] = useState([]);
  const [failed, setFailed] = useState(false);
  const [fitWidth, setFitWidth] = useState(0);
  const [zoom, setZoom] = useState(1);
  const pendingScroll = useRef(null);

  useEffect(() => {
    let cancelled = false;
    let task;
    loadPdfjs()
      .then(async (pdfjs) => {
        task = pdfjs.getDocument(src);
        const pdf = await task.promise;
        const loaded = await Promise.all(
          Array.from({ length: pdf.numPages }, (_, i) => pdf.getPage(i + 1))
        );
        if (cancelled) return;
        setPages(
          loaded.map((page) => {
            const { width, height } = page.getViewport({ scale: 1 });
            return { page, size: { w: width, h: height } };
          })
        );
      })
      .catch(() => !cancelled && setFailed(true));
    return () => {
      cancelled = true;
      task?.destroy();
    };
  }, [src]);

  useEffect(() => {
    const el = scrollRef.current;
    const ro = new ResizeObserver(() => setFitWidth(el.clientWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Zoom around a point (in scroll-container coordinates) so it stays under the cursor
  const zoomTo = (next, anchorX, anchorY) => {
    const el = scrollRef.current;
    const z = clampZoom(next);
    if (!el || z === zoom) return;
    const ax = anchorX ?? el.clientWidth / 2;
    const ay = anchorY ?? el.clientHeight / 2;
    const ratio = z / zoom;
    pendingScroll.current = {
      left: (el.scrollLeft + ax) * ratio - ax,
      top: (el.scrollTop + ay) * ratio - ay,
    };
    setZoom(z);
  };

  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (el && pendingScroll.current) {
      el.scrollLeft = pendingScroll.current.left;
      el.scrollTop = pendingScroll.current.top;
      pendingScroll.current = null;
    }
  }, [zoom]);

  // Ctrl/Cmd + wheel (and trackpad pinch, which arrives as ctrl+wheel) zooms
  const zoomRef = useRef(zoomTo);
  const zoomValue = useRef(zoom);
  useLayoutEffect(() => {
    zoomRef.current = zoomTo;
    zoomValue.current = zoom;
  });
  useEffect(() => {
    const el = scrollRef.current;
    const onWheel = (e) => {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      zoomRef.current(
        zoomValue.current * Math.exp(-e.deltaY * 0.01),
        e.clientX - rect.left,
        e.clientY - rect.top
      );
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  const widest = Math.max(1, ...pages.map((p) => p.size.w));
  const scale = fitWidth ? ((fitWidth - PAGE_PADDING * 2) / widest) * zoom : 0;

  return (
    <div className="pdf-viewer" aria-label={title}>
      <div
        className="pdf-scroll"
        ref={(el) => {
          scrollRef.current = el;
          setScrollEl(el);
        }}
      >
        <div className="pdf-pages" style={{ padding: PAGE_PADDING }}>
          {pages.map(({ page, size }, i) => (
            <PdfPage key={i} page={page} size={size} scale={scale} root={scrollEl} />
          ))}
        </div>
        {!pages.length && (
          <p className="pdf-status">{failed ? 'Could not load document.' : 'Loading…'}</p>
        )}
      </div>

      <div className="pdf-toolbar">
        <button onClick={() => zoomTo(zoom / 1.25)} disabled={zoom <= ZOOM_MIN} aria-label="Zoom out">
          −
        </button>
        <button className="pdf-zoom-level" onClick={() => zoomTo(1)} aria-label="Fit to width">
          {Math.round(zoom * 100)}%
        </button>
        <button onClick={() => zoomTo(zoom * 1.25)} disabled={zoom >= ZOOM_MAX} aria-label="Zoom in">
          +
        </button>
      </div>
    </div>
  );
};

export default PdfViewer;
