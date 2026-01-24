import { useEffect, useState } from "react";
import { Analysis } from "../components/Analysis";
import { MovieCard } from "../components/MovieCard";
import { Pagination } from "../components/Pagination";
import './indexes.css'
import { SetFavicon } from "../components/SetFavicon";
import { FAVICON_TITLES } from "../global/constants";
import { useTitlesMetadata } from "../context/TitleMetaDataProvider";
export const Indexes = () => {
    SetFavicon(`${FAVICON_TITLES.BIG_DATA_LAB} | ${FAVICON_TITLES.MOVIES}`);
    
    //Anminaion, setting, etc
    const limit = 10;
    const [loading, setLoading] = useState(false);
    const {genres, titletypes, searchModes, loading_md} = useTitlesMetadata();
    console.log("======++", genres, titletypes, searchModes, loading_md);

    //Pagination
    const [history, setHistory] = useState([""]);
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [filters, setFilters] = useState({
            searchText: '',
            genre: '',
            type: ''
        });
    const [searchMode, setSearchMode] = useState(searchModes.availableModes )

    const data = await searchTitles();



    // 2. Handle Search (Form Submit)
    const handleSearch = (e) => {
        e.preventDefault();
        const mode = e.nativeEvent.submitter.name; // "index", "noIndex", or "materialized"
        setSearchMode(mode);
        fetchData("", true, mode); // Call with empty cursor and reset flag
    };

    useEffect(() => {
        const loadInitialData = async () => {
             setLoading(true);
            try {
                // Using your default params: limit 10 and standard type
                const response = await fetch(`/api/titles/search?key=${encodeURIComponent(searchKey)}&limit=10&type=standard`);
                const json = await response.json();
                setResults(json);
                setSearchMode("No Index")
            } catch (error) {
                console.error("Failed to load initial data:", error);
            } finally {
                setLoading(false);
            }
        };
        loadInitialData();
       
    }, []);

    const handleNext = () => {
        if (results?.nextCursor?.cursorTconst) {
            const newCursor = results.nextCursor.cursorTconst;
            
            // Add the new cursor to our history stack
            setHistory([...history, newCursor]);
            setCurrentPageIndex(prev => prev + 1);
            
            fetchData(newCursor);
        }
    };

    const handlePrevious = () => {
        if (currentPageIndex > 0) {
            const prevPageIndex = currentPageIndex - 1;
            const prevCursor = history[prevPageIndex];
            
            // Remove the last cursor from history
            setHistory(history.slice(0, -1));
            setCurrentPageIndex(prevPageIndex);
            
            fetchData(prevCursor);
        }
    };
    return (
        <>
        <div className="container app-container">
            <div className="movies-outer-box row align-items-start">
                <div className="col left-col">
                    <label htmlFor="movie-search" className="form-label d-flex">Search Mode: {typeSearch === "standard" ? searchMode : typeSearch}</label>
                    <form className="d-flex my-form" onSubmit={handleSearch}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search movies..."
                            onChange={(e) => setSearchKey(e.target.value)}
                            />
                        <button className="btn btn-dark" name="noIndex" disabled={loading }>
                            {loading && searchMode === "noIndex" ? (
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            ) : (
                                <>
                                    <i className="bi bi-search me-2"></i> Standard
                                </>
                            )
                            }
                        </button>
                        <button className="btn btn-dark" name="index" disabled={loading }>
                            {loading && searchMode === 'index' ?(
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                </>
                            ) : (
                                <>
                                    <i className="bi bi-search me-2"></i> Index
                                </>
                            )
                        }
                        </button>
                        <button className="btn btn-dark" name="meterialized" disabled={loading }>
                            {loading && searchMode === 'meterialized' ?(
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            
                                </>
                            ) : (
                                <>
                                    <i className="bi bi-search me-2"></i> Meterialized
                                </>
                            )
                        }
                        </button>
                    </form>

                    <table className="table">
                            <thead>
                                <tr className="my-tr" >
                                <th className="my-th" scope="col">#</th>
                                <th className="my-th" scope="col">Name</th>
                                <th className="my-th" scope="col">Type</th>
                                <th className="my-th" scope="col">Genre</th>
                                <th className="my-th" scope="col">Year</th>
                                </tr>
                            </thead>
                            <tbody>
                                {results?.data?.map((movie, i) => (
                                    <MovieCard 
                                        key={movie.tconst} 
                                        index={currentPageIndex*limit + i + 1}
                                        tconst={movie.tconst}
                                        title={movie.primarytitle} 
                                        type={movie.titletype || "N/A"}
                                        genres={movie.genres || "N/A"}
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
                    <Analysis timeIDX={benchmarks.index} timeNoIDX={benchmarks.noIndex} timeMat={benchmarks.meterialized } sKey={searchKey} typeSearch={typeSearch} id={history[history.length - 1] } mode={searchMode}></Analysis>
                </div>
            </div>
        </div>
           
        </>
    );
}