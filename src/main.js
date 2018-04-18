import Vue from 'vue'
import App from './App'
import router from './router'
import Icon from '@/modules/icon'
import '@/assets/styles/common.scss'
import {Button} from 'element-ui'
import Copyright from '@/components/busi/Copyright'
import store from './store'

Vue.component('icon', Icon)
Vue.use(Button)
Vue.config.productionTip = false
Vue.component('Copyright', Copyright)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  store,
  template: '<App/>',
})
