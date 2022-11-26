import axios from 'axios';

const noAuthAxios = axios.create({
  baseURL: 'https://maitrikatta.herokuapp.com/api/v1',
});
noAuthAxios.interceptors.response.use(
  (response) => {
    if (response) return response;
  },
  (error) => {
    if (error?.response?.status === 401) {
      console.log('401 ERROR');
      return Promise.reject(error);
    }
    if (error?.response?.code === 'ERR_NETWORK') {
      alert('Network Error');
      return Promise.reject(error);
    }
  }
);
export default noAuthAxios;
