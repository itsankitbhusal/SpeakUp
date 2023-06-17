import api from './api';
const route = '/reporting';

// create confession/comment report
export const createReport = async reportData => {
  try {
    const response = await api.post(`${ route }`, {
      ...reportData
    });
    return await response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getReportByType = async type => {
  try {
    const response = await api.get(`${ route }/object/${ type }`);
    return await response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const resolveCommentReport = async id => {
  try {
    const response = await api.put(`${ route }/resolve/comment/${ id }`);
    return await response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const resolveConfessionReport = async id => {
  try {
    const response = await api.put(`${ route }/resolve/confession/${ id }`);
    return await response.data;
  } catch (error) {
    throw new Error(error);
  }
};