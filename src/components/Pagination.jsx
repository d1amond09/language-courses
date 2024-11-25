import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const handlePageClick = (page) => {
        if (page < 1 || page > totalPages) return;
        onPageChange(page);
    };

    const getPaginationRange = () => {
        const range = [];
        const maxDisplayedPages = 5; 
        const halfRange = Math.floor(maxDisplayedPages / 2);

        let start = Math.max(1, currentPage - halfRange);
        let end = Math.min(totalPages, currentPage + halfRange);

        if (end - start < maxDisplayedPages - 1) {
            if (start === 1) {
                end = Math.min(start + maxDisplayedPages - 1, totalPages);
            } else if (end === totalPages) {
                start = Math.max(1, end - (maxDisplayedPages - 1));
            }
        }

        for (let i = start; i <= end; i++) {
            range.push(i);
        }

        return range;
    };

    const pages = getPaginationRange();

    return (
        <div className="flex flex-col items-center">
            <div className="flex justify-center my-4">
                <button 
                    onClick={() => handlePageClick(currentPage - 1)} 
                    disabled={currentPage === 1}
                    className="mx-1 px-3 py-1 rounded bg-gray-300 text-black"
                >
                    Назад
                </button>
                {pages.map((page) => (
                    <button 
                        key={page} 
                        onClick={() => handlePageClick(page)} 
                        className={`mx-1 px-3 py-1 rounded ${page === currentPage ? 
                            'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
                    >
                        {page}
                    </button>
                ))}
                <button 
                    onClick={() => handlePageClick(currentPage + 1)} 
                    disabled={currentPage === totalPages}
                    className="mx-1 px-3 py-1 rounded bg-gray-300 text-black"
                >
                    Вперед
                </button>
            </div>
            <div className="text-center">
                <p>
                    Страница {currentPage} из {totalPages}
                </p>
            </div>
        </div>
    );
};

export default Pagination;