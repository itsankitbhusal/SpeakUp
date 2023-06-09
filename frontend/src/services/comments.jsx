import api from './api';

const route = '/comment';

// create comment
export const createComment = async (comment, confessionId) => {
  try {
    const response = await api.post(`${ route }/${ confessionId }`, { ...comment });
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};