import {
  mapApi
} from '@/axios-help'
export default mapApi({
  searchNews: {
    method: 'post',
    tpl: 'dev',
    url: '/api/v2/news/simple_search_highlight',
    transformRequest(params, opt) {
      return params
    }
  }
})
