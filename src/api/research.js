import {mapApi} from '@/axios-help'
export default mapApi({
  langDetect: {
    method: 'post',
    url: '/compute/lang_detect/',
    tpl: 'api',
    body: true,
    transformRequest(params, opt) {
      // opt.params = params
      return params
    },
  },
})

