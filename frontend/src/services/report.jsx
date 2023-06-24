import api from './api';
const route = '/reporting';

// create confession/comment report
export const createReport = async reportData => {
  const response = await api.post(`${ route }`, { ...reportData });
  return await response.data;
};

export const getReportByType = async type => {
  const response = await api.get(`${ route }/object/${ type }`);
  return await response.data;
};

export const resolveCommentReport = async id => {
  const response = await api.put(`${ route }/resolve/comment/${ id }`);
  return await response.data;
};

export const resolveConfessionReport = async id => {
  const response = await api.put(`${ route }/resolve/confession/${ id }`);
  return await response.data;
};