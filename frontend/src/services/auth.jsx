import api from './api.jsx';

export const login = async userData => {
  try {
    const response = await api.post('/auth/login', {
      ...userData
    });
    return await response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const register = async userData => {
  try {
    const response = await api.post('/auth/register', {
      ...userData
    });
    return await response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getNewToken = async refreshToken => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'refresh': refreshToken
    };
    const response = await api.get('/auth/token', { headers });
    return response.data.accessToken; 
  } catch (error) {
    throw new Error(error);
  }
};

