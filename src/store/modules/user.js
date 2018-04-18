import Cookies from 'js-cookie'
import {cookieClientName} from '@/const/cookies'

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
  refreshToken({commit}) {
  },
}


export default {
  getters,
  state,
  mutations,
  actions,
}
