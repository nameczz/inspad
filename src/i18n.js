import VueI18n from 'vue-i18n'
import Vue from 'vue'
import Cookies from 'js-cookie'
import { Validator } from 'vee-validate'
import locale from 'element-ui/lib/locale'
import languages from '@/const/languages'

let lang = Cookies.get('lang')
if (!lang) {
  lang = navigator.language
}
if (Object.keys(languages).indexOf(lang) < 0) {
  lang = 'en'
}
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: lang,
  silentTranslationWarn: true,
})

export function setLang(lang, callback) {
  languages[lang].file(res => {
    Cookies.set('lang', lang)
    Validator.localize(lang, res.default.validate)
    i18n.setLocaleMessage(lang, res.default.base)
    i18n.locale = lang
    locale.use(res.default.elementLang)
    callback && callback()
  })
}

export default i18n
