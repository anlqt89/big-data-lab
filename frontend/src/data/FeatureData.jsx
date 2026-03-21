export const features = [
  {
    id: 1,
    title: "Live Search Mode Benchmarking",
    tagline: "Compare three retrieval strategies side-by-side in real time.",
    description: "Run the same query using Sequential Scan, GIN Index, or GIN + Materialized View and instantly see execution times for each — making the cost of indexing decisions visible and measurable."
  },
  {
    id: 2,
    title: "18+ Million Records, Still Fast",
    tagline: "Scaling beyond simple CRUD by managing a massive IMDB dataset.",
    description: "The database spans over 18 million records across two primary tables (titles and principals), demonstrating that the right indexing strategy keeps queries responsive even at this scale."
  },
  {
    id: 3,
    title: "GIN Trigram Indexing for ILIKE",
    tagline: "Partial-string search without the Full Table Scan penalty.",
    description: "Implemented pg_trgm GIN indexes to accelerate ILIKE pattern matching across millions of movie titles, cutting search latency from several seconds down to milliseconds."
  },
  {
    id: 4,
    title: "Query Plan Transparency",
    tagline: "See exactly what PostgreSQL is doing under the hood.",
    description: "Every search surfaces the raw PostgreSQL EXPLAIN plan alongside its execution time, so you can directly observe whether a Sequential Scan, Index Scan, or Bitmap Heap Scan was chosen."
  },
  {
    id: 5,
    title: "Multi-Filter Search",
    tagline: "Narrow results by title, type, genres, and year range simultaneously.",
    description: "Filters for title text, title type, genres, and a year range are composed into a single parameterized query, keeping results precise without sacrificing performance."
  },
  {
    id: 6,
    title: "Cursor-Based Pagination & Sorting",
    tagline: "Efficient navigation through large result sets.",
    description: "Results are paginated using cursor-based navigation rather than OFFSET, avoiding the performance cliff that comes with deep pages. Multi-column sorting is applied dynamically per request."
  }
];