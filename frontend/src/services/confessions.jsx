import api from './api';

const route = '/confession';

// create confession
export const createConfession = async confessionData => {
  if (!confessionData) {
    return ({ message: 'Confession data is required' });
  }
  const response = await api.post(route, { ...confessionData });
  return await response.data;
};

// get approved confessions with pagination limit and page
export const getApprovedConfessions = async (limit, page) => {
  const response = await api.get(`${ route }/?limit=${ limit }&page=${ page }`);
  return await response.data;
};

// get  confession by id
export const getConfessionById = async id => {
  const response = await api.get(`${ route }/${ id }`);
  return await response.data;
};

// update confession
export const updateConfession = async (newConfessionData, id) => {
  const response = await api.put(`${ route }/${ id }`, { ...newConfessionData });
  return await response.data;
};

// delete confession
export const deleteConfession = async id => {
  const response = await api.delete(`${ route }/${ id }`);
  return await response.data;
};

// approve confessions
export const approveConfession = async id => {
  const response = await api.put(`${ route }/${ id }/approve`);
  return response.data;
};

// get all pending confessions with pagination limit and page
export const getAllPendingConfessions = async(limit, page) => {
  let url = `${ route }/pending`;
  const query = `?limit=${ limit }&page=${ page }`;
  if (limit && page) {
    url += query;
  }
  const response = await api.get(`${ url }`);
  return response.data;
};

// get all confession created by user/logged in user
export const getAllConfessionsByUser = async (limit, page) => {
  const response = await api.post(`${ route }/user?limit=${ limit }&page=${ page }`);
  return response.data;
};

// get all confession by user handle
export const getAllConfessionsByHandle = async (limit, page, handle) => { 
  const response = await api.post(`${ route }/user/handle/${ handle }?limit=${ limit }&page=${ page }`);
  return response.data;
};

// update confession
export const updateConfessionById = async (id, newConfessionData) => {
  const response = await api.put(`${ route }/${ id }`, { ...newConfessionData });
  return response.data;
};

// search confession by title
export const searchConfessionByTitle = async (title, limit, page) => {
  const response = await api.get(`${ route }/search?title=${ title }&limit=${ limit }&page=${ page }`);
  return response.data;
};