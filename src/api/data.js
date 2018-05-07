import {mapApi} from '@/axios-help'
export default mapApi({
  searchPatent: {
    url: '/patent/simple/search',
    transformRequest(params, opt) {
      return params
    },
  },
  getPatentValuation: {
    url: '/patent/valuation',
    transformRequest(params, opt) {
      return params
    },
  },
  getPatentLegalInfo: {
    url: '/patent/legal',
    transformRequest(params, opt) {
      return params
    },
  },
  getPatentDesc: {
    url: '/patent/description',
    transformRequest(params, opt) {
      return params
    },
  },
  getPatentClaim: {
    url: '/patent/claim',
    transformRequest(params, opt) {
      return params
    },
  },
  getPatentCitation: {
    url: '/patent/citation',
    transformRequest(params, opt) {
      return params
    },
  },
  searchCompany: {
    url: '/company/simple/search',
    transformRequest(params, opt) {
      return params
    },
  },
  getCompany: {
    url: '/company',
    transformRequest(params, opt) {
      return params
    },
  },
  getCompanyShareholder: {
    url: '/company/shareholder',
    transformRequest(params, opt) {
      return params
    },
  },
  getCompanyStaff: {
    url: '/company/staff',
    transformRequest(params, opt) {
      return params
    },
  },
  getCompanyInvestment: {
    url: '/company/investment',
    transformRequest(params, opt) {
      return params
    },
  },
  getCompanyIndustry: {
    url: '/company/industry',
    transformRequest(params, opt) {
      return params
    },
  },
  getCompanyChange: {
    url: '/company/change',
    transformRequest(params, opt) {
      return params
    },
  },
  getCompanyBranch: {
    url: '/company/branch',
    transformRequest(params, opt) {
      return params
    },
  },
  searchAgency: {
    url: '/agency/simple/search',
    transformRequest(params, opt) {
      return params
    },
  },
  getAgency: {
    url: '/agency',
    transformRequest(params, opt) {
      return params
    },
  },
  getAgencyPatent: {
    url: '/agency/patent',
    transformRequest(params, opt) {
      return params
    },
  },
  getAgencyAgent: {
    url: '/agency/agent/',
    transformRequest(params, opt) {
      opt.url += params.agent_id
    },
  },
  searchTrademark: {
    url: '/trademark/simple/search',
    transformRequest(params, opt) {
      return params
    },
  },
  getTrademark: {
    url: '/trademark',
    transformRequest(params, opt) {
      return params
    },
  },
  getLocationMapping: {
    url: '/statistic/locations/mapping',
    transformRequest(params, opt) {
      return params
    },
  },
  getValuablePatents: {
    url: '/statistic/patents/valuable',
    transformRequest(params, opt) {
      return params
    },
  },
  getPatentsValueDimensions: {
    url: '/statistic/patents/dimensions/value',
    transformRequest(params, opt) {
      return params
    },
  },
  getPatentsTypeDimensions: {
    url: '/statistic/patents/dimensions/type',
    transformRequest(params, opt) {
      return params
    },
  },
  getPatentsStatusDimensions: {
    url: '/statistic/patents/dimensions/status',
    transformRequest(params, opt) {
      return params
    },
  },
  getPatentsLegalDimensions: {
    url: '/statistic/patents/dimensions/legal',
    transformRequest(params, opt) {
      return params
    },
  },
  getPatentsFamilyDimensions: {
    url: '/statistic/patents/dimensions/family',
    transformRequest(params, opt) {
      return params
    },
  },
  getIndustryPatentsValue: {
    url: '/statistic/industries/patents/value',
    transformRequest(params, opt) {
      return params
    },
  },
  getIndustryPatentsCount: {
    url: '/statistic/industries/patents/count',
    transformRequest(params, opt) {
      return params
    },
  },
})

