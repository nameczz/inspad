import {mapApi} from '@/axios-help'
export default mapApi({
  langDetect: {
    method: 'POST',
    url: '/compute/lang_detect/',
    transformRequest(params) {
      return params
    },
  },
})

