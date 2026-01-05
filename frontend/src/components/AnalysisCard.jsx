export const AnalysisCard = ({timeNoIndex, timeIndex, timeMat, sKey, mode}) => {
    const keyword = sKey || "";
   
    if (timeNoIndex === 0 && timeIndex === 0 && timeMat === 0) {
        return (
            <>
                <h4>System Ready</h4>
                <p>Input a search with <strong>No Index</strong> to have a metric for <strong>Database Analysis</strong>.</p>
            </>
        );
    }

    // 2. CASE: Sequential Scan (No Index)
    if (mode === 'No Index') {
        return (
            <>
                <h4>Sequential Scan</h4>
                <p>
                    PostgreSQL is performing a <strong>Parallel Seq Scan</strong>. 
                    Because <strong>Index Scans</strong> are disabled, the engine must read every 
                    <strong> Data Block</strong> from the disk. This is <strong>O(N) complexity</strong>. 
                    It is efficient for <strong>empty strings</strong> or when fetching a 
                    large percentage of the table.
                </p>
            </>
        );
    }

    // 3. CASE: Index Analysis
    if (mode === 'Index') {
        const speedup = timeNoIndex > 0 ? (timeNoIndex / timeIndex).toFixed(1) : 0;
        return (
            <>
                <h4>Index Analysis</h4>
                <p>
                    The engine is using a <strong>GIN/GIST Trigram Index</strong>. 
                    Instead of reading the whole table, it uses a <strong>Bitmap Index Scan </strong> 
                    to find <strong>Tuple IDs (TIDs)</strong> matching <strong>"{keyword}"</strong>. 
                    {speedup > 1 && <>This is roughly <strong>{speedup}x faster</strong> than a raw scan.</>}
                </p>
            </>
        );
    }

    // 4. CASE: Materialized View Analysis
    if (mode === 'Materialized') {
        return (
            <>
                <h4>Materialized View Analysis</h4>
                <p>
                    The query is hitting a <strong>Physical Snapshot</strong>. 
                    Unlike a standard view, a <strong>Materialized View</strong> stores the 
                    result on disk. This eliminates <strong>Filtering Latency</strong> 
                    by acting like a <strong>Pre-Computed Cache</strong>.
                </p>
            </>
        );
    }

    return null;
};