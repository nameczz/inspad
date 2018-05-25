import {
  mapApi,
} from '@/axios-help'
export default mapApi({
  getTopics: {
    url: '/topics',
    transformRequest(params, opt) {
      return params
    }
  },
  getUserInfo: {
    url: '/users',
    transformRequest(params, opt) {
      return params
    }
  },
  getIdeasById: {
    url: '/ideas',
    transformRequest(params, opt) {
      return params
    }
  },
  getComments: {
    url: '/comments',
    transformRequest(params, opt) {
      return params
    }
  },
  getNewComment: {
    url: '/comments/new',
    transformRequest(params, opt) {
      return params
    }
  },
  postTopic: {
    url: '/topics',
    method: 'post',
    transformRequest(params, opt) {
      return params
    }
  },
  postIdea: {
    url: '/ideas',
    method: 'post',
    transformRequest(params, opt) {
      return params
    }
  },
  postIdeaUp: {
    url: '/ideas/up',
    method: 'post',
    transformRequest(params, opt) {
      return params
    }
  },
  postIdeaDown: {
    url: '/ideas/up',
    method: 'post',
    transformRequest(params, opt) {
      return params
    }
  },
  postComment: {
    url: 'comments',
    method: 'post',
    transformRequest(params, opt) {
      return params
    }
  }
})
