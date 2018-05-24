import {
  mapApi,
} from '@/axios-help'
export default mapApi({
  getNote: {
    url: 'static/mock.json',
    transformRequest(params, opt) {
      return params
    }
  }
})
