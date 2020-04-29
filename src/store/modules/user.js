import axios from 'axios'
import router from '@/router'
import AuthenticationService from '@/services/AuthenticationService'

export const namespaced = true

export const state = {
  user: null,
  processing: false,
}

export const mutations = {
  SET_USER_STATE(state, userData) {
    state.user = userData
    localStorage.setItem('user', JSON.stringify(userData))
    axios.defaults.headers.common['Authorization'] = ` Bearer ${userData.api_token}`
  },
  LOGOUT_USER() {
    localStorage.removeItem('user')
    location.reload()
  },
  SET_REQUEST_PROCESS(state, requestProcess) {
    state.processing = requestProcess
  }
}


export const actions = {
  async registerUser({ commit, dispatch }, payload) {
    commit('SET_REQUEST_PROCESS', true)
    try {
      const response = await AuthenticationService.register(payload)
      console.log(response.data)
      commit('SET_REQUEST_PROCESS', false)
      // commit('SET_USER_STATE', response.data.data)
      // create success notification
      const notification = {
        type: 'success',
        message: response.data.message
      }
      dispatch('notification/add', notification, { root: true })
      router.push('/login')
    } catch (err) {
      commit('SET_REQUEST_PROCESS', false)
      // console.log(err.response.data.message)
      const notification = {
        type: 'error',
        message: err.response.data.message
      }
      // dispatch notification action for creating notifications
      dispatch('notification/add', notification, { root: true })
      throw err
    }
  },
  async loginUser({ commit, dispatch }, payload) {
    // send request to server
    try {
      commit('SET_REQUEST_PROCESS', true)
      const response = await AuthenticationService.login(payload)
      // store user return data
      // console.log(response.data)
      commit('SET_USER_STATE', response.data)
      // create success notification
      const notification = {
        type: 'success',
        message: 'successfully logged in'
      }
      dispatch('notification/add', notification, { root: true })
      commit('SET_REQUEST_PROCESS', false)
      router.push('/app/dashboards/default')
    } catch (err) {
      commit('SET_REQUEST_PROCESS', false)
      // console.log(err.response.data.message)
      const notification = {
        type: 'error',
        message: err.response.data.message
      }
      // dispatch notification action for creating notifications
      dispatch('notification/add', notification, { root: true })
      throw err
    }
  },
  logoutUser({ commit }) {
    commit('LOGOUT_USER');
  }
}
export const getters = {
  isLoggedIn(state) {
    return !!state.user
  },
  currentUser(state) {
    if (state.user !== null || state.user !== undefined) {
      return state.user
    }
    return null
  },
  processing(state) {
    return state.processing
  }
}
