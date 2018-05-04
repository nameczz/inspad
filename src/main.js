import Vue from 'vue'
import App from './App'
import router from './router'
import Icon from '@/modules/icon'
import '@/assets/styles/common.scss'
import {Button, Input} from 'element-ui'
import Copyright from '@/components/busi/Copyright'
import store from './store'
import Cookies from 'js-cookie'
import VueI18n from 'vue-i18n'
import lang from 'lang'

Cookies.set('lang', process.env.LANG)

Vue.use(VueI18n)
Vue.use(Button)
Vue.use(Input)

Vue.component('icon', Icon)
Vue.component('Copyright', Copyright)

Vue.config.productionTip = false

const i18n = new VueI18n({
  locale: process.env.LANG,
  messages: {
    [process.env.LANG]: lang,
  },
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  components: {App},
  store,
  template: '<App/>',
})
