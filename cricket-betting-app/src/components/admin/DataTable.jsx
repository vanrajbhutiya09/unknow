import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  FaSort,
  FaSortUp,
  FaSortDown,
  FaSearch,
  FaFilter,
  FaEdit,
  FaTrash,
  FaEye,
  FaCheck,
  FaTimes,
  FaEllipsisV,
  FaDownload,
  FaPrint,
  FaCopy
} from 'react-icons/fa';
import './DataTable.css';

const DataTable = ({
  data,
  columns,
  loading = false,
  pagination = true,
  searchable = true,
  selectable = false,
  actions = true,
  onRowClick,
  onSelectionChange,
  onEdit,
  onDelete,
  onView,
  customActions,
  pageSize = 10,
  exportable = false,
  onExport,
  filterable = false,
  onFilter,
  emptyMessage = 'No data available',
  striped = true,
  hoverable = true,
  compact = false,
  className = ''
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [selectedRows, setSelectedRows] = useState([]);
  const [filterMenu, setFilterMenu] = useState(null);
  const [filterValues, setFilterValues] = useState({});

  // Filter and sort data
  const filteredData = React.useMemo(() => {
    let filtered = [...data];
    
    // Apply search
    if (searchTerm && searchable) {
      filtered = filtered.filter(row =>
        columns.some(col =>
          String(row[col.field]).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    
    // Apply filters
    if (filterable && Object.keys(filterValues).length > 0) {
      filtered = filtered.filter(row =>
        Object.entries(filterValues).every(([key, value]) => {
          if (!value || value === 'all') return true;
          return String(row[key]).toLowerCase() === String(value).toLowerCase();
        })
      );
    }
    
    // Apply sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        
        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    
    return filtered;
  }, [data, searchTerm, sortConfig, filterValues, columns, searchable, filterable]);

  // Paginate data
  const paginatedData = React.useMemo(() => {
    if (!pagination) return filteredData;
    
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, currentPage, pageSize, pagination]);

  const totalPages = Math.ceil(filteredData.length / pageSize);

  // Handle sorting
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Handle row selection
  const handleSelectRow = (id) => {
    let newSelected;
    if (selectedRows.includes(id)) {
      newSelected = selectedRows.filter(rowId => rowId !== id);
    } else {
      newSelected = [...selectedRows, id];
    }
    setSelectedRows(newSelected);
    onSelectionChange && onSelectionChange(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedRows.length === paginatedData.length) {
      setSelectedRows([]);
      onSelectionChange && onSelectionChange([]);
    } else {
      const allIds = paginatedData.map(row => row.id);
      setSelectedRows(allIds);
      onSelectionChange && onSelectionChange(allIds);
    }
  };

  // Handle actions
  const handleAction = (action, row) => {
    switch (action) {
      case 'edit':
        onEdit && onEdit(row);
        break;
      case 'delete':
        onDelete && onDelete(row);
        break;
      case 'view':
        onView && onView(row);
        break;
      default:
        break;
    }
  };

  // Render cell content
  const renderCell = (row, column) => {
    const value = row[column.field];
    
    if (column.render) {
      return column.render(row);
    }
    
    // Format based on type
    if (column.type === 'currency') {
      return `₹${parseFloat(value || 0).toLocaleString('en-IN')}`;
    }
    
    if (column.type === 'date') {
      return new Date(value).toLocaleDateString();
    }
    
    if (column.type === 'datetime') {
      return new Date(value).toLocaleString();
    }
    
    if (column.type === 'boolean') {
      return value ? <FaCheck className="bool-true" /> : <FaTimes className="bool-false" />;
    }
    
    if (column.type === 'status') {
      return (
        <span className={`status-badge ${value}`}>
          {value}
        </span>
      );
    }
    
    if (column.type === 'number') {
      return Number(value).toLocaleString('en-IN');
    }
    
    return value;
  };

  // Get unique filter values for a column
  const getFilterOptions = (field) => {
    const values = [...new Set(data.map(row => row[field]))];
    return values.filter(val => val !== undefined && val !== null);
  };

  return (
    <div className={`data-table-container ${className} ${compact ? 'compact' : ''}`}>
      {/* Table Header with Controls */}
      <div className="table-header-controls">
        {searchable && (
          <div className="table-search">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            {searchTerm && (
              <button 
                className="clear-search"
                onClick={() => setSearchTerm('')}
              >
                Clear
              </button>
            )}
          </div>
        )}

        {exportable && (
          <div className="table-actions">
            <button className="action-btn" onClick={() => onExport && onExport(filteredData)}>
              <FaDownload /> Export
            </button>
            <button className="action-btn">
              <FaPrint /> Print
            </button>
          </div>
        )}

        {selectable && selectedRows.length > 0 && (
          <div className="selection-info">
            <span>{selectedRows.length} item(s) selected</span>
            <button className="clear-selection" onClick={() => setSelectedRows([])}>
              Clear
            </button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <table className={`data-table ${striped ? 'striped' : ''} ${hoverable ? 'hoverable' : ''}`}>
          <thead>
            <tr>
              {selectable && (
                <th className="select-column">
                  <input
                    type="checkbox"
                    checked={selectedRows.length === paginatedData.length && paginatedData.length > 0}
                    onChange={handleSelectAll}
                    className="select-all"
                  />
                </th>
              )}
              
              {columns.map((column) => (
                <th 
                  key={column.field}
                  className={column.sortable ? 'sortable' : ''}
                  onClick={() => column.sortable && handleSort(column.field)}
                  style={{ width: column.width, minWidth: column.minWidth }}
                >
                  <div className="header-content">
                    <span>{column.header}</span>
                    {column.sortable && (
                      <span className="sort-icon">
                        {sortConfig.key === column.field ? (
                          sortConfig.direction === 'asc' ? (
                            <FaSortUp />
                          ) : (
                            <FaSortDown />
                          )
                        ) : (
                          <FaSort />
                        )}
                      </span>
                    )}
                    
                    {filterable && column.filterable !== false && (
                      <div className="filter-wrapper">
                        <button 
                          className="filter-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            setFilterMenu(filterMenu === column.field ? null : column.field);
                          }}
                        >
                          <FaFilter />
                        </button>
                        
                        {filterMenu === column.field && (
                          <div className="filter-dropdown">
                            <select
                              value={filterValues[column.field] || ''}
                              onChange={(e) => {
                                setFilterValues(prev => ({
                                  ...prev,
                                  [column.field]: e.target.value
                                }));
                                onFilter && onFilter({ ...filterValues, [column.field]: e.target.value });
                              }}
                              className="filter-select"
                            >
                              <option value="">All</option>
                              {getFilterOptions(column.field).map((value) => (
                                <option key={value} value={value}>
                                  {value}
                                </option>
                              ))}
                            </select>
                            {filterValues[column.field] && (
                              <button 
                                className="clear-filter"
                                onClick={() => {
                                  const newFilters = { ...filterValues };
                                  delete newFilters[column.field];
                                  setFilterValues(newFilters);
                                  onFilter && onFilter(newFilters);
                                }}
                              >
                                Clear
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </th>
              ))}
              
              {actions && <th className="actions-column">Actions</th>}
            </tr>
          </thead>
          
          <tbody>
            {loading ? (
              <tr className="loading-row">
                <td colSpan={columns.length + (selectable ? 1 : 0) + (actions ? 1 : 0)}>
                  <div className="loading-spinner"></div>
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr className="empty-row">
                <td colSpan={columns.length + (selectable ? 1 : 0) + (actions ? 1 : 0)}>
                  <div className="empty-message">
                    {emptyMessage}
                  </div>
                </td>
              </tr>
            ) : (
              paginatedData.map((row, rowIndex) => (
                <tr 
                  key={row.id || rowIndex}
                  className={`${selectedRows.includes(row.id) ? 'selected' : ''} ${onRowClick ? 'clickable' : ''}`}
                  onClick={() => onRowClick && onRowClick(row)}
                >
                  {selectable && (
                    <td className="select-column" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(row.id)}
                        onChange={() => handleSelectRow(row.id)}
                        className="row-selector"
                      />
                    </td>
                  )}
                  
                  {columns.map((column) => (
                    <td key={`${row.id}-${column.field}`} className={column.className || ''}>
                      {renderCell(row, column)}
                    </td>
                  ))}
                  
                  {actions && (
                    <td className="actions-column" onClick={(e) => e.stopPropagation()}>
                      <div className="action-buttons">
                        {onView && (
                          <button 
                            className="action-btn view"
                            onClick={() => handleAction('view', row)}
                            title="View"
                          >
                            <FaEye />
                          </button>
                        )}
                        
                        {onEdit && (
                          <button 
                            className="action-btn edit"
                            onClick={() => handleAction('edit', row)}
                            title="Edit"
                          >
                            <FaEdit />
                          </button>
                        )}
                        
                        {onDelete && (
                          <button 
                            className="action-btn delete"
                            onClick={() => handleAction('delete', row)}
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        )}
                        
                        {customActions && customActions(row)}
                        
                        <div className="dropdown-actions">
                          <button className="action-btn more" title="More actions">
                            <FaEllipsisV />
                          </button>
                          <div className="dropdown-menu">
                            <button className="dropdown-item">
                              <FaCopy /> Duplicate
                            </button>
                            <button className="dropdown-item">
                              <FaDownload /> Download
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Table Footer with Pagination */}
      <div className="table-footer">
        <div className="table-info">
          Showing {filteredData.length === 0 ? 0 : ((currentPage - 1) * pageSize) + 1} to{' '}
          {Math.min(currentPage * pageSize, filteredData.length)} of {filteredData.length} entries
        </div>
        
        {pagination && totalPages > 1 && (
          <div className="table-pagination">
            <button
              className="pagination-btn"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            
            <div className="page-numbers">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    className={`page-btn ${currentPage === pageNum ? 'active' : ''}`}
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              {totalPages > 5 && (
                <>
                  {currentPage < totalPages - 2 && totalPages > 6 && (
                    <span className="page-ellipsis">...</span>
                  )}
                  
                  {currentPage < totalPages - 2 && (
                    <button
                      className={`page-btn ${currentPage === totalPages ? 'active' : ''}`}
                      onClick={() => setCurrentPage(totalPages)}
                    >
                      {totalPages}
                    </button>
                  )}
                </>
              )}
            </div>
            
            <button
              className="pagination-btn"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
        
        {pageSize !== 10 && (
          <div className="page-size-selector">
            <span>Show:</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setCurrentPage(1);
                // Note: pageSize prop would need to be managed by parent
              }}
              className="size-select"
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            <span>entries</span>
          </div>
        )}
      </div>
    </div>
  );
};

DataTable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      header: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['text', 'number', 'date', 'datetime', 'currency', 'boolean', 'status']),
      sortable: PropTypes.bool,
      filterable: PropTypes.bool,
      width: PropTypes.string,
      minWidth: PropTypes.string,
      render: PropTypes.func,
      className: PropTypes.string
    })
  ).isRequired,
  loading: PropTypes.bool,
  pagination: PropTypes.bool,
  searchable: PropTypes.bool,
  selectable: PropTypes.bool,
  actions: PropTypes.bool,
  onRowClick: PropTypes.func,
  onSelectionChange: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onView: PropTypes.func,
  customActions: PropTypes.func,
  pageSize: PropTypes.number,
  exportable: PropTypes.bool,
  onExport: PropTypes.func,
  filterable: PropTypes.bool,
  onFilter: PropTypes.func,
  emptyMessage: PropTypes.string,
  striped: PropTypes.bool,
  hoverable: PropTypes.bool,
  compact: PropTypes.bool,
  className: PropTypes.string
};

DataTable.defaultProps = {
  loading: false,
  pagination: true,
  searchable: true,
  selectable: false,
  actions: true,
  pageSize: 10,
  exportable: false,
  filterable: false,
  emptyMessage: 'No data available',
  striped: true,
  hoverable: true,
  compact: false
};

export default DataTable;