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