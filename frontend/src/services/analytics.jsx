import api from './api';
const route = '/analytics';

// user growth rate over 12 weeks
export const getGrowthRate = async () => {
  try {
    const response = await api.get(`${ route }/growth-rate`);
    return await response.data;
  } catch (error) {
    throw new Error(error);
  }
};

// get user ratio of admin and user
export const getUserRatio = async () => {
  try {
    const response = await api.get(`${ route }/roles`);
    return await response.data;
  } catch (error) {
    throw new Error(error);
  }
};

// get user verification distribution
export const getVerificationDistribution = async () => {
  try {
    const response = await api.get(`${ route }/verification`);
    return await response.data;
  } catch (error) {
    throw new Error(error);
  }
};

// confession approval ratio
export const getConfessionApprovalRatio = async () => {
  try {
    const response = await api.get(`${ route }/confession-approval`);
    return await response.data;
  } catch (error) {
    throw new Error(error);
  }
};

// get confession votes ratio

export const getConfessionVotesRatio = async () => {
  try {
    const response = await api.get(`${ route }/up-down`);
    return await response.data;
  } catch (error) {
    throw new Error(error);
  }
};