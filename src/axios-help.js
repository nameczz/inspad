import axios from 'axios'
import dateFormat from 'dateformat'
// import router from './router'
import assign from 'core-js/library/modules/_object-assign'
import apiAuth from 'api/auth'
import {cookieToken, cookieRefreshToken} from '@/const/cookies'
import Cookies from 'js-cookie'
import {Message} from 'element-ui'
import store from '@/store'

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
  dev(opt) {
    opt = Object.assign({}, opt)
    opt.baseURL = process.env.API_DOMAIN_DEV_CENTER + '/developer/api'
    if(opt.data) {
      let fd = new FormData()
      fd.append('data', JSON.stringify(opt.data))
      opt.data = fd
    }
    return opt
  },
  openapi(opt) {
    opt = Object.assign({}, opt)
    opt.baseURL = process.env.API_DOMAIN_DEV_CENTER + '/developer/api/openapi/common'
    let token = Cookies.get(cookieToken)
    if(!token) {
      throw new Error('unlogged')
    }
    opt.headers['Authorization'] = 'Bearer ' + token
    if(opt.data) {
      let fd = new FormData()
      fd.append('data', JSON.stringify(opt.data))
      opt.data = fd
    }
    return opt
  },
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
    return transformRespondDefault(res)
  } catch (e) {
    if(e.response) {
      switch(e.response.data.error_code) {
        case 10:
          Message({
            message: '错误的用户名或密码',
            type: 'error',
          })
          throw e
        case 11:
          try{
            let res = await apiAuth.refreshToken()
            Cookies.set(cookieRefreshToken, res.refresh_token)
            Cookies.set(cookieToken, res.token)
            return request(opt, reqOpts)
          }catch (e) {
            Message({
              message: '请登录',
              type: 'error',
            })
            store.commit('removeLoggedUser')
            throw new Error('unlogged')
          }
      }
    } else if(e.message === 'unlogged') {
      Message({
        message: '请登录',
        type: 'error',
      })
      throw e
    }
    Message({
      message: '系统错误',
      type: 'error',
    })
    throw e
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
        if(!opt.tpl) {
          opt.tpl = 'openapi'
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
