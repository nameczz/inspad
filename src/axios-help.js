import axios from 'axios'
import dateFormat from 'dateformat'
// import router from './router'
import assign from 'core-js/library/modules/_object-assign'
import {cookieAccessToken} from '@/const/cookies'
import Cookies from 'js-cookie'

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
  if(res.status === 200) {
    return JSON.parse(res.data)
  } else {
    return JSON.parse(res.data)
    // throw new Error('系统异常')
  }
}

const apiDomainInit = {
  passport(opt) {
    opt.baseURL = process.env.API_DOMAIN_PASSPORT
    opt.headers['X-Requested-With'] = 'XMLHttpRequest'
    // opt.headers['content-type'] = 'application/x-www-form-urlencoded'
  },
  api(opt) {
    opt.baseURL = process.env.API_DOMAIN_API
    opt.headers['X-PatSnap-Version'] = 'v1'
    opt.headers['content-type'] = 'application/json'
    opt.headers['Authorization'] = Cookies.get(cookieAccessToken)
  },
  apiData(opt) {
    opt.baseURL = process.env.API_DOMAIN_API
    opt.headers['X-PatSnap-Version'] = '1.0.0'
    opt.headers['content-type'] = 'application/json'
    opt.headers['Authorization'] = Cookies.get(cookieAccessToken)
  },
  dev(opt) {
    opt.baseURL = process.env.API_DOMAIN_DEV_CENTER
  },
  con(opt) {
    opt.baseURL = process.env.API_DOMAIN_CON
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
        apiDomainInit[opt.tpl](reqOpts)

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

        try {
          let postDataType = opt.body ? 'body' : 'params'
          let sp = new URLSearchParams()
          sp.append('data', JSON.stringify({
            method: reqOpts.method.toUpperCase(),
            url: reqOpts.baseURL + reqOpts.url + toUrlData(reqOpts.params),
            headers: reqOpts.headers,
            [postDataType]: reqOpts.data,
          }))
          let res = await ai.request({
            method: 'post',
            url: '/api/openapi/common',
            data: sp,
          })
          return (opt.transformResponse || transformRespondDefault)(res)
        } catch (e) {
          throw e
          /*if(!opt.noLogin) {
            let currentRoute = router.currentRoute
            if(currentRoute.name !== 'login') {
              let from = {
                path: currentRoute.path,
                params: currentRoute.params,
                query: currentRoute.query,
              }
              router.push({
                name: 'login',
                query: {
                  from: JSON.stringify(from),
                },
              })
            }
            throw new Error('请登录')
          } else {
            throw e
          }*/
        }
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
