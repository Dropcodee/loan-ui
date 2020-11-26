import axios from "axios";
import NProgress from 'nprogress'
export default () => {
  const api = axios.create({
    // baseURL: process.env.VUE_APP_APIURL
    baseURL: "http://127.0.0.1:8000/api/v1"
  });
  api.interceptors.request.use(config => {
    NProgress.start();
    return config;
  });
  api.interceptors.response.use(
    response => {
      NProgress.done();
      return response;
    },
    error => {
      NProgress.done();
      return Promise.reject(error);
    })
  return api;
};
