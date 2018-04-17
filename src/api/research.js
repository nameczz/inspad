import {mapApi} from '@/axios-help'
export default mapApi({
  langDetect: {
    method: 'post',
    url: '/compute/lang_detect/',
    tpl: 'api',
    body: true,
    transformRequest(params, opt) {
      return params
    },
  },
  nerChem: {
    method: 'post',
    url: '/compute/ner_chem/',
    tpl: 'api',
    body: true,
    transformRequest(params, opt) {
      return params
    },
  },
  nerNewsCn: {
    method: 'post',
    url: '/compute/ner_news_cn/',
    tpl: 'api',
    body: true,
    transformRequest(params, opt) {
      return params
    },
  },
  kwdHelperEn: {
    method: 'post',
    url: '/compute/kwd_helper_en/',
    tpl: 'api',
    body: true,
    transformRequest(params, opt) {
      return params
    },
  },
  kwdHelperCn: {
    method: 'post',
    url: '/compute/kwd_helper_cn/',
    tpl: 'api',
    body: true,
    transformRequest(params, opt) {
      return params
    },
  },
  cnameParserCn: {
    method: 'post',
    url: '/compute/cname_parser_cn/',
    tpl: 'api',
    body: true,
    transformRequest(params, opt) {
      return params
    },
  },
  transTitleCnEn: {
    method: 'post',
    url: '/compute/trans_title_cnen/',
    tpl: 'api',
    body: true,
    transformRequest(params, opt) {
      return params
    },
  },
  unitDetectCn: {
    method: 'post',
    url: '/compute/unit_detect_cn/',
    tpl: 'api',
    body: true,
    transformRequest(params, opt) {
      return params
    },
  },
  transAbstrCnen: {
    method: 'post',
    url: '/compute/trans_abstr_cnen/',
    tpl: 'api',
    body: true,
    transformRequest(params, opt) {
      return params
    },
  },
  imageExtract: {
    method: 'post',
    url: '/compute/image_extract/',
    tpl: 'api',
    body: true,
    transformRequest(params, opt) {
      return params
    },
  },
})

