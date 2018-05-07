export default {
  desc: '通过企业组织机构编号、申请人名称或者商标名称等检索词获取相关商标ID，并使用ID查询到商标名称和代理人等信息',
  notice: '输入任意检索词查询商标ID',
  input: {
    companyOrgNo: '企业组织机构编号',
    companyRegNo: '企业注册编号',
    applicantName: '申请人名称',
    applicantAddr: '申请人地址',
    trademarkName: '商标名称',
    trademarkRegNo: '商标注册编号',
    trademarkApplicationCountry: '商标申请国家',
    trademarkNice: '商标尼斯分类号',
    trademarkApplicationNo: '商标申请编号',
  },
  table: {
    trademarkName: '商标名称',
    agent: '代理人',
  },
  trademarkNameInput: '加多宝',
}
