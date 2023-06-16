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

export const getAllUsers = async () => {
  try {
    const response = await api.get(`${ route }/users`);
    return await response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteUser = async id => {
  try {
    const response = await api.delete(`${ route }/user/${ id }`);
    return await response.data;
  } catch (error) {
    throw new Error(error);
  }
};