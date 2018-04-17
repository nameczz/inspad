import VeeValidate from 'vee-validate'
import Vue from 'vue'

const dictionary = {
  zh: {
    messages: {
      required(val) {
        return '请输入 ' + val
      },
      min(val, params) {
        return val + ' 长度不得低于' + params[0]
      },
    },
  },
}

Vue.use(VeeValidate, {
  locale: 'zh',
  dictionary,
})
