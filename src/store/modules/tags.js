const state = {
  tags: []
}

// mutations
const mutations = {
  pushTag(state, tag) {
    state.tags.push(tag)
  },
  deleteTag(state, tag) {
    state.tags.splice(state.tags.indexOf(tag), 1)
  }
}

const getters = {
}

const actions = {}

export default {
  getters,
  state,
  mutations,
  actions,
}
