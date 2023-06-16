import api from './api';

const route = '/confession';

// create confession
export const createConfession = async confessionData => {
  if (!confessionData) {
    throw new Error('Confession data is required');
  }
  try {
    const response = await api.post(route, {
      ...confessionData
    });
    return await response.data;
  } catch (error) {
    throw new Error(error);
  }
};

// get approved confessions with pagination limit and page
export const getApprovedConfessions = async (limit, page) => {
  try {
    const response = await api.get(`${ route }/?limit=${ limit }&page=${ page }`);
    return await response.data;
  } catch (error) {
    throw new Error(error);
  }
};

// get  confession by id
export const getConfessionById = async id => {
  try {
    const response = await api.get(`${ route }/${ id }`);
    return await response.data;
  } catch (error) {
    throw new Error(error);
  }
};

// update confession
export const updateConfession = async (newConfessionData, id) => {
  try {
    const response = await api.put(`${ route }/${ id }`, {
      ...newConfessionData
    });
    return await response.data;
  } catch (error) {
    throw new Error(error);
  }
};

// delete confession
export const deleteConfession = async id => {
  try {
    const response = await api.delete(`${ route }/${ id }`);
    return await response.data;
  } catch (error) {
    throw new Error(error);
  }
};

// approve confessions
export const approveConfession = async id => {
  try {
    const response = await api.put(`${ route }/${ id }/approve`);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

// get all pending confessions with pagination limit and page
export const getAllPendingConfessions = async(limit, page) => {
  try {
    let url = `${ route }/pending`;
    const query = `?limit=${ limit }&page=${ page }`;
    if (limit && page) {
      url += query;
    }
    const response = await api.get(`${ url }`);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

// get all confession created by user/logged in user
export const getAllConfessionsByUser = async (limit, page) => {
  try {
    const response = await api.post(`${ route }/user?limit=${ limit }&page=${ page }`);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

// update confession
export const updateConfessionById = async (id, newConfessionData) => {
  try {
    const response = await api.put(`${ route }/${ id }`, {
      ...newConfessionData
    });
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
