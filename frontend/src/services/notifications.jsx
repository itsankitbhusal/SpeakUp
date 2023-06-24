import api from './api';

const route = '/notification';

// get notification by user id
export const getNotificationsByUserId = async userId => {
  const response = await api.get(`${ route }/user/${ userId }`);
  return response.data;
};