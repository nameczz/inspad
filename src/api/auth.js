import {mapApi} from '@/axios-help'
import Cookies from 'js-cookie'
import {cookieToken, cookieClientId, cookieClientSecret} from '@/const/cookies'
export default mapApi({
  login: {
    method: 'post',
    tpl: 'passport',
    url: '/loginsubmit',
    transformRequest(params, opt) {
      params.client_id = process.env.CLIENT_ID
      params.response_type = 'TOKEN'
      // opt.params = params
      return params
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
      // opt.baseURL = 'https://con.zhihuiya.com'
      // opt.headers['content-type'] = 'application/x-www-form-urlencoded'
      // console.log('Basic ' + btoa(Cookies.get(cookieClientId) + ':' + Cookies.get(cookieClientSecret)))
      // opt.auth = {
      //   username: Cookies.get(cookieClientId),
      //   password: Cookies.get(cookieClientSecret),
      // }
      opt.headers['Authorization'] = 'Basic ' +
        btoa(Cookies.get(cookieClientId) + ':' + Cookies.get(cookieClientSecret))
      return {'grant_type': 'client_credentials'}
    },
  },
})

