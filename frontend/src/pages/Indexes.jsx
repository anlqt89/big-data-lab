import { useEffect, useState, useCallback, useRef } from "react";
import { Analysis } from "../components/Analysis";
import { MovieCard } from "../components/MovieCard";
import { Pagination } from "../components/Pagination";
import './indexes.css'
import { SetFavicon } from "../components/SetFavicon";
import { FAVICON_TITLES } from "../global/constants";
import { TitlesService } from "../services/TitleService";
import { useTitlesMetadata } from "../context/TitleMetaDataProvider";
import { Announcement } from "../components/Announcement";

export const Indexes = () => {
    SetFavicon(`${FAVICON_TITLES.BIG_DATA_LAB} | ${FAVICON_TITLES.MOVIES}`);
    
   const { titleTypes, searchModes, isLoading} = useTitlesMetadata();
    
    const limit = 10;
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState({ data: [], hasNext: false, nextCursor: null });
    const titleRef = useRef();
    const typeRef = useRef();
    const genresRef = useRef();
    const fromYearRef = useRef();
    const toYearRef = useRef();

    const [searchMode, setSearchMode] = useState(""); 
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [history, setHistory] = useState([""]); 
    const [benchmarks, setBenchmarks] = useState({ sequential: 0, gin: 0, gin_mat: 0 });
    const [strategy, setStrategy] = useState("Sequential Scan");
    const [queryPlan, setQueryPlan] = useState();
    const [configSort, setConfigSort] = useState({
        "primarytitle": true,
        "titletype": true,
        "genres": true,
        "startyear": true,
    })

    const fetchData = useCallback(async (cursor = "", activeMode, currentFilters) => {
        setLoading(true);
        
        try {
            const filters = currentFilters || {
                        title: "",
                        titletype: "",
                        genres: ""
                    };
            const response = await TitlesService.searchTitles(activeMode, {
            ...filters,
              configSort: JSON.stringify(configSort),
            cursor,
            limit
            });
            setBenchmarks(prev => ({
                ...prev,
                [activeMode]: Number(response.executionTime.slice(0, -2)).toFixed(2).toString()
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
    }, [configSort]);


    useEffect(() => {
        if (isLoading) return;
        if (!searchModes?.GIN) return;

        const mode = searchModes.GIN;
        setSearchMode(searchModes.GIN);
        fetchData("", mode);
    }, [isLoading, searchModes, fetchData]);

    const handleSearch = (e) => {
        if (e) e.preventDefault();
        if (!titleRef.current) return; 

        const currentFilters = {
            title: titleRef.current.value,
            titletype: typeRef.current.value,
            genres: genresRef.current.value,
            fromYear: fromYearRef.current.value,
            toYear: toYearRef.current.value
        };
        
        const mode = e.nativeEvent.submitter.name;

        setSearchMode(mode);
        fetchData("", mode, currentFilters);
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
    
    

    const getSortIcon = (column) => {
        if (configSort[column] === true){
             return ' ▾'
        }
        return ' ▴';
    };

    const handleSort = (e, column) =>{
        if (e) e.preventDefault();
        const reverseSort = !configSort[column]
        const tmp = { ...configSort };
        delete tmp[column];
        const newConfig = { [column]: reverseSort, ...tmp };
        setConfigSort(newConfig);

        const currentFilters = {
            title: titleRef.current.value,
            titletype: typeRef.current.value,
            genres: genresRef.current.value,
            fromYear: fromYearRef.current.value,
            toYear: toYearRef.current.value
        };

        fetchData("", searchMode, currentFilters);
    }

    return (
        <div className="container app-container">
            <Announcement></Announcement>
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
                                        ref={typeRef}
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
                                ref={genresRef}
                            />
                        </div>
                            </div>
                            <div className="left-filter-group-item left-filter-group-bot">
                                    <input
                            type="text"
                            className="form-control"
                            placeholder="Search movies..."
                            ref={titleRef}
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
                                placeholder="1950"
                                 ref={fromYearRef}
                            />
                        </div>

                        <div className="filter-item-group year-width">
                            <label className="small fw-bold">To Year</label>
                            <input 
                                type="number" 
                                className="form-control form-control-sm"
                                placeholder={new Date().getFullYear()}
                                  ref={toYearRef}
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
                                    <th className="my-th sortable"  onClick={(e) => handleSort(e, 'primarytitle')}>
                                        Name {getSortIcon('primarytitle')}
                                    </th>
                                    <th className="my-th sortable" onClick={(e) => handleSort(e, 'titletype')}>
                                            Type <span className="sort-arrow">{getSortIcon('titletype')}</span>
                                    </th>
                                    <th className="my-th sortable" onClick={(e) => handleSort(e, 'genres')}>
                                        Genres {getSortIcon('genres')}
                                    </th>
                                    <th className="my-th sortable" onClick={(e) => handleSort(e, 'startyear')}>
                                        Year {getSortIcon('startyear')}
                                    </th>
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
                            sKey={titleRef.current?.value || "No search term"}
                            mode={searchMode}
                            queryPlan = {queryPlan}
                        />
                    }
                </div>
            </div>
        </div>
    );
};