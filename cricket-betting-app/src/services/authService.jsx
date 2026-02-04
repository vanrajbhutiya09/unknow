import api from './api';

export const authService = {
  login: (credentials) => api.post('/auth/login', credentials),
  
  register: (userData) => api.post('/auth/register', userData),
  
  verifyToken: (token) => api.get('/auth/verify', {
    headers: { Authorization: `Bearer ${token}` }
  }),
  
  updateProfile: (profileData, token) => api.put('/user/profile', profileData, {
    headers: { Authorization: `Bearer ${token}` }
  }),
  
  changePassword: (passwordData, token) => api.put('/user/password', passwordData, {
    headers: { Authorization: `Bearer ${token}` }
  }),
  
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  
  resetPassword: (data) => api.post('/auth/reset-password', data),
  
  verifyEmail: (token) => api.get(`/auth/verify-email/${token}`),
  
  resendVerification: (email) => api.post('/auth/resend-verification', { email })
};