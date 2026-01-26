

import { useTitlesMetadata } from '../context/TitleMetaDataProvider';
import './analysis.css';
import { AnalysisCard } from './AnalysisCard';
import { QueryVisualizer } from './QueryVisualizer';

export const Analysis = ({timeSeq, timeGin, timeGinMat, sKey, mode, queryPlan}) => {
    const { searchModes } = useTitlesMetadata();
    const sql = queryPlan.baseSql;
    const conditions = []
   
    for (const con of queryPlan.filterDefs){
        if(con.value !== undefined && con.value !== null && con.value !== ''){
            conditions.push(`${con.column} ${con.operator} ${con.wildCards}`)
        }
    }
    const limit = queryPlan.limit;
   
    const rates = {
        [searchModes.SEQUENTIAL] : 1.0,
        [searchModes.GIN] : timeGin > 0 ? (timeSeq / timeGin) : 0.0,
        [searchModes.GIN_MAT] : timeGinMat > 0 ? (timeSeq / timeGinMat) : 0,
    }

    const ranks = Object.keys(rates).sort((a, b) => rates[b] - rates[a]);

    return (
        <div className="analysis-container">
            <section className="analysis-header">
                <h2 className="analysis-title">Performance Benchmark Results</h2>
                <p className="analysis-subtitle">Comparing Query Optimization Strategies in PostgreSQL</p>
            </section>

            <label htmlFor="movie-search" className="form-label">Database Metrics</label>
           
            <section className="results">
                <table className="analysis-table">
                    <thead>
                        <tr>
                            <th>Optimization Method</th>
                            <th>Execution Time</th>
                            <th>Performance Gain</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className={timeSeq !== 0 ? `rank-${ranks.indexOf(searchModes.SEQUENTIAL) + 1}` : ""}>
                            <td>Parallel Seq Scan</td>
                            <td>{timeSeq} ms</td>
                            <td className="gain-baseline">Baseline (1x)</td>
                        </tr>
                        <tr className={timeGin !== 0? `rank-${ranks.indexOf(searchModes.GIN) + 1}` : ""}>
                            <td>Indexed Table Scan</td>
                            <td>{timeGin} ms</td>
                            <td className="gain-mid">{rates[searchModes.GIN].toFixed(1)}x Faster</td>
                        </tr>
                        <tr className={timeGinMat !== 0 ? `rank-${ranks.indexOf(searchModes.GIN_MAT) + 1}` : ""}>
                            <td>Materialized View</td>
                            <td>{timeGinMat} ms</td>
                            <td className="gain-high">{rates[searchModes.GIN_MAT].toFixed(1)}x Faster</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <section className="explanation">
                <h3>Technical Breakdown</h3>
               <div className="insight-card">
                    <h4>Query</h4>
                    <QueryVisualizer sql={sql} conditions={conditions} limit={limit} mode={mode}></QueryVisualizer>
                </div>
               <div className="insight-card">
                   <AnalysisCard timeSeq={timeSeq} timeGin={timeGin} timeGinMat={timeGinMat} sKey={sKey} mode={mode}/>
                </div>
            </section>
        </div>
    );
};