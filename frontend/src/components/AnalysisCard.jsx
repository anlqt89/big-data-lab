import { useTitlesMetadata } from "../context/TitleMetaDataProvider";



export const AnalysisCard = ({ timeSeq, timeGin, timeGinMat, mode }) => {
    const { searchModes } = useTitlesMetadata();

    const calculateSpeedup = (currentTime) => {
        if (!timeSeq || !currentTime) return null;
        return (timeSeq / currentTime).toFixed(1);
    };

    if (timeSeq === 0) {
        const isWaitingForSeq = timeGin > 0 || timeGinMat > 0;
        return (
            <div className="analysis-status">
                <h4>{isWaitingForSeq ? "⚡ Missing Baseline" : "System Ready"}</h4>
                <p>
                    {isWaitingForSeq 
                        ? "Please run a 'Sequential' search to calculate the performance speedup."
                        : "Run a search with 'No Index' to start the database analysis."}
                </p>
            </div>
        );
    }
    if (mode === searchModes.SEQUENTIAL) {
        return (
            <div className="analysis-content">
                <h4 className="rank-3">Sequential Scan (The Baseline)</h4>
                <div className="pros-cons">
                    <strong>Pros:</strong> No storage overhead; ideal for tiny tables. <br/>
                    <strong>Cons:</strong> $O(N)$ complexity. The engine must touch every data block on disk.
                </div>
                <blockquote>
                    PostgreSQL is forced to ignore indexes. This is your "worst-case scenario" metric.
                </blockquote>
            </div>
        );
    }


    if (mode === searchModes.GIN) {
        const speed = calculateSpeedup(timeGin);
        return (
            <div className="analysis-content">
                <h4 className="rank-2">GIN Trigram Index Analysis</h4>
                {speed > 1 && <div className="badge">⚡ {speed}x Faster than Sequential</div>}
                
                <div className="">
                    <strong>Pros:</strong> Efficient for <code>LIKE '%key%'</code> searches using trigrams.
                    Matches multiple columns without scanning all rows. <br/>
                    <strong>Cons:</strong> "Write Penalty" — CRUD operations are slower because the index must update.
                </div>
            </div>
        );
    }

    if (mode === searchModes.GIN_MAT) {
        const speed = calculateSpeedup(timeGinMat);
        return (
            <div className="analysis-content">
                <h4 className="rank-1">Materialized View (Pre-Computed)</h4>
                {speed > 1 && <div className="badge">⚡ {speed} x Faster than Sequential</div>}

                <div className="">
                    <strong>Pros:</strong> Acts as a <strong>Physical Cache</strong>. Joins are pre-calculated 
                    into a single <code>search_keys</code> column. <br/>
                    <strong>Cons:</strong> Data becomes "stale." Requires a <code>REFRESH MATERIALIZED VIEW</code> to see new data.
                </div>
            </div>
        );
    }

    return null;
};