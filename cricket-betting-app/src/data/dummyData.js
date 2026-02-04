export const matches = [
  {
    id: 1,
    team1: "Mumbai Indians",
    team2: "Chennai Super Kings",
    currentScore: "MI 145/3 (15.2)",
    status: "In-Play",
    odds: {
      team1: 1.86,
      team2: 1.85
    },
    startTime: "2024-05-15T19:30:00"
  },
  {
    id: 2,
    team1: "Royal Challengers Bangalore",
    team2: "Kolkata Knight Riders",
    currentScore: "RCB 180/4 (18.0)",
    status: "In-Play",
    odds: {
      team1: 1.92,
      team2: 1.88
    },
    startTime: "2024-05-16T19:30:00"
  },
  {
    id: 3,
    team1: "Delhi Capitals",
    team2: "Sunrisers Hyderabad",
    currentScore: "Match starts in 2 hours",
    status: "Upcoming",
    odds: {
      team1: 1.78,
      team2: 1.95
    },
    startTime: "2024-05-17T19:30:00"
  }
];

export const userData = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  balance: 24500.00,
  totalBets: 15,
  wins: 8,
  losses: 7,
  joinDate: "2024-01-15"
};

export const betSlips = [
  {
    id: 1,
    matchId: 1,
    team: "Mumbai Indians",
    odds: 1.86,
    stake: 1000,
    potentialWin: 1860,
    status: "Pending"
  }
];

export const transactions = [
  { id: 1, type: "Deposit", amount: 10000, date: "2024-05-01", status: "Completed" },
  { id: 2, type: "Bet Placed", amount: -500, date: "2024-05-02", status: "Completed" },
  { id: 3, type: "Win", amount: 930, date: "2024-05-03", status: "Completed" },
  { id: 4, type: "Withdrawal", amount: -2000, date: "2024-05-04", status: "Pending" }
];