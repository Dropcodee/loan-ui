import api from '@/services/Api'

export default {
    create(credentials) {
        return api().post('loans', credentials)
    },
}