import './analysis.css';
import { AnalysisCard } from './AnalysisCard';
import { QueryVisualizer } from './QueryVisualizer';

export const Analysis = ({timeNoIDX, timeIDX, timeMat, sKey, typeSearch, id, mode}) => {
    const table = typeSearch !== 'materialized' ? "titles" : "search_registry";
    const column = typeSearch !== 'materialized' ? "primarytitle" : "search_text"; 
    let rate = {
        timeNoIDX: "1",
        timeIDX: "-----",
        timeMat: "-----",
    }

    function calculateGain(){
        if (timeNoIDX === 0){
            rate = {
                timeNoIDX: "1",
                timeIDX: "-----",
                timeMat: "-----",
            }
        }else{
            rate.timeIDX = timeIDX != 0 ? (timeNoIDX/timeIDX).toFixed(1).toString() : "-----"
            rate.timeMat = timeMat != 0 ? (timeNoIDX/timeMat).toFixed(1).toString() : "-----"
        }
    };
    calculateGain();

    const times = [
        { name: 'noIndex', val: timeNoIDX},
        { name: 'index', val: timeIDX },
        { name: 'mat', val: timeMat }
    ].sort((a, b) => a.val - b.val);

    const rankNoIndex = times.findIndex(item => item.name === 'noIndex') + 1;
    const rankIndex = times.findIndex(item => item.name === 'index') + 1;
    const rankMat = times.findIndex(item => item.name === 'mat') + 1;

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
                        <tr className={timeNoIDX !== 0 ?"rank-"+rankNoIndex : ""}>
                            <td>Parallel Seq Scan</td>
                            <td>{timeNoIDX} ms</td>
                            <td className="gain-baseline">Baseline (1x)</td>
                        </tr>
                        <tr className={timeIDX !== 0? "rank-"+rankIndex : ""}>
                            <td>Indexed Table Scan</td>
                            <td>{timeIDX} ms</td>
                            <td className="gain-mid">{rate.timeIDX}x Faster</td>
                        </tr>
                        <tr className={timeMat !== 0 ? "rank-"+rankMat: ""}>
                            <td>Materialized View</td>
                            <td>{timeMat} ms</td>
                            <td className="gain-high">{rate.timeMat}x Faster</td>
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
                   <AnalysisCard timeNoIndex={timeNoIDX} timeIndex={timeIDX} timeMat={timeMat} sKey={sKey} mode={mode}/>
                </div>
            </section>
        </div>
    );
};