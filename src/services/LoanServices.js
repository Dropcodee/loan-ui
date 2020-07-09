import api from '@/services/Api'

export default {
    commodity(credentials) {
        return api().post('loans/commodity', credentials)
    },
    guarantors() {
        return api().get('guarantors')
    },
    creditloan(credentials) {
        return api().post('loans/credit', credentials)
    }
}