import api from './api.jsx';
const route = '/auth';

export const login = async userData => {
  try {
    const response = await api.post(`${ route }/login`, {
      ...userData
    });
    return await response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const register = async userData => {
  try {
    const response = await api.post(`${ route }/register`, {
      ...userData
    });
    return await response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getUserById = async() => {
  try {
    const response = await api.get(`${ route }/me`);
    return await response.data;
  } catch (error) {
    throw new Error(error);
  }
};
