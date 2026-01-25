import { useTitlesMetadata } from '../context/TitleMetaDataProvider';
import './queryvisualizer.css';


export const QueryVisualizer = ({ sql, conditions, limit, mode}) => {
  const { searchModes } = useTitlesMetadata();
  
  return (
    <div className="sql-code-box">
      <pre>
        <span className="keyword">{mode === searchModes.SEQUENTIAL ? "SET enable_indexscan = off;" : ""}</span>{"\n"}
        <span className="keyword">{sql}</span>{"\n"}
        <span className="keyword">WHERE</span>{"\n"}
        {conditions.map( (con, index)  =>{
          return  <span key={index} className='keyword'> {index === 0 ? '' : 'AND'} {con}{"\n"}</span>
        })}

        <span className="keyword">LIMIT</span> {limit};
      </pre>
    </div>
  );
};