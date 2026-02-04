import React, { createContext, useState, useContext, useEffect } from 'react';
import { walletService } from '../services/walletService';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';

const WalletContext = createContext(null);

export const WalletProvider = ({ children }) => {
  const { token } = useAuth();
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [bonuses, setBonuses] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchWalletData = async () => {
    if (!token) return;
    
    try {
      setLoading(true);
      const [balanceRes, transactionsRes, bonusesRes] = await Promise.all([
        walletService.getBalance(token),
        walletService.getTransactions(token),
        walletService.getBonuses(token)
      ]);
      
      setBalance(balanceRes.data.balance);
      setTransactions(transactionsRes.data);
      setBonuses(bonusesRes.data);
    } catch (error) {
      toast.error('Failed to fetch wallet data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchWalletData();
    }
  }, [token]);

  const deposit = async (amount, method) => {
    try {
      setLoading(true);
      const response = await walletService.deposit({ amount, method }, token);
      toast.success('Deposit request submitted');
      await fetchWalletData();
      return { success: true, data: response.data };
    } catch (error) {
      toast.error(error.response?.data?.message || 'Deposit failed');
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const withdraw = async (amount, method, accountDetails) => {
    try {
      setLoading(true);
      const response = await walletService.withdraw(
        { amount, method, accountDetails },
        token
      );
      toast.success('Withdrawal request submitted');
      await fetchWalletData();
      return { success: true, data: response.data };
    } catch (error) {
      toast.error(error.response?.data?.message || 'Withdrawal failed');
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const claimBonus = async (bonusId) => {
    try {
      const response = await walletService.claimBonus(bonusId, token);
      toast.success('Bonus claimed successfully');
      await fetchWalletData();
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to claim bonus');
      return { success: false };
    }
  };

  const value = {
    balance,
    transactions,
    bonuses,
    loading,
    deposit,
    withdraw,
    claimBonus,
    refreshWallet: fetchWalletData
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within WalletProvider');
  }
  return context;
};