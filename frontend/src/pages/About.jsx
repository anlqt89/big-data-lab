import './about.css';

const About = () => {

  
  return (<>
    <div className="about-container">
      <header className="about-header">
        <h1>About the Project</h1>
        <p className="subtitle">High-Performance Movie Data Analytics</p>
      </header>

      <section className="about-section">
        <h2>The Vision</h2>
        <p>
          This dashboard was built to demonstrate how <strong>Big Data</strong> can be 
          visualized in real-time. By connecting a React frontend to a optimized PostgreSQL 
          backend, I’ve created a bridge between raw relational data and meaningful 
          cinematic insights.
        </p>
      </section>

      <section className="tech-deep-dive">
        <h2>Technical Architecture</h2>
        <div className="tech-grid">
          <div className="tech-card">
            <h3>Frontend Visualization</h3>
            <p>
              Utilized <strong>Recharts</strong> for responsive data rendering. 
              The charts use <strong>Area and Bar geometries</strong> to visualize 
              actor career trajectories and genre distributions.
            </p>
          </div>

          <div className="tech-card highlight">
            <h3>Senior SQL Techniques</h3>
            <p>
              To keep the UI fast, I offloaded heavy calculations to the database. 
              I implemented <strong>SQL Window Functions</strong> like <code>AVG(...) OVER(...)</code> 
              to calculate rolling averages and career trends. 
            </p>
            <div className="code-snippet">
               -- Example: Moving Average Calculation{"\n"}
               AVG(runtime) OVER(ORDER BY year ROWS 3 PRECEDING)
            </div>
          </div>

          <div className="tech-card">
            <h3>Indexing & Optimization</h3>
            <p>
              Implemented <strong>GIN Trigram Indexing</strong> to support fast 
              <code> ILIKE </code> pattern matching across millions of movie titles, 
              reducing search latency by over 90%.
            </p>
          </div>
        </div>
      </section>

      <section className="coming-soon-preview">
        <h2>Roadmap (Coming Soon)</h2>
        <ul className="roadmap-list">
          <li><strong>Geospatial Mapping:</strong> Visualizing filming locations using PostGIS.</li>
          <li><strong>Sentiment Analysis:</strong> NLP processing on 100k+ user reviews.</li>
          <li><strong>Graph Analysis:</strong> Mapping the "Six Degrees of Separation" between actors.</li>
        </ul>
      </section>
    </div>
    </>
  );
};

export default About;