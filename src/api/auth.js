import {mapApi} from '@/axios-help'
import Cookies from 'js-cookie'
import {cookieToken, cookieRefreshToken} from '@/const/cookies'
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
  getClient: {
    url: '/developer/api/clients',
    tpl: 'dev',
    transformRequest(params, opt) {
      opt.headers.Authorization = 'Bearer ' + Cookies.get(cookieToken)
      return params
    },
  },
  getToken: {
    method: 'post',
    url: '/connector/oauth/token',
    tpl: 'con',
    transformRequest(params, opt) {
      opt.headers['Authorization'] = 'Basic ' +
        btoa(params.clientId + ':' + params.clientSecret)
      return {'grant_type': 'client_credentials'}
    },
  },
  refreshToken: {
    method: 'post',
    url: '/identity/sso/token/refresh',
    tpl: 'platform',
    transformRequest(params, opt) {
      return {'refresh_token': Cookies.get(cookieRefreshToken)}
    },
  },
})

