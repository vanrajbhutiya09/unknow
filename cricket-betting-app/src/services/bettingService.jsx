import api from './api';

export const bettingService = {
  // Matches
  getMatches: (params) => api.get('/matches', { params }),
  
  getMatchById: (id) => api.get(`/matches/${id}`),
  
  getLiveMatches: () => api.get('/matches/live'),
  
  getUpcomingMatches: () => api.get('/matches/upcoming'),
  
  // Odds
  getMatchOdds: (matchId) => api.get(`/matches/${matchId}/odds`),
  
  getMarketOdds: (matchId, marketId) => api.get(`/matches/${matchId}/markets/${marketId}/odds`),
  
  // Bets
  placeBet: (betData, token) => api.post('/bets/place', betData, {
    headers: { Authorization: `Bearer ${token}` }
  }),
  
  getUserBets: (params, token) => api.get('/bets/user', {
    params,
    headers: { Authorization: `Bearer ${token}` }
  }),
  
  getBetHistory: (params, token) => api.get('/bets/history', {
    params,
    headers: { Authorization: `Bearer ${token}` }
  }),
  
  cancelBet: (betId, token) => api.post(`/bets/${betId}/cancel`, {}, {
    headers: { Authorization: `Bearer ${token}` }
  }),
  
  cashoutBet: (betId, token) => api.post(`/bets/${betId}/cashout`, {}, {
    headers: { Authorization: `Bearer ${token}` }
  }),
  
  // Live Scores
  getLiveScore: (matchId) => api.get(`/matches/${matchId}/live-score`),
  
  // Sports
  getSports: () => api.get('/sports'),
  
  getTournaments: (sportId) => api.get(`/sports/${sportId}/tournaments`)
};