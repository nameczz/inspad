'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_DOMAIN_DEV_CENTER: '"https://dev-center.zhihuiya.com"',
  API_DOMAIN_PASSPORT: '"http://qa-passport.zhihuiya.com"',
  CLIENT_ID: '"10"',
  API_PATH: '"/"',
})
