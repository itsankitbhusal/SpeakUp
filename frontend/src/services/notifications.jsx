import api from './api';

const route = '/notification';

// get notification by user id
export const getNotificationsByUserId = async userId => {
  const response = await api.get(`${ route }/user/${ userId }`);
  return response.data;
};

// update notification status
export const updateNotificationStatus = async id => {
  const response = await api.put(`${ route }/${ id }`);
  return response.data;
};