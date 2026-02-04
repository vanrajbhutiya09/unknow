import React, { useState } from 'react';
import { FaCaretUp, FaCaretDown, FaMinus, FaStar, FaFire, FaLock } from 'react-icons/fa';

const OddsButton = ({
  odds,
  onClick,
  trend = 'neutral',
  isFavorite = false,
  isSuspended = false,
  isBoosted = false,
  boostedValue = null,
  size = 'medium',
  showTrend = true,
  className = ''
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation();
    if (!isSuspended) {
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 300);
      onClick && onClick();
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <FaCaretUp className="w-3 h-3 text-green-500" />;
      case 'down':
        return <FaCaretDown className="w-3 h-3 text-red-500" />;
      default:
        return <FaMinus className="w-3 h-3 text-gray-500" />;
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'px-3 py-2 text-sm';
      case 'medium':
        return 'px-4 py-3 text-base';
      case 'large':
        return 'px-6 py-4 text-lg';
      case 'xlarge':
        return 'px-8 py-6 text-xl';
      default:
        return 'px-4 py-3 text-base';
    }
  };

  const formatOdds = (value) => {
    return parseFloat(value).toFixed(2);
  };

  const getDisplayOdds = () => {
    if (isBoosted && boostedValue) {
      return formatOdds(boostedValue);
    }
    return formatOdds(odds);
  };

  return (
    <button
      className={`
        relative
        ${getSizeClasses()}
        ${className}
        ${isSuspended ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
        ${isClicked ? 'scale-95' : ''}
        ${isFavorite ? 'bg-gradient-to-br from-yellow-100 to-yellow-200 border-yellow-300' : 
          isBoosted ? 'bg-gradient-to-br from-red-50 to-pink-50 border-red-300 animate-pulse' :
          isHovered ? 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-400' :
          'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-300'}
        border-2
        rounded-xl
        font-mono
        font-bold
        transition-all
        duration-300
        hover:scale-105
        hover:shadow-lg
        active:scale-95
        overflow-hidden
        group
      `}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={isSuspended}
    >
      {/* Boosted Badge */}
      {isBoosted && (
        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center space-x-1 z-10 animate-bounce">
          <FaFire className="w-3 h-3" />
          <span>BOOSTED</span>
        </div>
      )}

      {/* Favorite Star */}
      {isFavorite && (
        <div className="absolute -top-2 -left-2 bg-white text-yellow-500 w-6 h-6 rounded-full flex items-center justify-center shadow-lg z-10">
          <FaStar className="w-3 h-3" />
        </div>
      )}

      {/* Odds Value */}
      <div className="relative z-20">
        <div className="flex flex-col items-center">
          <span className={`font-black ${isBoosted ? 'text-red-600' : 'text-gray-900'}`}>
            {getDisplayOdds()}
          </span>
          {isBoosted && boostedValue && (
            <span className="text-xs text-gray-500 line-through mt-1">
              {formatOdds(odds)}
            </span>
          )}
        </div>
      </div>

      {/* Trend Indicator */}
      {showTrend && trend !== 'neutral' && (
        <div className="absolute top-1 right-1 z-20">
          {getTrendIcon()}
        </div>
      )}

      {/* Suspended Overlay */}
      {isSuspended && (
        <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center z-30 rounded-xl">
          <FaLock className="w-5 h-5 text-red-500 mb-1 animate-pulse" />
          <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
            SUSPENDED
          </span>
        </div>
      )}

      {/* Hover Effect */}
      {isHovered && !isSuspended && (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 z-10"></div>
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider animate-pulse">
              BET
            </span>
          </div>
        </>
      )}

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full bg-gradient-to-br from-gray-900 via-transparent to-gray-900"></div>
      </div>

      {/* Glow Effect */}
      <div className={`
        absolute inset-0 rounded-xl
        ${isBoosted ? 'animate-ping bg-red-400' : 'bg-blue-400'}
        opacity-0 group-hover:opacity-20
        transition-opacity duration-300
      `}></div>
    </button>
  );
};

export default OddsButton;