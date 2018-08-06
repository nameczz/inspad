'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_DOMAIN_DEV_CENTER: '"http://192.168.14.31:9000"',
  API_DOMAIN_PASSPORT: '"https://passport.zhihuiya.com"',
  CLIENT_ID: '"1871b8feb6ef491caf10ace5ff97f339"',
  API_PATH: '"/"',
})
