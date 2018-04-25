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
  searchCompany: {
    url: '/company/simple/search',
    tpl: 'apiData',
    transformRequest(params, opt) {
      return params
    },
  },
  getCompany: {
    url: '/company',
    tpl: 'apiData',
    transformRequest(params, opt) {
      return params
    },
  },
  getCompanyShareholder: {
    url: '/company/shareholder',
    tpl: 'apiData',
    transformRequest(params, opt) {
      return params
    },
  },
  getCompanyStaff: {
    url: '/company/staff',
    tpl: 'apiData',
    transformRequest(params, opt) {
      return params
    },
  },
  getCompanyInvestment: {
    url: '/company/investment',
    tpl: 'apiData',
    transformRequest(params, opt) {
      return params
    },
  },
  getCompanyIndustry: {
    url: '/company/industry',
    tpl: 'apiData',
    transformRequest(params, opt) {
      return params
    },
  },
  getCompanyChange: {
    url: '/company/change',
    tpl: 'apiData',
    transformRequest(params, opt) {
      return params
    },
  },
  getCompanyBranch: {
    url: '/company/branch',
    tpl: 'apiData',
    transformRequest(params, opt) {
      return params
    },
  },
  searchAgency: {
    url: '/agency/simple/search',
    tpl: 'apiData',
    transformRequest(params, opt) {
      return params
    },
  },
  getAgency: {
    url: '/agency',
    tpl: 'apiData',
    transformRequest(params, opt) {
      return params
    },
  },
  getAgencyPatent: {
    url: '/agency/patent',
    tpl: 'apiData',
    transformRequest(params, opt) {
      return params
    },
  },
  getAgencyAgent: {
    url: '/agency/agent/',
    tpl: 'apiData',
    transformRequest(params, opt) {
      opt.url += params.agent_id
    },
  },
  searchTrademark: {
    url: '/trademark/simple/search',
    tpl: 'apiData',
    transformRequest(params, opt) {
      return params
    },
  },
  getTrademark: {
    url: '/trademark',
    tpl: 'apiData',
    transformRequest(params, opt) {
      return params
    },
  },
  getLocationMapping: {
    url: '/statistic/locations/mapping',
    tpl: 'apiData',
    transformRequest(params, opt) {
      return params
    },
  },
  getValuablePatents: {
    url: '/statistic/patents/valuable',
    tpl: 'apiData',
    transformRequest(params, opt) {
      return params
    },
  },
  getPatentsValueDimensions: {
    url: '/statistic/patents/dimensions/value',
    tpl: 'apiData',
    transformRequest(params, opt) {
      return params
    },
  },
  getPatentsTypeDimensions: {
    url: '/statistic/patents/dimensions/type',
    tpl: 'apiData',
    transformRequest(params, opt) {
      return params
    },
  },
  getPatentsStatusDimensions: {
    url: '/statistic/patents/dimensions/status',
    tpl: 'apiData',
    transformRequest(params, opt) {
      return params
    },
  },
  getPatentsLegalDimensions: {
    url: '/statistic/patents/dimensions/legal',
    tpl: 'apiData',
    transformRequest(params, opt) {
      return params
    },
  },
  getPatentsFamilyDimensions: {
    url: '/statistic/patents/dimensions/family',
    tpl: 'apiData',
    transformRequest(params, opt) {
      return params
    },
  },
  getIndustryPatentsValue: {
    url: '/statistic/industries/patents/value',
    tpl: 'apiData',
    transformRequest(params, opt) {
      return params
    },
  },
  getIndustryPatentsCount: {
    url: '/statistic/industries/patents/count',
    tpl: 'apiData',
    transformRequest(params, opt) {
      return params
    },
  },
})

