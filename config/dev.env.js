'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  LANG: '"en"',
  // LANG: '"zh-CN"',
  API_DOMAIN_DEV_CENTER: '"https://dev-center.zhihuiya.com"',
  API_DOMAIN_PLATFORM: '"http://s-platform-identity.patsnap.qa"',
  API_DOMAIN_PASSPORT: '"https://passport.zhihuiya.com"',
  CLIENT_ID: '"b689439297d146bfb82199f52c2c97b4"',
  API_PATH: '"/"',
})
