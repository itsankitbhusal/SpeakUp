import api from './api';
const route = '/analytics';

// user growth rate over 12 weeks
export const getGrowthRate = async () => {
  const response = await api.get(`${ route }/growth-rate`);
  return await response.data;
};

// get user ratio of admin and user
export const getUserRatio = async () => {
  const response = await api.get(`${ route }/roles`);
  return await response.data;
};

// get user verification distribution
export const getVerificationDistribution = async () => {
  const response = await api.get(`${ route }/verification`);
  return await response.data;
};

// confession approval ratio
export const getConfessionApprovalRatio = async () => {
  const response = await api.get(`${ route }/confession-approval`);
  return await response.data;
};

// get confession votes ratio
export const getConfessionVotesRatio = async () => {
  const response = await api.get(`${ route }/up-down`);
  return await response.data;
};