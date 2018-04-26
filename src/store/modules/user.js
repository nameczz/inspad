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
    Cookies.remove(cookieClientId)
    Cookies.remove(cookieClientName)
    Cookies.remove(cookieAccessToken)
  },
}

const getters = {
}

const actions = {
  async fetchAccessToken({commit, state}) {
    let {success, data} = await apiAuth.getClient()
    if(success) {
      let client = data[0]
      if(!client) {
        throw new Error('no client')
      }
      Cookies.set(cookieClientName, client.client_name)
      Cookies.set(cookieClientId, client.id)
      commit('refreshLoggedUser')

      let {success, data: tokenData} = await apiAuth.getToken({clientId: client.id, clientSecret: client.plain_secret})
      if(success) {
        Cookies.set(cookieAccessToken, 'Bearer ' + tokenData['access_token'])
      }
    }
  },
}


export default {
  getters,
  state,
  mutations,
  actions,
}
