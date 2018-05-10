import Cookies from 'js-cookie'
import { cookieUsername, cookieRefreshToken, cookieToken } from '@/const/cookies'
import apiAuth from 'api/auth'

const state = {
  username: null,
  loginStatus: 'pending',
}

// mutations
const mutations = {
  refreshLoggedUser(state) {
    state.username = Cookies.get(cookieUsername)
    state.loginStatus = 'logged'
  },
  removeLoggedUser(state) {
    state.username = null
    state.loginStatus = 'unlogged'
    Cookies.remove(cookieRefreshToken)
    Cookies.remove(cookieToken)
    Cookies.remove(cookieUsername)
  },
}

const getters = {
}

const actions = {
  async checkSession({ commit }) {
    const res = await apiAuth.checksession()
    if (res.token) {
      Cookies.set(cookieRefreshToken, res.refresh_token)
      Cookies.set(cookieToken, res.token)
      commit('refreshLoggedUser')
    } else {
      commit('removeLoggedUser')
    }
  },
}

export default {
  getters,
  state,
  mutations,
  actions,
}
