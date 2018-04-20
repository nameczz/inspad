import Cookies from 'js-cookie'
import {cookieClientName, cookieRefreshToken} from '@/const/cookies'

let clientName = Cookies.get(cookieClientName)
const state = {
  clientName,
  logged: !!clientName,
}

// mutations
const mutations = {
  setClientName(state, clientName) {
    state.clientName = clientName
    state.logged = true
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
