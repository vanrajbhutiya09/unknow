import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useWallet } from '../../context/WalletContext';
import { 
  FaTimes, FaCalculator, FaWallet, FaCheckCircle, 
  FaExclamationTriangle, FaInfoCircle, FaLock, 
  FaTrash, FaSync, FaShoppingCart, FaReceipt 
} from 'react-icons/fa';

const BetSlip = ({ selections, setSelections, match }) => {
  const { user, isAuthenticated } = useAuth();
  const { balance, updateBalance } = useWallet();
  const [stakes, setStakes] = useState({});
  const [betType, setBetType] = useState('single');
  const [potentialWin, setPotentialWin] = useState(0);
  const [showSlip, setShowSlip] = useState(true);
  const [errors, setErrors] = useState({});

  const calculateTotals = () => {
    if (selections.length === 0) {
      setPotentialWin(0);
      return;
    }

    const totalStake = Object.values(stakes).reduce((sum, stake) => sum + (stake || 0), 0);
    let totalOdds = betType === 'single' ? selections[0]?.odds || 1 : 
      selections.reduce((acc, sel) => acc * (sel.odds || 1), 1);
    
    setPotentialWin(totalStake * totalOdds);
  };

  const handleStakeChange = (selectionId, value) => {
    const stakeValue = parseFloat(value) || 0;
    
    if (stakeValue < 10) {
      setErrors(prev => ({ ...prev, [selectionId]: 'Minimum stake is ₹10' }));
    } else if (stakeValue > balance) {
      setErrors(prev => ({ ...prev, [selectionId]: 'Insufficient balance' }));
    } else {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[selectionId];
        return newErrors;
      });
    }

    setStakes(prev => ({ ...prev, [selectionId]: stakeValue }));
  };

  if (!showSlip) {
    return (
      <button
        onClick={() => setShowSlip(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center text-white z-50 group"
      >
        <FaShoppingCart className="w-6 h-6" />
        {selections.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center animate-bounce">
            {selections.length}
          </span>
        )}
      </button>
    );
  }

  return (
    <div className="fixed top-16 right-0 w-96 h-[calc(100vh-4rem)] bg-white shadow-2xl border-l border-gray-200 flex flex-col z-40 transform transition-transform duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FaReceipt className="w-6 h-6" />
            <div>
              <h3 className="font-bold text-lg">Bet Slip</h3>
              {selections.length > 0 && (
                <p className="text-sm opacity-90">{selections.length} selection(s)</p>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setSelections([])}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              title="Clear All"
            >
              <FaTrash className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowSlip(false)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {selections.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-500 p-8">
            <FaShoppingCart className="w-16 h-16 mb-4 opacity-30" />
            <h4 className="text-xl font-semibold mb-2">Your bet slip is empty</h4>
            <p className="text-center text-gray-400">Click on odds to add selections</p>
          </div>
        ) : (
          <>
            {/* Bet Type */}
            <div className="mb-6">
              <div className="flex bg-gray-100 p-1 rounded-lg">
                <button
                  className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
                    betType === 'single' 
                      ? 'bg-white shadow-md text-purple-600' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  onClick={() => setBetType('single')}
                >
                  Single
                </button>
                <button
                  className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
                    betType === 'multiple' 
                      ? 'bg-white shadow-md text-purple-600' 
                      : 'text-gray-600 hover:text-gray-900'
                  } ${selections.length < 2 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => selections.length >= 2 && setBetType('multiple')}
                  disabled={selections.length < 2}
                >
                  Multiple ({selections.length})
                </button>
              </div>
            </div>

            {/* Selections List */}
            <div className="space-y-4 mb-6">
              {selections.map((selection) => (
                <div key={selection.id} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 text-sm">{selection.matchName}</p>
                      <p className="text-xs text-gray-600">{selection.marketName}</p>
                      <p className="font-bold text-gray-900 mt-1">{selection.selectionName}</p>
                    </div>
                    <button
                      onClick={() => setSelections(prev => prev.filter(s => s.id !== selection.id))}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <FaTimes className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Odds</p>
                      <p className="font-bold text-purple-600 text-lg">{selection.odds}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Stake (₹)</p>
                      <input
                        type="number"
                        value={stakes[selection.id] || ''}
                        onChange={(e) => handleStakeChange(selection.id, e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                          errors[selection.id] ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter stake"
                        min="10"
                        max={balance}
                      />
                      {errors[selection.id] && (
                        <p className="text-xs text-red-500 mt-1 flex items-center">
                          <FaExclamationTriangle className="w-3 h-3 mr-1" />
                          {errors[selection.id]}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Stakes */}
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-2">Quick Stakes</p>
              <div className="grid grid-cols-4 gap-2">
                {[100, 500, 1000, 2000].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => {
                      const newStakes = {};
                      selections.forEach(sel => {
                        newStakes[sel.id] = amount;
                      });
                      setStakes(newStakes);
                    }}
                    className="py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-purple-500 transition-all font-medium"
                  >
                    ₹{amount}
                  </button>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-5 mb-6 border border-gray-200">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Stake</span>
                  <span className="font-bold text-lg">
                    ₹{Object.values(stakes).reduce((sum, stake) => sum + (stake || 0), 0).toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Potential Win</span>
                  <span className="font-bold text-2xl text-green-600">
                    ₹{potentialWin.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>

            {/* Balance Info */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 mb-6 border border-blue-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FaWallet className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Available Balance</p>
                    <p className="font-bold text-xl text-gray-900">
                      ₹{balance.toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Place Bet Button */}
            <button
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                !isAuthenticated || Object.keys(errors).length > 0
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1'
              }`}
              disabled={!isAuthenticated || Object.keys(errors).length > 0}
            >
              {!isAuthenticated ? (
                <span className="flex items-center justify-center">
                  <FaLock className="w-5 h-5 mr-2" />
                  Login to Bet
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <FaCheckCircle className="w-5 h-5 mr-2" />
                  Place Bet - ₹{Object.values(stakes).reduce((sum, stake) => sum + (stake || 0), 0).toLocaleString('en-IN')}
                </span>
              )}
            </button>
          </>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 p-4 bg-gray-50">
        <p className="text-xs text-gray-500 text-center">
          <FaInfoCircle className="inline w-3 h-3 mr-1" />
          By placing a bet you agree to our Terms & Conditions
        </p>
      </div>
    </div>
  );
};

export default BetSlip;