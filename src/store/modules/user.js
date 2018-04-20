import Cookies from 'js-cookie'
import {cookieClientName, cookieClientId, cookieAccessToken, cookieRefreshToken, cookieToken} from '@/const/cookies'
import apiAuth from 'api/auth'

const state = {
  clientName: null,
  loginStatus: 'pending',
}

// mutations
const mutations = {
  refreshLoggedUser(state) {
    state.clientName = Cookies.get(cookieClientName)
    state.loginStatus = 'logged'
  },
  removeLoggedUser(state) {
    state.clientName = null
    state.loginStatus = 'unlogged'
    Cookies.remove(cookieRefreshToken)
    Cookies.remove(cookieToken)
  },
}

const getters = {
}

const actions = {
  async fetchAccessToken({commit, state}) {
    let [client] = await apiAuth.getClient()
    Cookies.set(cookieClientName, client.client_name)
    Cookies.set(cookieClientId, client.id)
    commit('refreshLoggedUser')

    let tokenRes = await apiAuth.getToken({clientId: client.id, clientSecret: client.plain_secret})
    Cookies.set(cookieAccessToken, 'Bearer ' + tokenRes['access_token'])
  },
}


export default {
  getters,
  state,
  mutations,
  actions,
}
