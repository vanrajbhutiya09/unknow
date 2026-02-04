import React, { useState } from 'react';
import { 
  FaFilter, FaSearch, FaDownload, FaPrint, FaChartLine, 
  FaCalendar, FaMoneyBillWave, FaTrophy, FaTimesCircle, 
  FaCheckCircle, FaClock, FaEye, FaReceipt, FaCricket 
} from 'react-icons/fa';

const BetHistory = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data
  const bets = [
    {
      id: 'BET001',
      date: '2024-05-15',
      match: 'MI vs CSK',
      market: 'Match Winner',
      selection: 'Mumbai Indians',
      odds: 1.86,
      stake: 1000,
      potentialWin: 1860,
      status: 'WON',
      profit: 860,
      sport: 'cricket'
    },
    {
      id: 'BET002',
      date: '2024-05-14',
      match: 'RCB vs KKR',
      market: 'Top Batsman',
      selection: 'Virat Kohli',
      odds: 3.25,
      stake: 500,
      potentialWin: 1625,
      status: 'LOST',
      profit: -500,
      sport: 'cricket'
    },
    {
      id: 'BET003',
      date: '2024-05-13',
      match: 'DC vs SRH',
      market: 'Total Runs',
      selection: 'Over 340.5',
      odds: 1.95,
      stake: 2000,
      potentialWin: 3900,
      status: 'PENDING',
      profit: 0,
      sport: 'cricket'
    }
  ];

  const stats = {
    totalBets: 47,
    totalStake: 154000,
    totalWon: 234500,
    totalLost: 67500,
    netProfit: 167000,
    winRate: 68.2
  };

  const tabs = [
    { id: 'all', label: 'All Bets', count: bets.length },
    { id: 'won', label: 'Won', count: bets.filter(b => b.status === 'WON').length },
    { id: 'lost', label: 'Lost', count: bets.filter(b => b.status === 'LOST').length },
    { id: 'pending', label: 'Pending', count: bets.filter(b => b.status === 'PENDING').length }
  ];

  const filteredBets = bets.filter(bet => {
    if (activeTab !== 'all' && bet.status !== activeTab.toUpperCase()) return false;
    if (searchTerm && !bet.match.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const StatCard = ({ title, value, icon, color }) => (
    <div className={`bg-white rounded-2xl p-6 shadow-lg border-l-4 ${color} transform hover:-translate-y-1 transition-all duration-300`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-xl ${color.replace('border-l-', 'bg-').replace('-500', '-100')}`}>
          {icon}
        </div>
      </div>
    </div>
  );

  const getStatusBadge = (status) => {
    const colors = {
      'WON': 'bg-green-100 text-green-800 border-green-200',
      'LOST': 'bg-red-100 text-red-800 border-red-200',
      'PENDING': 'bg-yellow-100 text-yellow-800 border-yellow-200'
    };
    
    const icons = {
      'WON': <FaCheckCircle className="w-4 h-4" />,
      'LOST': <FaTimesCircle className="w-4 h-4" />,
      'PENDING': <FaClock className="w-4 h-4" />
    };

    return (
      <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold border ${colors[status]}`}>
        {icons[status]}
        <span>{status}</span>
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
                <FaReceipt className="w-8 h-8 text-purple-600" />
                <span>Bet History</span>
              </h1>
              <p className="text-gray-600 mt-2">Track all your betting activity and performance</p>
            </div>
            <div className="flex space-x-3">
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors flex items-center space-x-2 font-medium">
                <FaDownload className="w-4 h-4" />
                <span className="hidden sm:inline">Export</span>
              </button>
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors flex items-center space-x-2 font-medium">
                <FaPrint className="w-4 h-4" />
                <span className="hidden sm:inline">Print</span>
              </button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard
              title="Total Bets"
              value={stats.totalBets}
              icon={<FaChartLine className="w-6 h-6 text-blue-600" />}
              color="border-l-blue-500"
            />
            <StatCard
              title="Total Stake"
              value={`₹${stats.totalStake.toLocaleString('en-IN')}`}
              icon={<FaMoneyBillWave className="w-6 h-6 text-green-600" />}
              color="border-l-green-500"
            />
            <StatCard
              title="Net Profit"
              value={`₹${stats.netProfit.toLocaleString('en-IN')}`}
              icon={<FaTrophy className="w-6 h-6 text-yellow-600" />}
              color="border-l-yellow-500"
            />
            <StatCard
              title="Win Rate"
              value={`${stats.winRate}%`}
              icon={<FaChartLine className="w-6 h-6 text-purple-600" />}
              color="border-l-purple-500"
            />
          </div>
        </div>

        {/* Filters and Tabs */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  activeTab === tab.id ? 'bg-white/20' : 'bg-gray-300'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <FaSearch className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="Search bets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-3">
              <select className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white">
                <option>All Sports</option>
                <option>Cricket</option>
                <option>Football</option>
                <option>Tennis</option>
              </select>
              <select className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white">
                <option>All Time</option>
                <option>Today</option>
                <option>This Week</option>
                <option>This Month</option>
              </select>
              <button className="px-4 py-3 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors flex items-center space-x-2 font-medium">
                <FaFilter className="w-4 h-4" />
                <span className="hidden md:inline">More Filters</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bets Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Bet Details
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Odds
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Stake
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Potential Win
                  </th>
                  <th className="px 6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Profit/Loss
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredBets.map((bet) => (
                  <tr key={bet.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
                            <FaCricket className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">{bet.match}</p>
                            <p className="text-sm text-gray-600">{bet.market} - {bet.selection}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <FaCalendar className="w-3 h-3" />
                            <span>{bet.date}</span>
                          </div>
                          <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                            #{bet.id}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-mono font-bold text-purple-600 text-lg">
                        {bet.odds}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-gray-900">
                        ₹{bet.stake.toLocaleString('en-IN')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-gray-900">
                        ₹{bet.potentialWin.toLocaleString('en-IN')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(bet.status)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`font-bold text-lg ${
                        bet.profit > 0 ? 'text-green-600' : 
                        bet.profit < 0 ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {bet.profit > 0 ? '+' : ''}₹{Math.abs(bet.profit).toLocaleString('en-IN')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors group">
                        <FaEye className="w-4 h-4 text-gray-600 group-hover:text-purple-600" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredBets.length === 0 && (
            <div className="py-16 text-center">
              <FaReceipt className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No bets found</h3>
              <p className="text-gray-500">Try adjusting your filters or search term</p>
            </div>
          )}

          {/* Pagination */}
          {filteredBets.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing <span className="font-bold">1</span> to <span className="font-bold">{filteredBets.length}</span> of{' '}
                <span className="font-bold">{bets.length}</span> results
              </div>
              <div className="flex space-x-2">
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50">
                  Previous
                </button>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  1
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  2
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BetHistory;