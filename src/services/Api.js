import axios from "axios";
import NProgress from 'nprogress'
export default () => {
  const api = axios.create({
    baseURL: process.env.VUE_APP_API_URL
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
