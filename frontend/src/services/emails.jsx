import axios from 'axios';
import { BASE_URL } from '../constants/constant';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// verify user
export const verifyUser = async token => {
  const response = await api.get(`/auth/verify/${ token }`);
  return response.data;
};

// rest password
export const resetPassword = async (token, password) => {
  const response = await api.post(`/auth/reset/${ token }`, { ...password });
  return response.data;
};

// send email to use to reset password
export const sendResetPasswordEmail = async formData => { 
  const response = await api.post('/auth/reset', { ...formData });
  return response.data;
};
