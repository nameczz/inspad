import VueI18n from 'vue-i18n'
import Vue from 'vue'
import Cookies from 'js-cookie'
import { Validator } from 'vee-validate'
import locale from 'element-ui/lib/locale'
export const langRequire = {
  en: resolve => require(['@/locale/en'], resolve),
  'zh-CN': resolve => require(['@/locale/zh-CN'], resolve),
}
let lang = Cookies.get('lang')
if (!lang) {
  lang = navigator.language
}
if (Object.keys(langRequire).indexOf(lang) < 0) {
  lang = 'en'
}
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: lang,
  silentTranslationWarn: true,
})

export function setLang(lang, callback) {
  langRequire[lang](res => {
    Cookies.set('lang', lang)
    Validator.localize(lang, res.default.validate)
    i18n.setLocaleMessage(lang, res.default.base)
    i18n.locale = lang
    locale.use(res.default.elementLang)
    callback && callback()
  })
}

export default i18n
