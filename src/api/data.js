import {mapApi} from '@/axios-help'
export default mapApi({
  login: {
    method: 'post',
    url: '/loginsubmit',
    template: '',
    transformRequest(params, opt) {
      opt.params = {
        client_id: process.env.CLIENT_ID,
        response_type: 'TOKEN',
      }
      // params.client_id = process.env.CLIENT_ID
      // params.response_type = 'TOKEN'
      return params
    },
  },
  checksession: {
    method: 'GET',
    config: {
      baseURL: process.env.API_ORIGIN2,
    },
    url: '/checksession',
    transformRequest(params) {
      params.client_id = process.env.CLIENT_ID
      params.response_type = 'TOKEN'
      return params
    },
  },
}, 'dev')

