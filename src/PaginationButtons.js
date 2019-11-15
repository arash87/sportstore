import React from 'react'

const PaginationButtons = ({ pageCount, currentPage, navigate }) => {
    const getPageNumbers = () => {
        if (pageCount < 4) {
            return [...Array(pageCount + 1).keys()].slice(1)
        } else if (currentPage <= 4) {
            return [1, 2, 3, 4, 5]
        } else if (currentPage > pageCount - 4) {
            return [...Array(5).keys()].reverse().map(v => pageCount - v)
        } else {
            return [currentPage - 1, currentPage, currentPage + 1]
        }
    }

    return (
        <>
            <button onClick={() => navigate(currentPage - 1)}
                disabled={currentPage === 1} className="btn btn-secondary mx-1">
                Previous
                </button>
            {currentPage > 4 &&
                <>
                    <button className="btn btn-secondary mx-1"
                        onClick={() => navigate(1)}>1</button>
                    <span className="h4">...</span>
                </>
            }
            {
                getPageNumbers().map(num =>
                    <button
                        className={`btn mx-1 ${num === currentPage ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => navigate(num)}
                        key={num}>
                        {num}
                    </button>)
            }
            {
                currentPage <= (pageCount - 4) &&
                <React.Fragment>
                    <span className="btn btn-secondary mx-1"
                        onClick={() => navigate(pageCount)}>
                        {pageCount}
                    </span>
                </React.Fragment>
            }
            <button onClick={() => navigate(currentPage + 1)}
                disabled={currentPage === pageCount}
                className="btn btn-secondary mx-1">
                Next
            </button>
        </>
    )
}

export default PaginationButtons