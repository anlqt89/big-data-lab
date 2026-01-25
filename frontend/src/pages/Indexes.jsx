import { useEffect, useState, useCallback } from "react";
import { Analysis } from "../components/Analysis";
import { MovieCard } from "../components/MovieCard";
import { Pagination } from "../components/Pagination";
import './indexes.css'
import { SetFavicon } from "../components/SetFavicon";
import { FAVICON_TITLES } from "../global/constants";
import { useTitlesMetadata } from "../context/TitleMetaDataProvider";
import { TitlesService } from "../services/TitleService";

export const Indexes = () => {
    SetFavicon(`${FAVICON_TITLES.BIG_DATA_LAB} | ${FAVICON_TITLES.MOVIES}`);
    
    const { genres, titleTypes, searchModes } = useTitlesMetadata();

    const limit = 10;
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState({ data: [], hasNext: false, nextCursor: null });
    const [filters, setFilters] = useState({ title: '' });
    const [searchMode, setSearchMode] = useState(""); 
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [history, setHistory] = useState([""]); 
    const [benchmarks, setBenchmarks] = useState({ sequential: 0, gin: 0, gin_mat: 0 });
    const [strategy, setStrategy] = useState("Sequential Scan");
    const [queryPlan, setQueryPlan] = useState();


    const fetchData = useCallback(async (cursor = "", modeOverride) => {
        const activeMode = modeOverride || searchMode;
        if (!activeMode) return;

        setLoading(true);
        try {
            const startTime = performance.now();

            const response = await TitlesService.searchTitles(activeMode, {
            ...filters,
            cursor,
            limit
            });

            const duration = performance.now() - startTime;

            setBenchmarks(prev => ({
                ...prev,
                [activeMode]: duration.toFixed(2)
            }));

            setStrategy(response.strategyUsed);
            setQueryPlan(response.plan);

            setResults({
                data: response.results || [],
                hasNext: response.count === limit,
                nextCursor: response.nextCursor ?? null
            });


        } finally {
            setLoading(false);
        }
    }, [setSearchMode, filters]);


    useEffect(() => {
    if (!searchModes?.GIN_MAT) return;

        const mode = searchModes.GIN;
        setSearchMode(mode);
        fetchData("", mode); 
    }, [searchModes]);

    const handleSearch = (e) => {
        e.preventDefault();
        const mode = e.nativeEvent.submitter.name;

        setSearchMode(mode);
        fetchData("", mode);
        };

    const handleNext = () => {
        if (results?.nextCursor) {
            const newCursor = results.nextCursor; 
            const newHistory = [...history, newCursor];
            setHistory(newHistory);
            setCurrentPageIndex(prev => prev + 1);
            fetchData(newCursor, false);
        }
    };

    const handlePrevious = () => {
        if (currentPageIndex > 0) {
            const prevPageIndex = currentPageIndex - 1;
            const prevCursor = history[prevPageIndex];
            
            const newHistory = history.slice(0, -1);
            setHistory(newHistory);
            setCurrentPageIndex(prevPageIndex);
            fetchData(prevCursor, false);
        }
    };

    return (
        <div className="container app-container">
            <div className="movies-outer-box row align-items-start">
                <div className="col left-col">
                    <label className="form-label d-flex">
                        Current Mode: <strong>{strategy}</strong>
                    </label>
                    <form className="d-flex my-form" onSubmit={handleSearch}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search movies..."
                            value={filters.title}
                            onChange={(e) => {
                                const val = e.target.value;
                                setFilters(prev => ({ 
                                    ...prev, 
                                    title: val 
                                }));
                            }}
                        />
        
                        <button className="btn btn-dark" name={searchModes?.SEQUENTIAL} disabled={loading}>
                            {loading && searchMode === searchModes?.SEQUENTIAL ? (
                                <span className="spinner-border spinner-border-sm"></span>
                            ) : "Sequential"}
                        </button>
                        <button className="btn btn-dark" name={searchModes?.GIN} disabled={loading}>
                            {loading && searchMode === searchModes?.GIN ? (
                                <span className="spinner-border spinner-border-sm"></span>
                            ) : "GIN"}
                        </button>
                        <button className="btn btn-dark" name={searchModes?.GIN_MAT} disabled={loading}>
                            {loading && searchMode === searchModes?.GIN_MAT ? (
                                <span className="spinner-border spinner-border-sm"></span>
                            ) : "GIN Mat"}
                        </button>
                    </form>

                    <table className="table">
                        <thead>
                            <tr className="my-tr">
                                <th className="my-th">#</th>
                                <th className="my-th">Name</th>
                                <th className="my-th">Type</th>
                                <th className="my-th">Genre</th>
                                <th className="my-th">Year</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results?.data?.map((movie, i) => (
                                <MovieCard 
                                    key={movie.tconst} 
                                    index={currentPageIndex * limit + i + 1}
                                    tconst={movie.tconst}
                                    title={movie.primarytitle} 
                                    type={movie.titletype}
                                    genres={movie.genres}
                                    year={movie.startyear}
                                />
                            ))}
                        </tbody>
                    </table>
                    
                    <Pagination 
                        onNext={handleNext}
                        onPrevious={handlePrevious}
                        pageIndex={currentPageIndex + 1}
                        hasNext={results?.hasNext}
                        hasPrevious={currentPageIndex > 0}
                        loading={loading}
                    />
                </div>
                <div className="col right-col">
                    {queryPlan &&
                        <Analysis 
                            timeSeq={benchmarks.sequential } 
                            timeGin={benchmarks.gin} 
                            timeGinMat={benchmarks.gin_mat} 
                            sKey={filters.title}
                            mode={searchMode}
                            queryPlan = {queryPlan}
                        />
                    }
                </div>
            </div>
        </div>
    );
};