// import VueI18n from 'vue-i18n'
// import Vue from 'vue'
// import lang from 'lang'
//
// Vue.use(VueI18n)
//
// export default new VueI18n({
//   locale: process.env.LANG,
//   silentTranslationWarn: true,
//   messages: {
//     [process.env.LANG]: lang,
//   },
// })

import VueI18n from 'vue-i18n'
import Vue from 'vue'
import Cookies from 'js-cookie'
import en from '@/locale/en'
import cn from '@/locale/zh-CN'

let lang = Cookies.get('lang')
if (!lang) {
  lang = navigator.language
}
if (lang !== 'zh-CN') {
  lang = 'en'
}
Cookies.set('lang', lang)
Vue.use(VueI18n)

export default new VueI18n({
  locale: lang,
  silentTranslationWarn: true,
  messages: {
    en,
    'zh-CN': cn,
  },
})
