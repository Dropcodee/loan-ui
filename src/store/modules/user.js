import axios from 'axios'
import AuthenticationService from '@/services/AuthenticationService'
import router from '../../router'
export const namespaced = true

export const state = {
  user: null,
  processing: false,
}

export const mutations = {
  SET_USER_STATE(state, userData) {
    state.user = userData.user
    localStorage.setItem('user', JSON.stringify(userData.user))
    axios.defaults.headers.common['Authorization'] = ` Bearer ${userData.user.api_token}`
  },
  LOGOUT_USER() {
    localStorage.removeItem('user')
    axios.defaults.headers.common['Authorization'] = null
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
      // console.log(response.data)
      commit('SET_REQUEST_PROCESS', false)
      // commit('SET_USER_STATE', response.data.data)
      // create success notification
      const notification = {
        type: 'success',
        message: response.data.message
      }
      dispatch('notification/add', notification, { root: true })
      router.push({ name: 'Login'})
    } catch (err) {
      commit('SET_REQUEST_PROCESS', false)
      // console.log(err.response.data.message)
      if (err) {
      const notification = {
        type: 'error',
        message: err.response.data.message
      }
       // dispatch notification action for creating notifications
      dispatch('notification/add', notification, { root: true })
      throw err
    } else {
      const notification = {
        type: 'error',
        message: 'Server Error, please try again later'
      }
       // dispatch notification action for creating notifications
      dispatch('notification/add', notification, { root: true })
      throw err
    }

    }
  },
  async loginUser({ commit, dispatch }, payload) {
    // send request to server
    try {
      commit('SET_REQUEST_PROCESS', true)
      const response = await AuthenticationService.login(payload)
      // store user return data
      console.log(response.data)
      commit('SET_USER_STATE', response.data)
      // create success notification
      const notification = {
        type: 'success',
        message: 'Welcome Back'
      }
      dispatch('notification/add', notification, { root: true })
      router.push({name: 'dashboard'})
      commit('SET_REQUEST_PROCESS', false)
    } catch (err) {
      commit('SET_REQUEST_PROCESS', false)
      // console.log(err.response.data)
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
