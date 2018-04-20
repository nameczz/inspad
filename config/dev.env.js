'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_DOMAIN: '"http://ranking-webapi.zhihuiya.com"',
  // API_DOMAIN: '"http://192.168.44.66:9000"',
  API_DOMAIN_API: '"https://api.zhihuiya.com"',
  API_DOMAIN_DEV_CENTER: '"https://dev-center.zhihuiya.com"',
  API_DOMAIN_PLATFORM: '"http://s-platform-identity.patsnap.qa"',
  API_DOMAIN_CON: '"https://con.zhihuiya.com"',
  API_DOMAIN_PASSPORT: '"https://passport.zhihuiya.com"',
  CLIENT_ID: '"b689439297d146bfb82199f52c2c97b4"',
  // API_DOMAIN_PASSPORT: '"https://release-passport.zhihuiya.com"',
  // CLIENT_ID: '"1871b8feb6ef491caf10ace5ff97f339"',
  API_PATH: '"/"',
})
