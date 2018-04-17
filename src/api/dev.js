import {mapApi} from '@/axios-help'
import Cookies from 'js-cookie'
import {cookieToken, cookieClientId, cookieClientSecret} from '@/const/cookies'
export default mapApi({
  getClient: {
    url: '/developer/api/clients',
    transformRequest(params, opt) {
      opt.headers.Authorization = 'Bearer ' + Cookies.get(cookieToken)
      return params
    },
  },
  getToken: {
    method: 'post',
    url: '/connector/oauth/token',
    transformRequest(params, opt) {
      opt.baseURL = 'https://con.zhihuiya.com'
      opt.headers['content-type'] = 'application/x-www-form-urlencoded'
      console.log('Basic ' + btoa(Cookies.get(cookieClientId) + ':' + Cookies.get(cookieClientSecret)))
      // opt.headers['Authorization'] = 'Basic ' +
      //   btoa(Cookies.get(cookieClientId) + ':' + Cookies.get(cookieClientSecret))
      opt.auth = {
        username: Cookies.get(cookieClientId),
        password: Cookies.get(cookieClientSecret),
      }
      params = new URLSearchParams()
      params.append('grant_type', 'client_credentials')
      return params
    },
  },
}, 'dev')

