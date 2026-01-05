export const features = [
  {
    id: 1,
    title: "Comparative Search Architecture",
    tagline: "Performance analysis of real-world search strategies.",
    description: "Implemented and benchmarked three distinct retrieval methods—Standard Indexing, Non-Indexed (Sequential), and Materialized Views—to demonstrate the trade-offs between storage costs and query speed."
  },
  {
    id: 2,
    title: "High-Volume Data Management",
    tagline: "Scaling beyond simple CRUD applications by managing massive datasets.",
    description: "Successfully architected a database environment containing over 18 million records across two primary tables, ensuring the system remains responsive under significant data loads."
  },
  {
    id: 3,
    title: "Optimized Pattern Matching",
    tagline: "Tackling the ILIKE performance bottleneck in SQL.",
    description: "Optimized complex partial-string search queries using advanced PostgreSQL techniques to prevent Full Table Scans, reducing search latency from seconds to milliseconds."
  },
  {
    id: 4,
    title: "Full-Stack Performance Monitoring",
    tagline: "End-to-end visibility from the UI to the database engine.",
    description: "Built a cohesive React frontend and Node.js API that measures and displays execution time for every query, providing a transparent look at how backend architecture affects user experience."
  },
  {
    id: 5,
    title: "Advanced PostgreSQL Indexing",
    tagline: "Leveraging deep database features for maximum efficiency.",
    description: "Utilized B-Tree and GIN indexing strategies to handle high-cardinality data, ensuring that Order By and Limit operations remain performant even at the 9-million-row mark."
  },
  {
    id: 6,
    title: "Scalable API Architecture",
    tagline: "Building a robust bridge between massive data and the UI.",
    description: "Designed a Node.js/Express backend capable of handling high-concurrency requests and streaming large result sets efficiently while maintaining low memory overhead."
  }
];