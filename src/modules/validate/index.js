import VeeValidate, {Validator} from 'vee-validate'
import Vue from 'vue'
import locale from 'lang/validate'

Validator.localize(process.env.LANG, locale);

Vue.use(VeeValidate);
