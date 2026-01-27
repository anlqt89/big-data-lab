import { useState } from 'react';
import './announcement.css';

export const Announcement = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="announcement-container">
     

      <div>
        <div className='announcement-header'>
        <h3 > 
        <span aria-label="announcement">📢 Project Update</span>

        </h3>
                <button
                className="announcement-close"
                aria-label="Close announcement"
                onClick={() => setVisible(false)}
            >
                ✕
            </button>
        </div>
        <p>
          Due to database limitations, we have reached the current ceiling for
          search performance. While further scaling (horizontal or vertical) is
          possible, the complexity currently outweighs the benefits.
        </p>

        <p>
          <strong>Next Steps:</strong> Future improvements will focus on
          implementing a <strong>Ranking System</strong> to prioritize results
          based on user history, view counts, and ratings.
        </p>
      </div>
    </div>
  );
};
