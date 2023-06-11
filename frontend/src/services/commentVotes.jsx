import api from './api';

const route = '/comment-vote';

export const createUpvoteComment = async commentId => {
  const response = await api.post(`${ route }/up/${ commentId }`);
  return response.data;
};

export const createDownvoteComment = async commentId => {
  const response = await api.post(`${ route }/down/${ commentId }`);
  return response.data;
};

export const updateUpvoteComment = async commentId => {
  const response = await api.put(`${ route }/down/${ commentId }`);
  return response.data;
};

export const updateDownvoteComment = async commentId => {
  const response = await api.put(`${ route }/up/${ commentId }`);
  return response.data;
};

export const deleteUpvoteComment = async commentId => {
  const response = await api.delete(`${ route }/up/${ commentId }`);
  return response.data;
};

export const deleteDownvoteComment = async commentId => {
  const response = await api.delete(`${ route }/down/${ commentId }`);
  return response.data;
};

export const getVotesComment = async commentId => {
  const response = await api.get(`${ route }/count/${ commentId }`);
  console.log('count response', response.data);
  return response.data;
};

export const getVotesByCommentIdAndUserIdComment = async commentId => {
  const response = await api.get(`${ route }/comment/${ commentId }`);
  return response.data;
};
