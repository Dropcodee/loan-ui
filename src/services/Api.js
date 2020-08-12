import axios from "axios";

export default () => {
    return axios.create({
        baseURL: process.env.VUE_APP_APIURL
        // baseURL: "http://127.0.0.1:8000/api/v1"
    });
};