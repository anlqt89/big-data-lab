import './pagination.css'

export const Pagination = ({ pageIndex, onNext, onPrevious, hasNext, hasPrevious, loading }) => {
    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
                {/* Previous Button */}
                <li className={`page-item ${(!hasPrevious || loading) ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={onPrevious} aria-label="Previous">
                        <span aria-hidden="true">&laquo; Previous</span>
                    </button>
                </li>

                {/* Status Indicator (Optional) */}
                <li className="page-item disabled">
                    <span className="page-link">
                        {pageIndex}
                    </span>
                </li>

                {/* Next Button */}
                <li className={`page-item ${(!hasNext || loading) ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={onNext} aria-label="Next">
                        <span aria-hidden="true">Next &raquo;</span>
                    </button>
                </li>
            </ul>
        </nav>
    );
};