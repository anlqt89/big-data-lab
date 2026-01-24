import './analysis.css';
import { AnalysisCard } from './AnalysisCard';
import { QueryVisualizer } from './QueryVisualizer';

export const Analysis = ({timeSeq, timeGin, timeGinMat, sKey, typeSearch, id, mode}) => {
    const table = typeSearch !== 'materialized' ? "titles" : "search_registry";
    const column = typeSearch !== 'materialized' ? "primarytitle" : "search_text"; 
    let rate = {
        timeSeq: "1",
        timeGin: "-----",
        timeGinMat: "-----",
    }

    function calculateGain(){
        if (timeSeq === 0){
            rate = {
                seq: "1",
                gin: "-----",
                ginMat: "-----",
            }
        }else{
            rate.gin = timeGin != 0 ? (timeSeq/timeGin).toFixed(1).toString() : "-----"
            rate.ginMat = timeGinMat != 0 ? (timeSeq/timeGinMat).toFixed(1).toString() : "-----"
        }
    };
    calculateGain();

    const times = [
        { name: 'sequential', val: timeSeq},
        { name: 'gin index', val: timeGin },
        { name: 'gin + materialzed', val: timeGinMat }
    ].sort((a, b) => a.val - b.val);

    const rankNoIndex = times.findIndex(item => item.name === 'sequential') + 1;
    const rankIndex = times.findIndex(item => item.name === 'gin index') + 1;
    const rankMat = times.findIndex(item => item.name === 'gin + materialzed') + 1;

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
                        <tr className={timeSeq !== 0 ?"rank-"+rankNoIndex : ""}>
                            <td>Parallel Seq Scan</td>
                            <td>{timeSeq} ms</td>
                            <td className="gain-baseline">Baseline (1x)</td>
                        </tr>
                        <tr className={timeGin !== 0? "rank-"+rankIndex : ""}>
                            <td>Indexed Table Scan</td>
                            <td>{timeGin} ms</td>
                            <td className="gain-mid">{rate.gin}x Faster</td>
                        </tr>
                        <tr className={timeGinMat !== 0 ? "rank-"+rankMat: ""}>
                            <td>Materialized View</td>
                            <td>{timeGinMat} ms</td>
                            <td className="gain-high">{rate.ginMat}x Faster</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <section className="explanation">
                <h3>Technical Breakdown</h3>
               <div className="insight-card">
                    <h4>Query</h4>
                    <QueryVisualizer table={table} column={column} sKey={sKey} id ={id} mode={mode}></QueryVisualizer>
                </div>
               <div className="insight-card">
                   <AnalysisCard timeNoIndex={timeSeq} timeIndex={timeGin} timeMat={timeGinMat} sKey={sKey} mode={mode}/>
                </div>
            </section>
        </div>
    );
};