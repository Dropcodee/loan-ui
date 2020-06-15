import api from '@/services/Api'

export default {
    commodity(credentials) {
        return api().post('loans/commodity', credentials)
    },
}