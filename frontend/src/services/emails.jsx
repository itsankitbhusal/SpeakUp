import api from './api';

// verify user
export const verifyUser = async token => {
  const response = await api.get(`auth/verify/${ token }`);
  return response.data;
};

// rest password
export const resetPassword = async (token, formData) => {
  const response = await api.post(`auth/reset/${ token }`, { ...formData });
  return response.data;
};
