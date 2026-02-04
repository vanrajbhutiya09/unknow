import React, { createContext, useContext, useState, useCallback } from 'react';
import Toast from './Toast';
import './Toast.css';

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children, defaultPosition = 'bottom-right' }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((toast) => {
    const id = Date.now().toString();
    const newToast = {
      id,
      position: defaultPosition,
      ...toast
    };
    
    setToasts(prev => [...prev, newToast]);
    
    return id;
  }, [defaultPosition]);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const clearToasts = useCallback(() => {
    setToasts([]);
  }, []);

  // Cricket betting specific helper methods
  const showBetPlaced = useCallback((matchName, amount, odds) => {
    return addToast({
      type: 'bet_placed',
      title: 'Bet Placed Successfully!',
      message: `₹${amount} on ${matchName} at ${odds} odds`,
      duration: 5000
    });
  }, [addToast]);

  const showBetResult = useCallback((isWin, amount, winnings = 0) => {
    return addToast({
      type: isWin ? 'bet_won' : 'bet_lost',
      title: isWin ? 'Bet Won! 🎉' : 'Bet Settled',
      message: isWin 
        ? `You won ₹${winnings}! ₹${amount} bet returned with profit.`
        : `Better luck next time! ₹${amount} bet settled.`,
      duration: 6000
    });
  }, [addToast]);

  const showTransaction = useCallback((type, amount, status = 'success') => {
    const messages = {
      deposit: `₹${amount} deposited to your wallet`,
      withdrawal: `Withdrawal of ₹${amount} is being processed`
    };
    
    return addToast({
      type: status === 'success' ? type : 'error',
      title: status === 'success' 
        ? `${type.charAt(0).toUpperCase() + type.slice(1)} Successful`
        : `${type.charAt(0).toUpperCase() + type.slice(1)} Failed`,
      message: messages[type] || `${type} completed`,
      duration: 4000
    });
  }, [addToast]);

  const showMatchUpdate = useCallback((matchName, update) => {
    return addToast({
      type: 'match_update',
      title: `Live: ${matchName}`,
      message: update,
      duration: 5000,
      autoClose: false,
      showCloseButton: true
    });
  }, [addToast]);

  const value = {
    addToast,
    removeToast,
    clearToasts,
    showBetPlaced,
    showBetResult,
    showTransaction,
    showMatchUpdate
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      
      {/* Render toasts grouped by position */}
      {['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'].map(position => {
        const positionToasts = toasts.filter(toast => toast.position === position);
        
        return (
          <div key={position} className={`toast-container toast-${position}-container`}>
            {positionToasts.map(toast => (
              <Toast
                key={toast.id}
                {...toast}
                onClose={removeToast}
              />
            ))}
          </div>
        );
      })}
    </ToastContext.Provider>
  );
};