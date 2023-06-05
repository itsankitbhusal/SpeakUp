import axios from 'axios';
import decode from 'jwt-decode';
import { BASE_URL } from '../constants/constant';

let accessToken = localStorage.getItem('access') ? localStorage.getItem('access') : null;
let refreshToken = localStorage.getItem('refresh') ?localStorage.getItem('refresh') : null;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': accessToken ? `Bearer ${ accessToken }` : null,
    'refresh': refreshToken ? refreshToken : null
  }
});

api.interceptors.request.use(async req => {
  if (!accessToken || !refreshToken) {
    accessToken = localStorage.getItem('access') ? localStorage.getItem('access') : null;
    refreshToken = localStorage.getItem('refresh') ? localStorage.getItem('refresh') : null;
    req.headers.Authorization = `Bearer ${ accessToken }`;
  }
  const user = decode(accessToken);
  const isExpired = user.exp < Date.now() / 1000;
  if (isExpired) {return req;}

  const response = await axios.get(`${ BASE_URL }/auth/token`, { headers: { 'refresh': refreshToken } });
  localStorage.setItem('access', response.data.accessToken);

  req.headers.Authorization = `Bearer ${ response.data.accessToken }`;
  return req;
});

export default api;
