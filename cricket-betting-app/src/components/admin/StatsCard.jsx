import React from 'react';
import PropTypes from 'prop-types';
import {
  FaArrowUp,
  FaArrowDown,
  FaMinus,
  FaChartLine,
  FaUsers,
  FaMoneyBillWave,
  FaTrophy,
  FaCricket,
  FaExclamationTriangle,
  FaClock,
  FaDatabase
} from 'react-icons/fa';
import './StatsCard.css';

const StatsCard = ({ 
  title, 
  value, 
  icon, 
  color = 'primary',
  change = null,
  trend = 'neutral',
  loading = false,
  onClick,
  format = 'default',
  subtitle = null,
  currency = '₹'
}) => {
  
  const getIconComponent = () => {
    if (typeof icon === 'string') {
      switch (icon) {
        case 'users': return <FaUsers />;
        case 'money': return <FaMoneyBillWave />;
        case 'chart': return <FaChartLine />;
        case 'trophy': return <FaTrophy />;
        case 'cricket': return <FaCricket />;
        case 'warning': return <FaExclamationTriangle />;
        case 'clock': return <FaClock />;
        case 'database': return <FaDatabase />;
        default: return <FaChartLine />;
      }
    }
    return icon || <FaChartLine />;
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up': return <FaArrowUp className="trend-icon up" />;
      case 'down': return <FaArrowDown className="trend-icon down" />;
      default: return <FaMinus className="trend-icon neutral" />;
    }
  };

  const formatValue = () => {
    if (typeof value === 'number') {
      switch (format) {
        case 'currency':
          return `${currency}${value.toLocaleString('en-IN')}`;
        case 'percent':
          return `${value.toFixed(1)}%`;
        case 'abbreviate':
          if (value >= 1000000) {
            return `${(value / 1000000).toFixed(1)}M`;
          } else if (value >= 1000) {
            return `${(value / 1000).toFixed(1)}K`;
          }
          return value.toLocaleString('en-IN');
        case 'decimal':
          return value.toFixed(2);
        default:
          return value.toLocaleString('en-IN');
      }
    }
    return value;
  };

  const colorClasses = {
    primary: 'stats-primary',
    secondary: 'stats-secondary',
    success: 'stats-success',
    danger: 'stats-danger',
    warning: 'stats-warning',
    info: 'stats-info',
    dark: 'stats-dark',
    light: 'stats-light'
  };

  return (
    <div 
      className={`stats-card ${colorClasses[color] || colorClasses.primary} ${onClick ? 'clickable' : ''}`}
      onClick={onClick}
    >
      {loading ? (
        <div className="stats-card-loading">
          <div className="loading-shimmer"></div>
        </div>
      ) : (
        <>
          {/* Card Header */}
          <div className="stats-card-header">
            <div className="stats-title">
              <h3>{title}</h3>
              {subtitle && <span className="stats-subtitle">{subtitle}</span>}
            </div>
            <div className="stats-icon-wrapper">
              <div className="stats-icon">
                {getIconComponent()}
              </div>
            </div>
          </div>

          {/* Card Body */}
          <div className="stats-card-body">
            <div className="stats-value">
              <span className="value-text">{formatValue()}</span>
              {change !== null && (
                <span className={`change-badge ${trend}`}>
                  {getTrendIcon()}
                  <span className="change-value">
                    {Math.abs(change)}{format === 'percent' ? '%' : ''}
                  </span>
                </span>
              )}
            </div>
          </div>

          {/* Card Footer */}
          <div className="stats-card-footer">
            {change !== null && (
              <div className="change-info">
                <span className={`change-text ${trend}`}>
                  {trend === 'up' ? 'Increase' : trend === 'down' ? 'Decrease' : 'No change'} 
                  {change !== 0 ? ` from last period` : ''}
                </span>
              </div>
            )}
            {onClick && (
              <div className="view-details">
                <span className="view-text">View details →</span>
              </div>
            )}
          </div>

          {/* Progress Bar (Optional) */}
          {typeof value === 'number' && format === 'percent' && (
            <div className="progress-container">
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${Math.min(value, 100)}%` }}
                ></div>
              </div>
              <div className="progress-labels">
                <span>0%</span>
                <span>100%</span>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

StatsCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  color: PropTypes.oneOf([
    'primary', 'secondary', 'success', 'danger', 
    'warning', 'info', 'dark', 'light'
  ]),
  change: PropTypes.number,
  trend: PropTypes.oneOf(['up', 'down', 'neutral']),
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  format: PropTypes.oneOf(['default', 'currency', 'percent', 'abbreviate', 'decimal']),
  subtitle: PropTypes.string,
  currency: PropTypes.string
};

StatsCard.defaultProps = {
  color: 'primary',
  trend: 'neutral',
  loading: false,
  format: 'default',
  currency: '₹'
};

export default StatsCard;