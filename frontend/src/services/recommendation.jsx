import api from './api';

const route = '/recommendation';

// get trending confessions
export const getTrendingConfessions = async () => {
  const response = await api.get(`${ route }`);
  return response.data;
};
