import { SetFavicon } from '../components/SetFavicon';
import { FAVICON_TITLES } from '../global/constants';
import './about.css';

const About = () => {

  SetFavicon(`${FAVICON_TITLES.BIG_DATA_LAB} | ${FAVICON_TITLES.ABOUT}`);
  
  return (<>
    <div className="about-container">
      <header className="about-header">
        <h1>About the Project</h1>
        <p className="subtitle">A PostgreSQL Indexing Lab Built on IMDB Data</p>
      </header>

      <section className="about-section">
        <h2>What This Is</h2>
        <p>
          This is a personal learning project built to explore how different PostgreSQL
          indexing strategies affect real query performance. Rather than using synthetic
          data, it runs against the public <strong>IMDB dataset</strong> — over 18 million
          records across two tables — to keep the benchmarks honest.
        </p>
        <p>
          The goal isn’t to build a polished product. It’s to make the trade-offs between
          Sequential Scans, GIN Indexes, and Materialized Views visible and measurable in a
          working UI.
        </p>
      </section>

      <section className="tech-deep-dive">
        <h2>What’s Built</h2>
        <div className="tech-grid">
          <div className="tech-card">
            <h3>Three Search Modes</h3>
            <p>
              Each search can be run as a <strong>Sequential Scan</strong>, a <strong>GIN Index</strong>
              scan, or a <strong>GIN + Materialized View</strong> scan. Execution times are
              captured and displayed side-by-side so the difference is easy to see.
            </p>
          </div>

          <div className="tech-card highlight">
            <h3>GIN Trigram Indexing</h3>
            <p>
              Used <strong>pg_trgm</strong> GIN indexes to make <code>ILIKE</code> pattern
              matching fast across millions of movie titles. Without this, partial-string
              searches force a full table scan every time.
            </p>
            <div className="code-snippet">
               -- GIN index on title for ILIKE support{"\n"}
               CREATE INDEX ON titles USING GIN (primaryTitle gin_trgm_ops);
            </div>
          </div>

          <div className="tech-card">
            <h3>Query Plan Visibility</h3>
            <p>
              Every search surfaces the raw PostgreSQL <strong>EXPLAIN output</strong> so
              you can see whether an Index Scan, Bitmap Heap Scan, or Sequential Scan was
              actually chosen — not just what was expected.
            </p>
          </div>
        </div>
      </section>

      <section className="coming-soon-preview">
        <h2>What’s Next</h2>
        <ul className="roadmap-list">
          <li><strong>Trends:</strong> Genre and runtime trends over time using SQL Window Functions.</li>
          <li><strong>Collaborations:</strong> Actor co-occurrence networks from the principals table.</li>
          <li><strong>Recharts Visualizations:</strong> Charts to complement the raw query results.</li>
        </ul>
      </section>
    </div>
    </>
  );
};

export default About;