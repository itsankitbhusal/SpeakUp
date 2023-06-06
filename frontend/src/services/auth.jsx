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
