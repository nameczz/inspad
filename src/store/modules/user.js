import Cookies from 'js-cookie'
import {cookieClientName, cookieRefreshToken} from '@/const/cookies'

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
  },
}

const getters = {
}

const actions = {
  async refreshToken({commit, state}) {
    let refreshToken = Cookies.get(cookieRefreshToken)
    console.log(!!refreshToken)
  },
}


export default {
  getters,
  state,
  mutations,
  actions,
}
