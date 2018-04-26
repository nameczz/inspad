import axios from 'axios'
import dateFormat from 'dateformat'
// import router from './router'
import assign from 'core-js/library/modules/_object-assign'
import {cookieAccessToken} from '@/const/cookies'
import Cookies from 'js-cookie'
import store from './store'
import {Message} from 'element-ui'

let ai = axios.create({
  // baseURL: process.env.API_ORIGIN + process.env.API_PATH,
  baseURL: process.env.API_DOMAIN,
  withCredentials: true,
  timeout: 10000,
})
/*ai.interceptors.response.use(function(response) {
  return response
}, function(error) {
  return Promise.reject(error)
})*/

// tools
const TIME_FORMAT = 'yyyymm'

const METHOD_GET = 'get'

const transformRespondDefault = function(res) {
  return res.data
}

const apiOptionTpl = {
  passport(opt) {
    opt.baseURL = process.env.API_DOMAIN_PASSPORT
    opt.headers['X-Requested-With'] = 'XMLHttpRequest'
    if(opt.method === 'post') {
      opt.headers['content-type'] = 'application/x-www-form-urlencoded'
      if(opt.data) {
        opt.data = toFormData(opt.data)
      }
    }
    return opt
  },
  platform(opt) {
    opt.baseURL = process.env.API_DOMAIN_PLATFORM
    opt.headers['Authorization'] = Cookies.get(cookieAccessToken)
    opt.headers['content-type'] = 'application/json'
    opt.headers['Accept'] = 'application/json'
    // opt.headers['X-Requested-With'] = 'XMLHttpRequest'
    return toTempOption(opt)
    // if(opt.method === 'post') {
    //   if(opt.data) {
    //     opt.data = toFormData(opt.data)
    //   }
    // }
    // return opt
  },
  api(opt) {
    opt.baseURL = process.env.API_DOMAIN_API
    opt.headers['X-PatSnap-Version'] = 'v1'
    opt.headers['content-type'] = 'application/json'
    opt.headers['Authorization'] = Cookies.get(cookieAccessToken)
    if(!opt.headers['Authorization']) {
      if(store.state.user.loginStatus === 'logged') {
        throw new Error('token expired')
      } else {
        throw new Error('unlogged')
      }
    }

    return toTempOption(opt, true)
  },
  apiData(opt) {
    opt.baseURL = process.env.API_DOMAIN_API
    opt.headers['X-PatSnap-Version'] = '1.0.0'
    opt.headers['content-type'] = 'application/json'
    opt.headers['Authorization'] = Cookies.get(cookieAccessToken)
    if(!opt.headers['Authorization']) {
      if(store.state.user.loginStatus === 'logged') {
        throw new Error('token expired')
      } else {
        throw new Error('unlogged')
      }
    }
    return toTempOption(opt)
  },
  dev(opt) {
    opt.baseURL = process.env.API_DOMAIN_DEV_CENTER
    return toTempOption(opt)
  },
  con(opt) {
    opt.baseURL = process.env.API_DOMAIN_CON
    return toTempOption(opt)
  },
}

/**
 * @param {object} json
 * @return {string}
 */
function toUrlData(json) {
  let array = []
  for(let key in json) {
    if(json.hasOwnProperty(key)) {
      array.push(key + '=' + encodeURIComponent(json[key]))
    }
  }
  return (array.length > 0 ? '?' : '') + array.join('&')
}

/**
 * @param {object} opt
 * @param {boolean?} body
 * @return {object}
 */
function toTempOption(opt, body) {
  let sp = new URLSearchParams()
  sp.append('data', JSON.stringify({
    method: opt.method.toUpperCase(),
    url: opt.baseURL + opt.url + toUrlData(opt.params),
    headers: opt.headers,
    [body ? 'body' : 'params']: opt.data,
  }))
  return {
    method: 'post',
    url: '/api/openapi/common',
    data: sp,
  }
}

/**
 * @param {object} data
 * @return {URLSearchParams}
 */
function toFormData(data) {
  const params = new URLSearchParams()
  for(let key in data) {
    if(data.hasOwnProperty(key)) {
      params.append(key, data[key])
    }
  }
  return params
}

/**
 * @param {object} opt
 * @param {object} reqOpts
 * @return {Promise<*>}
 */
async function request(opt, reqOpts) {
  try {
    let realOption = apiOptionTpl[opt.tpl](reqOpts)
    let res = await ai.request(realOption)

    if(typeof res.data === 'string') {
      res.data = JSON.parse(res.data)
    }
    if(res.data.exp === 'token expired') {
      throw new Error('token expired')
    } else if(res.data.message === 'No permission for target API!') {
      throw new Error('no permission')
    } else {
      return transformRespondDefault(res)
    }
  } catch (e) {
    switch(e.message) {
      case 'no permission':
        Message({
          message: '您没有权限',
          type: 'error',
        })
        throw e
      case 'unlogged':
        Message({
          message: '请登录',
          type: 'error',
        })
        throw e
      case 'token expired':
        await store.dispatch('checkSession')
        if(store.state.user.loginStatus === 'logged') {
          await store.dispatch('fetchAccessToken')
          return request(opt, reqOpts)
        } else {
          Message({
            message: '请登录',
            type: 'error',
          })
          throw new Error('unlogged')
        }
      default:
        throw e
    }
  }
}

/**
 * @param {Array} apis
 * @param {string} source
 * @return {Object}
 */
function mapApi(apis) {
  for(let name in apis) {
    if(apis.hasOwnProperty(name)) {
      let opt = apis[name]
      apis[name] = async function(params) {
        const method = opt.method || METHOD_GET
        let reqOpts = {
          method,
          baseURL: '',
          url: opt.url,
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
            // 'Authorization': Cookies.get(cookieAccessToken),
          },
        }

        if(opt.transformRequest) {
          params = opt.transformRequest(params || {}, reqOpts)
          if(params === false) {
            return
          }
        }
        let methodKey = (method === 'put' || method === 'post' || method === 'patch') ? 'data' : 'params'
        reqOpts[methodKey] = params

        if(opt.config) {
          assign(reqOpts, opt.config)
        }
        return request(opt, reqOpts)
      }
    }
  }

  return apis
}

/**
 * @param {string|Date|Moment} time
 * @return {*}
 */
function getTimeStr(time) {
  const type = typeof time
  if(type === 'object') {
    return dateFormat(time, TIME_FORMAT)
  } else if(type === 'string') {
    return time
  }
}

export {ai, mapApi, getTimeStr}

/*eslint-disable*/
export class ApiBox {
  fetchFn = null
  results = null

  constructor(fetchFn) {
    this.fetchFn = fetchFn
  }

  fetch() {
    this.results = this.fetchFn.call()
    return this
  }

  get(name) {
    return this.results[name]
  }
}
