import axios from 'axios';

export default axios.create({
  baseURL: 'https://maitrikatta.herokuapp.com/api/v1',
});
