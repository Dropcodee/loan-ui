import LoanServices from '@/services/LoanServices'

export const namespaced = true

export const state = {
    userLoans: null,
    processing: false,
}


export const mutations = {
    SET_REQUEST_PROCESS(state, requestProcess) {
        state.processing = requestProcess
    },
    STORE_USER_LOANS(state, loanData) {
        state.loans = loanData
    }
}

export const actions = {
    async CommodityLoanRequest({
        commit,
        dispatch
    }, payload) {
        try {
            commit('SET_REQUEST_PROCESS', true)
            const response = await LoanServices.create(payload)
            commit('SET_REQUEST_PROCESS', false)
            const notification = {
                type: 'success',
                message: 'Successfully applied for a new loan, we will contact you shortly.'
            }
            dispatch('notification/add', notification, {
                root: true
            })
            router.push({
                name: "loan-monitor"
            })
        } catch (err) {
            commit('SET_REQUEST_PROCESS', false)
            const notification = {
                type: 'error',
                message: err.response.data.error,
            }
            dispatch('notification/add', notification, {
                root: true
            })
            throw err
        }
    }
}
export const getters = {
    processing(state) {
        return state.processing
    }
}