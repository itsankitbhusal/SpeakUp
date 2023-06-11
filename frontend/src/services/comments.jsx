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

// get comments by confession id
export const getCommentsByConfessionId = async (confessionId, page, size) => {
  try {
    const response = await api.get(`${ route }/confession/${ confessionId }?page=${ page }&size=${ size }`);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};