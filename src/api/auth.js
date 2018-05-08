import {mapApi} from '@/axios-help'
import Cookies from 'js-cookie'
import {cookieRefreshToken} from '@/const/cookies'
export default mapApi({
  login: {
    method: 'post',
    tpl: 'passport',
    url: '/loginsubmit',
    transformRequest(params, opt) {
      params.client_id = process.env.CLIENT_ID
      params.response_type = 'TOKEN'
      return params
    },
    config: {
      validateStatus: function(status) {
        return status >= 200 && status <= 404
      },
    },
  },
  logout: {
    method: 'get',
    tpl: 'passport',
    url: '/logout',
    transformRequest(params, opt) {
      return params
    },
  },
  checksession: {
    url: '/checksession',
    tpl: 'passport',
    transformRequest(params) {
      params.client_id = process.env.CLIENT_ID
      params.response_type = 'TOKEN'
      return params
    },
  },
  refreshToken: {
    url: '/auth/token',
    tpl: 'dev',
    transformRequest(params, opt) {
      opt.headers['Authorization'] = 'Bearer ' + Cookies.get(cookieRefreshToken)
      return params
    },
  },
})

