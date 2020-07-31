import axios from "axios";

export default () => {
    return axios.create({
        baseURL: process.env.VUE_APP_ONLINE_API
    });
};