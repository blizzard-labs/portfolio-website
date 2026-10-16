import { useState, useEffect, useRef } from 'react';
import PdfViewer from './PdfViewer';

const youtubeId = (url) => url.match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/)?.[1];

// Slide list: embedded media, then figures, then resource links
const buildSlides = (project) => [
  ...(project.media || []),
  ...(project.images || []).map((img, i) => ({ type: 'image', label: `Fig. ${i + 1}`, ...img })),
  { type: 'resources', label: 'Resources' },
];

const Thumb = ({ slide }) => {
  if (slide.type === 'pdf') return <img src={slide.thumb} alt="" draggable="false" className="is-doc" />;
  if (slide.type === 'image') return <img src={slide.thumb || slide.src} alt="" draggable="false" />;
  if (slide.type === 'video' || slide.type === 'clip') {
    const src = slide.type === 'clip' ? slide.thumb : `https://img.youtube.com/vi/${youtubeId(slide.src)}/hqdefault.jpg`;
    return (
      <>
        <img src={src} alt="" draggable="false" />
        <span className="spotlight-play" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="currentColor" /></svg>
        </span>
      </>
    );
  }
  return (
    <span className="spotlight-thumb-text" aria-hidden="true">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1 1" />
        <path d="M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1-1" />
      </svg>
    </span>
  );
};

const ProjectSpotlight = ({ project, onOpenImage, blockKeys }) => {
  const slides = buildSlides(project);
  const [active, setActive] = useState(0);
  const thumbRefs = useRef([]);

  const go = (delta) => setActive((i) => Math.min(slides.length - 1, Math.max(0, i + delta)));

  useEffect(() => {
    thumbRefs.current[active]?.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' });
  }, [active]);

  useEffect(() => {
    if (blockKeys) return;
    const onKey = (e) => {
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const slide = slides[active];

  return (
    <div className="spotlight" onContextMenu={(e) => e.preventDefault()}>
      <div className="spotlight-stage">
        {slide.type === 'video' && (
          <iframe
            className="spotlight-frame"
            src={`https://www.youtube-nocookie.com/embed/${youtubeId(slide.src)}`}
            title={slide.label}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}

        {slide.type === 'clip' && (
          <video
            key={slide.src}
            className="spotlight-frame"
            src={slide.src}
            poster={slide.thumb}
            controls
            playsInline
            preload="metadata"
            controlsList="nodownload noremoteplayback"
            disablePictureInPicture
          />
        )}

        {slide.type === 'embed' && (
          <iframe className="spotlight-frame" src={slide.src} title={slide.label} allow="autoplay" />
        )}

        {slide.type === 'pdf' && <PdfViewer key={slide.src} src={slide.src} title={slide.label} />}

        {slide.type === 'image' && (
          <img
            className="spotlight-image"
            src={slide.src}
            alt={slide.alt}
            draggable="false"
            onClick={() => onOpenImage(slide)}
          />
        )}

        {slide.type === 'resources' && (
          <div className="spotlight-panel modal-resources">
            {project.resourceNotice && (
              <p className="spotlight-resource-notice">
                {project.resourceNotice.text}{' '}
                <a href={`mailto:${project.resourceNotice.email}`}>{project.resourceNotice.email}</a>.
              </p>
            )}
            {project.abstract && (
              <div className="spotlight-abstract">
                <h4>Abstract</h4>
                <p>{project.abstract}</p>
              </div>
            )}
            <h4>Links</h4>
            <div className="resources-list">
              {project.resources.map((resource, i) => (
                <a key={i} href={resource.url} target="_blank" rel="noopener noreferrer" className="resource-link">
                  <span className="resource-label">{resource.label}</span>
                  {resource.note && <span className="resource-note">{resource.note}</span>}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        )}

        <span className="spotlight-caption">
          {slide.label} <span className="spotlight-count">{active + 1} / {slides.length}</span>
        </span>
      </div>

      <div className="spotlight-rail">
        {slides.map((s, i) => (
          <button
            key={i}
            ref={(el) => (thumbRefs.current[i] = el)}
            className={`spotlight-thumb${i === active ? ' active' : ''}`}
            onClick={() => setActive(i)}
            aria-label={s.label}
          >
            <span className="spotlight-thumb-frame">
              <Thumb slide={s} />
            </span>
            <span className="spotlight-thumb-label">{s.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProjectSpotlight;
