import React from 'react';
import { FaChevronLeft, FaChevronRight, FaEllipsisH } from 'react-icons/fa';

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  pageSize,
  totalItems,
  showPageSize = true,
  className = ''
}) => {
  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        range.push(i);
      }
    }

    range.forEach((i) => {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    });

    return rangeWithDots;
  };

  const pageNumbers = getPageNumbers();
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${className}`}>
      {/* Page Info */}
      {totalItems > 0 && (
        <div className="text-sm text-gray-600">
          Showing <span className="font-bold">{startItem}</span> to{' '}
          <span className="font-bold">{endItem}</span> of{' '}
          <span className="font-bold">{totalItems.toLocaleString('en-IN')}</span> entries
        </div>
      )}

      <div className="flex items-center space-x-2">
        {/* Page Size Selector */}
        {showPageSize && (
          <div className="flex items-center space-x-2 mr-4">
            <span className="text-sm text-gray-600">Show:</span>
            <select className="px-2 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
        )}

        {/* Pagination Controls */}
        <nav className="flex items-center space-x-1" aria-label="Pagination">
          {/* Previous Button */}
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            aria-label="Previous page"
          >
            <FaChevronLeft className="w-4 h-4" />
          </button>

          {/* Page Numbers */}
          {pageNumbers.map((pageNumber, index) => (
            <React.Fragment key={index}>
              {pageNumber === '...' ? (
                <span className="px-3 py-2 text-gray-400">
                  <FaEllipsisH className="w-4 h-4" />
                </span>
              ) : (
                <button
                  onClick={() => onPageChange(pageNumber)}
                  className={`min-w-[40px] h-10 px-3 rounded-lg font-medium transition-all ${
                    currentPage === pageNumber
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                      : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                  aria-current={currentPage === pageNumber ? 'page' : undefined}
                >
                  {pageNumber}
                </button>
              )}
            </React.Fragment>
          ))}

          {/* Next Button */}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            aria-label="Next page"
          >
            <FaChevronRight className="w-4 h-4" />
          </button>
        </nav>

        {/* Quick Jump */}
        <div className="hidden md:flex items-center space-x-2 ml-4">
          <span className="text-sm text-gray-600">Go to:</span>
          <div className="relative">
            <input
              type="number"
              min="1"
              max={totalPages}
              defaultValue={currentPage}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  const page = parseInt(e.target.value);
                  if (page >= 1 && page <= totalPages) {
                    onPageChange(page);
                    e.target.value = '';
                  }
                }
              }}
              className="w-16 px-2 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Page"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Variants
export const CompactPagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex items-center justify-center space-x-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 hover:bg-gray-50 transition-colors"
        aria-label="Previous page"
      >
        <FaChevronLeft className="w-4 h-4" />
      </button>

      <span className="px-3 py-1 bg-gray-100 rounded-lg font-medium">
        {currentPage} / {totalPages}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 hover:bg-gray-50 transition-colors"
        aria-label="Next page"
      >
        <FaChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export const LoadMorePagination = ({ hasMore, onLoadMore, isLoading }) => {
  return (
    <div className="text-center">
      {hasMore ? (
        <button
          onClick={onLoadMore}
          disabled={isLoading}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-medium disabled:opacity-50"
        >
          {isLoading ? 'Loading...' : 'Load More'}
        </button>
      ) : (
        <p className="text-gray-500 py-4">No more items to load</p>
      )}
    </div>
  );
};

export const TablePagination = ({ currentPage, totalPages, onPageChange, pageSize, totalItems }) => {
  return (
    <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        pageSize={pageSize}
        totalItems={totalItems}
        className="text-sm"
      />
    </div>
  );
};

export default Pagination;