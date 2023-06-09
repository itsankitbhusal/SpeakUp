import api from './api';

const route = '/view';

export const createView = async confessionId => {
  const response = await api.post(`${ route }/${ confessionId }`);
  return response.data;
};

export const getConfessionViewsByUserId = async confessionId => {
  const response = await api.get(`${ route }/user/confession/${ confessionId }`);
  return response.data;
};
