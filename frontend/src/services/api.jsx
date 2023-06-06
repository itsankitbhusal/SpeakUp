import axios from 'axios';
import decode from 'jwt-decode';
import { BASE_URL } from '../constants/constant';

const getNewAccessToken = async () => {
  const refreshToken = localStorage.getItem('refresh');
  if (refreshToken === undefined || refreshToken === null || refreshToken === '') {
    return;
  }
  const response = await axios.get(`${ BASE_URL }/auth/token`, { headers: { 'refresh': refreshToken } });
  const newAccessToken = await response.data.data.accessToken;
  localStorage.setItem('access', newAccessToken);
  return newAccessToken;
};

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// axios interceptor to to get new access token when it expires and error 401
api.interceptors.request.use(async config => {
  const accessToken = localStorage.getItem('access');
  const refreshToken = localStorage.getItem('refresh');
  if (!accessToken || !refreshToken) {
    console.log('not found token');
  }
  config.headers['refresh'] = refreshToken;
  if (accessToken === undefined || accessToken === null || accessToken === '') {
    localStorage.removeItem('access');
    return config;
  }
  const decoded = decode(accessToken);
  if (decoded.exp < Date.now() / 1000) {
    const newAccessToken = await getNewAccessToken();
    config.headers['authorization'] = `Bearer ${ newAccessToken }`;
  } else {
    config.headers['authorization'] = `Bearer ${ accessToken }`;
  }
  return config;
}, error => Promise.reject(error));
api.interceptors.response.use(response => response, async error => {
  if (error?.response?.status === 401) {
    const newAccessToken = await getNewAccessToken();
    const { config } = error;
    config.headers['authorization'] = `Bearer ${ newAccessToken }`;
    return await axios.request(config);
  } else {
    return Promise.reject(error);
  }
});

export default api;
