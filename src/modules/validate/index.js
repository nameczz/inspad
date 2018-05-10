import VeeValidate, {Validator} from 'vee-validate'
import Vue from 'vue'
import i18n from '@/i18n'

import en from '@/locale/en/validate'
import cn from '@/locale/zh-CN/validate'

// Validator.localize('en', en);
Vue.use(VeeValidate, {
  locale: i18n.locale,
  dictionary: {
    en,
    'zh-CN': cn,
  }
})
