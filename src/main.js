import Vue from 'vue'
import App from './App'
import router from './router'
import Icon from '@/modules/icon'
import '@/assets/styles/common.scss'
import {
  Button,
  Input,
} from 'element-ui'
import Copyright from '@/modules/busi/Copyright'
import store from './store'
import i18n, {
  setLang,
} from '@/i18n'
import VeeValidate from 'vee-validate'
import axios from 'axios'

Vue.prototype.$http = axios.create({
  // baseURL: process.env.API_ORIGIN + process.env.API_PATH,
  baseURL: '/',
  withCredentials: true,
  timeout: 10000,
})

Vue.prototype.$ELEMENT = {
  size: 'mini'
}
Vue.use(Button)
Vue.use(Input)
Vue.use(VeeValidate)

Vue.component('icon', Icon)
Vue.component('Copyright', Copyright)

require('./modules/mock/mockdata.js')

Vue.config.productionTip = false

store.dispatch('checkSession')

/* eslint-disable no-new */
setLang(i18n.locale, () => {
  new Vue({
    el: '#app',
    i18n,
    router,
    components: {
      App,
    },
    store,
    template: '<App/>',
  })
})
