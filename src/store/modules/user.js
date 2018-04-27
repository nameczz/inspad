import Cookies from 'js-cookie'
import {cookieUsername, cookieClientId, cookieAccessToken, cookieRefreshToken, cookieToken} from '@/const/cookies'
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
    Cookies.remove(cookieClientId)
    Cookies.remove(cookieUsername)
    Cookies.remove(cookieAccessToken)
  },
}

const getters = {
}

const actions = {
  async fetchAccessToken({commit, state}) {
    let [client] = await apiAuth.getClient()
    if(!client) {
      throw new Error('no client')
    }
    Cookies.set(cookieClientId, client.id)
    commit('refreshLoggedUser')

    let tokenRes = await apiAuth.getToken({clientId: client.id, clientSecret: client.plain_secret})
    Cookies.set(cookieAccessToken, 'Bearer ' + tokenRes['access_token'])
  },
  async checkSession({commit}) {
    let res = await apiAuth.checksession()
    if(res.token) {
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
