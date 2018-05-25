import Vue from 'vue'
import Vuex from 'vuex'

// import * as actions from './actions'
// import * as getters from './getters'
// import * as mutations from './mutations'

import user from './modules/user'
import tags from './modules/tags'
import idea from './modules/idea'

Vue.use(Vuex)

export default new Vuex.Store({
  // actions,
  // getters,
  // mutations,
  modules: {
    user,
    tags,
    idea
  },
})
