import api from './api';
const route = '/tag';

// search tags
export const searchTags = async query => {
  const response = await api.get(`${ route }/search?name=${ query }`);
  return response.data;
};