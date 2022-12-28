import axios from 'axios';

const authAxios = axios.create({
  baseURL: 'https://maitrikatta.com/api/v1',
});

authAxios.interceptors.request.use(
  (request) => {
    request.headers.common['Authorization'] = localStorage.getItem('token');
    return request;
  },
  (error) => {
    console.log(`auth not found :${error}`);
    return Promise.reject(error);
  }
);
authAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.response?.status === 401) {
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);
export default authAxios;
