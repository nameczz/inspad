import {mapApi} from '@/axios-help'
export default mapApi({
  searchPatent: {
    url: '/patent/simple/search',
    tpl: 'apiData',
    transformRequest(params, opt) {
      return params
    },
  },
  getPatentValuation: {
    url: '/patent/valuation',
    tpl: 'apiData',
    transformRequest(params, opt) {
      return params
    },
  },
  getPatentLegalInfo: {
    url: '/patent/legal',
    tpl: 'apiData',
    transformRequest(params, opt) {
      return params
    },
  },
  getPatentDesc: {
    url: '/patent/description',
    tpl: 'apiData',
    transformRequest(params, opt) {
      return params
    },
  },
  getPatentClaim: {
    url: '/patent/claim',
    tpl: 'apiData',
    transformRequest(params, opt) {
      return params
    },
  },
  getPatentCitation: {
    url: '/patent/citation',
    tpl: 'apiData',
    transformRequest(params, opt) {
      return params
    },
  },
})

