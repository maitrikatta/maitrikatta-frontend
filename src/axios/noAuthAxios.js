import axios from "axios";

const noAuthAxios = axios.create({
  baseURL: "https://maitrikatta.com/api/v1",
});
noAuthAxios.interceptors.response.use(
  (response) => {
    if (response) return response;
  },
  (error) => {
    if (error?.response?.status === 401) {
      // not logged in
      return Promise.reject(error);
    }
    if (error?.response?.code === "ERR_NETWORK") {
      alert("Network Error");
      return Promise.reject(error);
    }
    // if no error matches, should return error
    // otherwise try catch wont get error obj
    return Promise.reject(error);
  }
);

noAuthAxios.interceptors.request.use(
  (request) => {
    request.headers.common["Authorization"] = localStorage.getItem("token");
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default noAuthAxios;
