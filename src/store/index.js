import Vue from 'vue'
import Vuex from 'vuex'

import app from '../main'
import menu from './modules/menu'
import * as user from './modules/user'
import * as notification from './modules/notification'
import * as loan from './modules/loan'
import chat from './modules/chat'
import todo from './modules/todo'
import survey from './modules/survey'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
    changeLang (state, payload) {
      app.$i18n.locale = payload
      localStorage.setItem('currentLanguage', payload)
    }
  },
  actions: {
    setLang ({ commit }, payload) {
      commit('changeLang', payload)
    }
  },
  modules: {
    menu,
    user,
    notification,
    loan,
    chat,
    todo,
    survey
  }
})