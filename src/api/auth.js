import {mapApi} from '@/axios-help'

export default mapApi({
  login: {
    method: 'post',
    url: '/loginsubmit',
    transformRequest(params, opt) {
      params.client_id = process.env.CLIENT_ID
      params.response_type = 'TOKEN'
      opt.params = params
      return null
    },
  },
  checksession: {
    url: '/checksession',
    transformRequest(params) {
      params.client_id = process.env.CLIENT_ID
      params.response_type = 'TOKEN'
      return params
    },
  },
}, 'passport')

