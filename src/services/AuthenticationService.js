import api from '@/services/Api'

export default {
    register(credentials) {
        return api().post('auth/register', credentials)
    },
    login(credentials) {
        return api().post(`auth/login`, credentials)
    },
    verify(credentials) {
        return api().post('auth/verify', credentials)
    },
    update(credentials) {
        return api().post('auth/profile/edit', credentials)
    }
}