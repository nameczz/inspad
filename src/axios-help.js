import axios from 'axios'
import dateFormat from 'dateformat'
import apiAuth from 'api/auth'
import {
  cookieToken,
  cookieRefreshToken,
  cookieUserId
} from '@/const/cookies'
import Cookies from 'js-cookie'
import {
  Message
} from 'element-ui'
import store from '@/store'
import i18n from '@/i18n'
const ai = axios.create({
  // baseURL: process.env.API_ORIGIN + process.env.API_PATH,
  baseURL: process.env.API_DOMAIN,
  withCredentials: true
})
const jwtDecode = require('jwt-decode')

// tools
const TIME_FORMAT = 'yyyymm'

const METHOD_GET = 'get'

const transformRespondDefault = function (res) {
  return res.data
}

const apiOptionTpl = {
  passport(opt) {
    opt.baseURL = process.env.API_DOMAIN_PASSPORT
    opt.headers['X-Requested-With'] = 'XMLHttpRequest'
    if (opt.method === 'post') {
      opt.headers['content-type'] = 'application/x-www-form-urlencoded'
      if (opt.data) {
        opt.data = toFormData(opt.data)
      }
    }
    return opt
  },
  dev(opt) {
    opt = Object.assign({}, opt)
    opt.baseURL = `http://360release-search.patsnap.com/patsnap360-search`
    opt.headers['content-type'] = 'application/x-www-form-urlencoded'
    opt.headers['X-PatSnap-From'] = 'Swagger-UI-Test'

    return opt
  },
  openapi(opt) {
    opt = Object.assign({}, opt)
    opt.baseURL = `${process.env.API_DOMAIN_DEV_CENTER}/api`
    const token = Cookies.get(cookieToken)
    if (!token) {
      throw new Error('unlogged')
    }
    opt.headers.Authorization = `Bearer ${token}`
    return opt
  },
}

/**
 * @param {object} data
 * @return {URLSearchParams}
 */
function toFormData(data) {
  const params = new URLSearchParams()
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
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
    const realOption = apiOptionTpl[opt.tpl](reqOpts)
    const res = await ai.request(realOption)

    if (typeof res.data === 'string') {
      res.data = JSON.parse(res.data)
    }
    return transformRespondDefault(res)
  } catch (e) {
    if (e.response) {
      switch (e.response.data.error_code) {
        case 10:
          Message({
            message: i18n.t('error.wrongUsernameOrPassword'),
            type: 'error',
          })
          throw e
        case 11:
          try {
            const res = await apiAuth.refreshToken()
            const info = jwtDecode(res.token)

            Cookies.set(cookieRefreshToken, res.refresh_token)
            Cookies.set(cookieToken, res.token)
            Cookies.set(cookieUserId, info.sub)
            return request(opt, reqOpts)
          } catch (e) {
            Message({
              message: i18n.t('error.unlogged'),
              type: 'error',
            })
            store.commit('removeLoggedUser')
            throw new Error('unlogged')
          }
      }
    } else if (e.message === 'unlogged') {
      Message({
        message: i18n.t('error.unlogged'),
        type: 'error',
      })
      throw e
    }
    throw e
  }
}

/**
 * @param {Array} apis
 * @param {string} source
 * @return {Object}
 */
function mapApi(apis) {
  for (const name in apis) {
    if (apis.hasOwnProperty(name)) {
      const opt = apis[name]
      apis[name] = async function (params) {
        const method = opt.method || METHOD_GET
        const reqOpts = {
          method,
          baseURL: '',
          url: opt.url,
          headers: {
            'content-type': 'application/json',
          },
        }
        if (!opt.tpl) {
          opt.tpl = 'openapi'
        }
        if (opt.transformRequest) {
          params = opt.transformRequest(params || {}, reqOpts)
          if (params === false) {
            return
          }
        }
        const methodKey = (method === 'put' || method === 'post' || method === 'patch') ? 'data' : 'params'
        reqOpts[methodKey] = params
        if (opt.config) {
          Object.assign(reqOpts, opt.config)
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
  if (type === 'object') {
    return dateFormat(time, TIME_FORMAT)
  } else if (type === 'string') {
    return time
  }
}

export {
  ai,
  mapApi,
  getTimeStr
}

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
