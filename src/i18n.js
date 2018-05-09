import VueI18n from 'vue-i18n'
import Vue from 'vue'
import lang from 'lang'

Vue.use(VueI18n)

export default new VueI18n({
  locale: process.env.LANG,
  silentTranslationWarn: true,
  messages: {
    [process.env.LANG]: lang,
  },
})
