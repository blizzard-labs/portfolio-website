import { readings } from '../../data/content';
import './Readings.css';

const Readings = () => {
  return (
    <section id="readings" className="readings section">
      <div className="container">
        <div className="readings-section">
          <div className="readings-header">
            <span className="readings-ornament">❧</span>
            <h3 className="readings-title">Current Reading List</h3>
            <span className="readings-ornament">❧</span>
          </div>
          <div className="readings-list">
            {readings.map((book, index) => (
              <a
                key={index}
                href={book.url}
                target="_blank"
                rel="noopener noreferrer"
                className="reading-item"
              >
                <span className="reading-number">{index + 1}.</span>
                <div className="reading-content">
                  <span className="reading-title">{book.title}</span>
                  <span className="reading-author">by {book.author}</span>
                  {book.type && <span className="reading-type">{book.type}</span>}
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="reading-arrow">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Readings;
