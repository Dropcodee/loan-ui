import axios from 'axios'

export default () => {
    return axios.create({
        baseURL: `http://67.205.138.181/api/v1/`
    })
}