import api from './api';

const route = '/confession-vote';

export const createUpvote = async confessionId => {
  const response = await api.post(`${ route }/up/${ confessionId }`);
  return response.data;
};

export const createDownvote = async confessionId => {
  const response = await api.post(`${ route }/down/${ confessionId }`);
  return response.data;
};

export const updateUpvote = async confessionId => {
  const response = await api.put(`${ route }/down/${ confessionId }`);
  return response.data;
};

export const updateDownvote = async confessionId => {
  const response = await api.put(`${ route }/up/${ confessionId }`);
  return response.data;
};

export const deleteUpvote = async confessionId => {
  const response = await api.delete(`${ route }/up/${ confessionId }`);
  return response.data;
};

export const deleteDownvote = async confessionId => {
  const response = await api.delete(`${ route }/down/${ confessionId }`);
  return response.data;
};

export const getVotes = async confessionId => {
  const response = await api.get(`${ route }/count/${ confessionId }`);
  return response.data;
};

export const getVotesByConfessionIdAndUserId = async confessionId => {
  const response = await api.get(`${ route }/confession/${ confessionId }`);
  return response.data;
};
