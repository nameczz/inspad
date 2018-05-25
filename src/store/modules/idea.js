const state = {
  topic: '',
  idea: ''
}

// mutations
const mutations = {
  setTopic(state, topic) {
    state.topic = topic
  },
  setIdea(state, idea) {
    state.idea = idea
  }
}

const getters = {
  tags: state => state.tags
}

const actions = {}

export default {
  getters,
  state,
  mutations,
  actions,
}
