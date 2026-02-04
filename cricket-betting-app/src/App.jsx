// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { WalletProvider } from './context/WalletContext';

// Layout Components
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

// Routes
import PublicRoutes from './routes/PublicRoutes';
import PrivateRoutes from './routes/PrivateRoutes';
import AdminRoutes from './routes/AdminRoutes';

// Import Components
import Header from './components/common/Header';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

function App() {
  return (
    <Router>
      <AuthProvider>
        <WalletProvider>
          <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800">
            <Routes>
              {/* Public Routes */}
              <Route element={<PublicRoutes />}>
                <Route path="/login" element={<div>Login</div>} />
                <Route path="/register" element={<div>Register</div>} />
              </Route>

              {/* Main Layout Routes */}
              <Route element={<MainLayout />}>
                <Route path="/" element={<div>Home</div>} />
                <Route path="/sports" element={<div>Sports</div>} />
                <Route path="/cricket" element={<div>Cricket</div>} />
                <Route path="/match/:id" element={<div>Match Detail</div>} />
                
                {/* Private Routes */}
                <Route element={<PrivateRoutes />}>
                  <Route path="/dashboard" element={<div>Dashboard</div>} />
                  <Route path="/profile" element={<div>Profile</div>} />
                  <Route path="/wallet" element={<div>Wallet</div>} />
                  <Route path="/my-bets" element={<BetHistory />} />
                </Route>
              </Route>

              {/* Admin Routes */}
              <Route element={<AdminLayout />}>
                <Route element={<AdminRoutes />}>
                  <Route path="/admin" element={<div>Admin Dashboard</div>} />
                </Route>
              </Route>
            </Routes>

            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </div>
        </WalletProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;