import axios from 'axios';

const authAxios = axios.create({ baseURL: 'http://localhost:5000/api/v1' });

authAxios.interceptors.request.use(
  (request) => {
    request.headers.common['Authorization'] = localStorage.getItem('token');
    return request;
  },
  (error) => {
    console.log(error);
  }
);
authAxios.interceptors.response.use(
  (response) => {
    console(response);
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      console.log('401 ERROR');
      return Promise.reject(error);
    }
  }
);
export default authAxios;
