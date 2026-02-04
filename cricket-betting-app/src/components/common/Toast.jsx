import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Toast.css';

const Toast = ({ 
  id,
  message, 
  type = 'info', 
  duration = 3000, 
  onClose, 
  position = 'bottom-right',
  showIcon = true,
  showCloseButton = true,
  pauseOnHover = true,
  title,
  action,
  autoClose = true
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(100);
  const [isPaused, setIsPaused] = useState(false);

  // Types mapping based on cricket betting app
  const typeConfig = {
    success: {
      icon: '✓',
      className: 'toast-success',
      title: 'Success'
    },
    error: {
      icon: '✗',
      className: 'toast-error',
      title: 'Error'
    },
    warning: {
      icon: '⚠',
      className: 'toast-warning',
      title: 'Warning'
    },
    info: {
      icon: 'ℹ',
      className: 'toast-info',
      title: 'Info'
    },
    bet_placed: {
      icon: '🎯',
      className: 'toast-bet-placed',
      title: 'Bet Placed'
    },
    bet_won: {
      icon: '💰',
      className: 'toast-bet-won',
      title: 'Congratulations!'
    },
    bet_lost: {
      icon: '💸',
      className: 'toast-bet-lost',
      title: 'Better Luck Next Time'
    },
    deposit: {
      icon: '💳',
      className: 'toast-deposit',
      title: 'Deposit Successful'
    },
    withdrawal: {
      icon: '🏦',
      className: 'toast-withdrawal',
      title: 'Withdrawal Request'
    },
    bonus: {
      icon: '🎁',
      className: 'toast-bonus',
      title: 'Bonus Credited'
    },
    match_update: {
      icon: '🏏',
      className: 'toast-match-update',
      title: 'Match Update'
    }
  };

  const config = typeConfig[type] || typeConfig.info;

  // Handle auto-close progress
  useEffect(() => {
    if (!autoClose || isPaused) return;

    const startTime = Date.now();
    const totalTime = duration;
    
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / totalTime) * 100);
      setProgress(remaining);
      
      if (remaining <= 0) {
        handleClose();
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [duration, autoClose, isPaused]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      if (onClose) onClose(id);
    }, 300);
  };

  const handleMouseEnter = () => {
    if (pauseOnHover) {
      setIsPaused(true);
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) {
      setIsPaused(false);
    }
  };

  const handleActionClick = () => {
    if (action && action.onClick) {
      action.onClick();
    }
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`toast ${config.className} toast-${position}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-testid="toast"
    >
      <div className="toast-content">
        {showIcon && (
          <div className="toast-icon">
            {config.icon}
          </div>
        )}
        
        <div className="toast-body">
          {title && <div className="toast-title">{title}</div>}
          {!title && config.title && <div className="toast-title">{config.title}</div>}
          <div className="toast-message">{message}</div>
          
          {action && (
            <button 
              className="toast-action-btn"
              onClick={handleActionClick}
            >
              {action.label}
            </button>
          )}
        </div>
        
        {showCloseButton && (
          <button 
            className="toast-close-btn"
            onClick={handleClose}
            aria-label="Close toast"
          >
            ×
          </button>
        )}
      </div>
      
      {autoClose && (
        <div className="toast-progress">
          <div 
            className="toast-progress-bar"
            style={{ 
              width: `${progress}%`,
              animationPlayState: isPaused ? 'paused' : 'running'
            }}
          />
        </div>
      )}
    </div>
  );
};

Toast.propTypes = {
  id: PropTypes.string,
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    'success', 'error', 'warning', 'info',
    'bet_placed', 'bet_won', 'bet_lost',
    'deposit', 'withdrawal', 'bonus',
    'match_update'
  ]),
  duration: PropTypes.number,
  onClose: PropTypes.func,
  position: PropTypes.oneOf([
    'top-left', 'top-center', 'top-right',
    'bottom-left', 'bottom-center', 'bottom-right'
  ]),
  showIcon: PropTypes.bool,
  showCloseButton: PropTypes.bool,
  pauseOnHover: PropTypes.bool,
  title: PropTypes.string,
  action: PropTypes.shape({
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  }),
  autoClose: PropTypes.bool
};

export default Toast;