import axios from 'axios'

export default () => {
    return axios.create({
        // baseURL: `http://127.0.0.1:8000/api/v1/`
           // baseURL: `https://67.205.138.181/api/v1/`,
           baseURL: `https://finaccplus.com.ng/api/v1/`,
    })
}
