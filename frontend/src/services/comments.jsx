import api from './api';

const route = '/comment';

// create comment
export const createComment = async (comment, confessionId) => {
  const response = await api.post(`${ route }/${ confessionId }`, { ...comment });
  return response.data;
};

// get comments by confession id
export const getCommentsByConfessionId = async (confessionId, page, size) => {
  const response = await api.get(`${ route }/confession/${ confessionId }?page=${ page }&size=${ size }`);
  return response.data;
};

// delete comment by id
export const deleteCommentById = async id => {
  const response = await api.delete(`${ route }/${ id }`);
  return response.data;
};