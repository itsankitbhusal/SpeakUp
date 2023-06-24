import api from './api.jsx';
const route = '/auth';

export const login = async userData => {
  const response = await api.post(`${ route }/login`, { ...userData });
  return await response.data;
};

export const register = async userData => {
  const response = await api.post(`${ route }/register`, { ...userData });
  return await response.data;
};

export const getUserById = async() => {
  const response = await api.get(`${ route }/me`);
  return await response.data;
};

export const getAllUsers = async () => {
  const response = await api.get(`${ route }/users`);
  return await response.data;
};

export const deleteUser = async id => {
  const response = await api.delete(`${ route }/user/${ id }`);
  return await response.data;
};

export const upgradeUser = async id => {
  const response = await api.put(`${ route }/${ id }/admin`);
  return await response.data;
};