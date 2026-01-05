import './queryvisualizer.css'
export const QueryVisualizer = ({ sKey, id, mode }) => {
const table = mode !== 'Materialized' ? "titles" : "search_registry";
const column = mode !== 'Materialized' ? "primarytitle" : "search_text"; 
const index_tongle = mode === 'No Index' ? "SET LOCAL enable_indexscan = OFF" :"SET LOCAL enable_indexscan = ON"
  const keyword = sKey || "";
  const cursor = id || "tt000000";

  return (
    <div className="sql-code-box">
      <pre>
        <span className="keyword">{index_tongle};</span>{"\n"}
        <span className="keyword">SELECT</span> * <span className="keyword">FROM</span> {table}{"\n"}
        <span className="keyword">WHERE</span> {column} <span className="operator">ILIKE</span>{' '}
        <span className="string">'%{keyword}%'</span>{"\n"}
        <span className="keyword">AND</span> tconst &gt; <span className="string">'{cursor}'</span>{"\n"}
        <span className="keyword">LIMIT</span> 10;
      </pre>
    </div>
  );
};