import { useEffect, useState, useCallback } from "react";
import { Analysis } from "../components/Analysis";
import { MovieCard } from "../components/MovieCard";
import { Pagination } from "../components/Pagination";
import './indexes.css'
import { SetFavicon } from "../components/SetFavicon";
import { FAVICON_TITLES } from "../global/constants";
import { TitlesService } from "../services/TitleService";
import { useTitlesMetadata } from "../context/TitleMetaDataProvider";

export const Indexes = () => {
    SetFavicon(`${FAVICON_TITLES.BIG_DATA_LAB} | ${FAVICON_TITLES.MOVIES}`);
    
   const {genres, titleTypes, searchModes, exampleURL, isLoading, error} = useTitlesMetadata();
    
    const limit = 10;
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState({ data: [], hasNext: false, nextCursor: null });
    const [filters, setFilters] = useState({ title: '', 
                                            titletype: '',
                                            genres: '',
                                            fromYear: '',
                                            toYear: ''});
    const { title, titletype, genres: genreFilter, fromYear, toYear } = filters;

    const [searchMode, setSearchMode] = useState(""); 
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [history, setHistory] = useState([""]); 
    const [benchmarks, setBenchmarks] = useState({ sequential: 0, gin: 0, gin_mat: 0 });
    const [strategy, setStrategy] = useState("Sequential Scan");
    const [queryPlan, setQueryPlan] = useState();


    const fetchData = useCallback(async (cursor = "", activeMode) => {
        setLoading(true);
    
        try {
    
            const response = await TitlesService.searchTitles(activeMode, {
            title,
            titletype,
            genres: genreFilter,
            fromYear,
            toYear,
            cursor,
            limit
            });
            
            setBenchmarks(prev => ({
                ...prev,
                [activeMode]: Number(response.executionTime).toFixed(2).toString()
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
    }, [title, titletype, fromYear,toYear, genreFilter]);


    useEffect(() => {
        if (isLoading) return;
        if (!searchModes?.GIN) return;

        const mode = searchModes.GIN;
        setSearchMode(searchModes.GIN);
        fetchData("", mode);
    }, [isLoading, searchModes, fetchData]);

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
            fetchData(newCursor, searchMode);
        }
    };

    const handlePrevious = () => {
        if (currentPageIndex > 0) {
            const prevPageIndex = currentPageIndex - 1;
            const prevCursor = history[prevPageIndex];
            
            const newHistory = history.slice(0, -1);
            setHistory(newHistory);
            setCurrentPageIndex(prevPageIndex);
            fetchData(prevCursor, searchMode);
        }
    };

    return (
        <div className="container app-container">
            <div className="movies-outer-box row align-items-start">
                <div className="col left-col">
                    <form className="my-form" onSubmit={handleSearch}>
                        <div className="my-from-header">
                            <label className="form-label">
                                Current Mode: <strong>{strategy}</strong> 
                            </label>
                        </div>
                        <div className="search-group">
                              <div className="left-filter-group">
                            <div className="left-filter-group-item left-filter-group-top">
                                 <div className="filter-item-group">
                                    <label className="small fw-bold">Type</label>
                                    <select 
                                        className="form-select form-select-sm"
                                        value={filters.titletype}
                                        onChange={(e) => setFilters(prev => ({ ...prev, titletype: e.target.value }))}
                                    >   
                                        <option value="">All Types</option>
                                        {titleTypes && Object.entries(titleTypes).map(([label, val]) =>(
                                            <option key={label} value={val}>{val}</option>
                                        ))};
                                    </select>
                                </div>

                        <div className="genre-width filter-item-group">
                            <label className="small fw-bold">Genres</label>
                            <input 
                                type="text" 
                                className="form-control form-control-sm"
                                placeholder="e.g. Action, Sci-Fi"
                                value={filters.genres}
                                onChange={(e) => setFilters(prev => ({ ...prev, genres: e.target.value }))}
                            />
                        </div>
                            </div>
                            <div className="left-filter-group-item left-filter-group-bot">
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
                            </div>
                         
                    </div>
                    <div className="right-filter-group">
                        <div className="year-group">
                             <div className="filter-item-group year-width">
                            <label className="small fw-bold">From Year</label>
                            <input 
                                type="number" 
                                className="form-control form-control-sm"
                                placeholder="1990"
                                value={filters.fromYear}
                                onChange={(e) => setFilters(prev => ({ ...prev, fromYear: e.target.value }))}
                            />
                        </div>

                        <div className="filter-item-group year-width">
                            <label className="small fw-bold">To Year</label>
                            <input 
                                type="number" 
                                className="form-control form-control-sm"
                                placeholder="2024"
                                value={filters.toYear}
                                onChange={(e) => setFilters(prev => ({ ...prev, toYear: e.target.value }))}
                            />
                        </div>
                        </div>
                        <div className="btn-group"> 
                                 <button className="btn btn-dark" name={searchModes?.SEQUENTIAL} disabled={loading}>
                                    {loading && searchMode === searchModes?.SEQUENTIAL ? (
                                    <span className="spinner-border spinner-border-sm"></span>
                                    ) : "Sequential"}
                                </button>
                                <button className="btn btn-dark" name={searchModes?.GIN} disabled={loading}>
                                    {loading && searchMode === searchModes?.GIN ? (
                                        <span className="spinner-border spinner-border-sm"></span>
                                    ) : "Gin"}
                                </button>
                                <button className="btn btn-dark" name={searchModes?.GIN_MAT} disabled={loading}>
                                    {loading && searchMode === searchModes?.GIN_MAT ? (
                                        <span className="spinner-border spinner-border-sm"></span>
                                    ) : "Gin Mat"}
                                </button>
                            </div>
                    </div>
                       
                        </div>
                       
                    </form>

                    <table className="table">
                        <thead>
                            <tr className="my-tr">
                                <th className="my-th">#</th>
                                <th className="my-th">Name</th>
                                <th className="my-th">Type</th>
                                <th className="my-th">Genres</th>
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