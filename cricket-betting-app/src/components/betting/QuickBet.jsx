import React, { useState } from 'react';
import { FaTimes, FaCalculator, FaWallet, FaCheck, FaLock, FaSync } from 'react-icons/fa';

const QuickBet = ({ selection, onClose, onPlaceBet }) => {
  const [stake, setStake] = useState(100);
  const [isPlacing, setIsPlacing] = useState(false);

  const quickStakes = [100, 500, 1000, 2000];

  const handlePlaceBet = () => {
    setIsPlacing(true);
    setTimeout(() => {
      if (onPlaceBet) {
        onPlaceBet({
          selection,
          stake,
          potentialWin: stake * (selection?.odds || 1.85)
        });
      }
      setIsPlacing(false);
      onClose();
    }, 1500);
  };

  if (!selection) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Modal */}
        <div 
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <FaCalculator className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Quick Bet</h3>
                  <p className="text-sm opacity-90">Place your bet quickly</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Selection Info */}
          <div className="p-6 border-b border-gray-200">
            <div className="mb-4">
              <h4 className="font-bold text-gray-900 text-lg mb-1">{selection.matchName}</h4>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span className="font-medium">{selection.marketName}</span>
                <span>•</span>
                <span>{selection.selectionName}</span>
              </div>
            </div>
            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-xl">
              <span className="text-gray-600 font-medium">Odds</span>
              <span className="font-mono font-bold text-2xl text-purple-600">{selection.odds}</span>
            </div>
          </div>

          {/* Stake Input */}
          <div className="p-6">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <label className="text-gray-700 font-medium">Stake Amount</label>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <FaWallet className="w-4 h-4 text-green-500" />
                  <span>Balance: ₹10,000</span>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700 font-bold text-xl">
                  ₹
                </div>
                <input
                  type="number"
                  value={stake}
                  onChange={(e) => setStake(parseFloat(e.target.value) || 0)}
                  className="w-full pl-10 pr-4 py-4 text-2xl font-bold border-2 border-gray-300 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                  min="10"
                  step="10"
                  autoFocus
                />
              </div>

              {/* Quick Stake Buttons */}
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Quick Stakes</p>
                <div className="grid grid-cols-4 gap-2">
                  {quickStakes.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setStake(amount)}
                      className={`py-2 rounded-lg font-medium transition-all ${
                        stake === amount
                          ? 'bg-purple-600 text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      ₹{amount}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Calculation Preview */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-5 mb-6 border border-gray-200">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Stake</span>
                  <span className="font-bold">₹{stake.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Odds</span>
                  <span className="font-bold">{selection.odds}</span>
                </div>
                <div className="border-t border-gray-300 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-900">Potential Win</span>
                    <span className="font-bold text-2xl text-green-600">
                      ₹{(stake * selection.odds).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Place Bet Button */}
            <button
              onClick={handlePlaceBet}
              disabled={stake < 10 || isPlacing}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                stake < 10 || isPlacing
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1'
              }`}
            >
              {isPlacing ? (
                <span className="flex items-center justify-center">
                  <FaSync className="w-5 h-5 mr-2 animate-spin" />
                  Placing Bet...
                </span>
              ) : stake < 10 ? (
                <span className="flex items-center justify-center">
                  <FaLock className="w-5 h-5 mr-2" />
                  Minimum ₹10
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <FaCheck className="w-5 h-5 mr-2" />
                  Place Bet - ₹{stake.toLocaleString('en-IN')}
                </span>
              )}
            </button>

            {/* Terms */}
            <p className="text-xs text-center text-gray-500 mt-4">
              By placing a bet you agree to our Terms & Conditions
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuickBet;