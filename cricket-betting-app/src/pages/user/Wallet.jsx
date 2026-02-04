import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { transactions } from '../../data/dummyData';
import './Wallet.css';

const Wallet = () => {
  const { user, updateBalance } = useAuth();
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');

  const handleDeposit = () => {
    const amount = parseFloat(depositAmount);
    if (amount > 0) {
      updateBalance(amount);
      setDepositAmount('');
      alert(`Successfully deposited ₹${amount}`);
    }
  };

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    if (amount > 0 && amount <= user.balance) {
      updateBalance(-amount);
      setWithdrawAmount('');
      alert(`Withdrawal request for ₹${amount} submitted`);
    } else {
      alert('Insufficient balance');
    }
  };

  return (
    <div className="wallet">
      <div className="wallet-header">
        <h1>My Wallet</h1>
      </div>

      <div className="wallet-content">
        {/* Balance Card */}
        <div className="balance-card">
          <div className="balance-info">
            <h2>Available Balance</h2>
            <div className="balance-amount">
              ₹ {user?.balance?.toLocaleString('en-IN') || '0'}
            </div>
            <p className="balance-note">This amount is available for betting and withdrawal</p>
          </div>
        </div>

        {/* Transaction Actions */}
        <div className="transaction-actions">
          <div className="action-card">
            <h3>Deposit Funds</h3>
            <div className="amount-input">
              <span className="currency">₹</span>
              <input
                type="number"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                placeholder="Enter amount"
                min="100"
              />
            </div>
            <div className="quick-amounts">
              {[500, 1000, 2000, 5000].map(amount => (
                <button
                  key={amount}
                  className="quick-amount"
                  onClick={() => setDepositAmount(amount)}
                >
                  ₹{amount}
                </button>
              ))}
            </div>
            <button onClick={handleDeposit} className="btn btn-primary btn-block">
              Deposit Now
            </button>
            <p className="info-note">Minimum deposit: ₹100</p>
          </div>

          <div className="action-card">
            <h3>Withdraw Funds</h3>
            <div className="amount-input">
              <span className="currency">₹</span>
              <input
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                placeholder="Enter amount"
                min="500"
              />
            </div>
            <button onClick={handleWithdraw} className="btn btn-outline btn-block">
              Request Withdrawal
            </button>
            <p className="info-note">Minimum withdrawal: ₹500</p>
          </div>
        </div>

        {/* Bonus Section */}
        <div className="bonus-section">
          <div className="bonus-card">
            <div className="bonus-content">
              <h2>300% Welcome Bonus</h2>
              <p>Get up to ₹10,000 bonus on your first deposit</p>
              <ul className="bonus-features">
                <li>Minimum deposit: ₹500</li>
                <li>Maximum bonus: ₹10,000</li>
                <li>10x wagering requirement</li>
              </ul>
              <button className="btn btn-primary">Claim Bonus</button>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="transaction-history">
          <h3>Transaction History</h3>
          <div className="transactions-table">
            <div className="table-header">
              <div className="table-cell">Type</div>
              <div className="table-cell">Amount</div>
              <div className="table-cell">Date</div>
              <div className="table-cell">Status</div>
            </div>
            {transactions.map(transaction => (
              <div key={transaction.id} className="table-row">
                <div className="table-cell">
                  <span className={`type-badge ${transaction.type.toLowerCase().replace(' ', '-')}`}>
                    {transaction.type}
                  </span>
                </div>
                <div className={`table-cell ${transaction.amount > 0 ? 'positive' : 'negative'}`}>
                  {transaction.amount > 0 ? '+' : ''}₹{Math.abs(transaction.amount).toLocaleString('en-IN')}
                </div>
                <div className="table-cell">{transaction.date}</div>
                <div className="table-cell">
                  <span className={`status-badge ${transaction.status.toLowerCase()}`}>
                    {transaction.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;