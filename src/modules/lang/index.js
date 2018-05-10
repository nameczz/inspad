import i18n from '@/i18n'
import Cookies from "js-cookie";

import {Validator} from 'vee-validate'

export function setLang(lang) {
  i18n.locale = lang
  Cookies.set('lang', lang)
  Validator.localize(lang);
}
