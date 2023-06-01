import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001',
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(config => {
  if (config.url === '/auth/login' || config.url === '/auth/register') {
    return config;
  }
  const token = localStorage.getItem('token');
  config.headers.Authorization = token ? `Bearer ${ token }` : '';
  config.headers['refresh'] = token ? `${ token }` : '';
  return config;
});

// interceptor to get new access token from refresh token if access token is expired
api.interceptors.response.use(async response => {
  if (response.status === 403) {
    try {
      const newAccessToken = await api.post('/auth/token', {}, { headers: { 'refresh': response.headers.refresh } });
      localStorage.setItem('token', newAccessToken.data.accessToken);
     
      const originalRequest = response.config;
      originalRequest.headers['Authorization'] = `Bearer ${ newAccessToken.data.accessToken }`;
      
      return await api(originalRequest);
      
    } catch (error) {
      return Promise.reject(error);
    }
  }
  return response;
},
error => Promise.reject(error)
);




export default api;