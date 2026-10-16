import { featuredVideos } from '../../data/content';
import './Featured.css';

const Featured = () => (
  <section id="featured" className="featured section" aria-labelledby="featured-heading">
    <div className="container">
      <div className="section-header">
        <h2 id="featured-heading" className="section-title">Featured</h2>
        <div className="section-line" aria-hidden="true"></div>
      </div>
      <div className="featured-grid">
        {featuredVideos.map((video) => (
          <article key={video.id} className="featured-video">
            <iframe
              className="featured-player"
              src={`https://www.youtube-nocookie.com/embed/${video.id}`}
              title={video.title}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
            <p className="featured-channel">{video.channel}</p>
            <h3 className="featured-title">
              <a href={`https://youtu.be/${video.id}`} target="_blank" rel="noopener noreferrer">
                {video.title}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </a>
            </h3>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Featured;
