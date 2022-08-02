import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:5000/api/v1',
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmU4ZTg1ODA2MDU5YjI2YjQ2ZjZhMTMiLCJ1c2VyTmFtZSI6IllvZ2VzaCBLYWtkZSIsImlhdCI6MTY1OTQzMTAwMCwiZXhwIjoxNjYyMDIzMDAwfQ.qJGXUt3VygReW9u9yDvP1IKzJssjGMQtPriHMtjOMEU',
  },
});
