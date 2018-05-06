export default {
  desc: '通过申请人名称、专利标题或者专利公开号等检索词获取专利ID，并使用ID查询到专利价值、法律详情、说明书、要求和引用详情等信息',
  notice: '输入任意检索词查询专利ID，日期格式为:yyyyMMdd',
  input: {
    applicant: '申请人名称',
    patentTitle: '专利标题',
    applyStartDate: '专利申请查询开始日期(包含)',
    applyEndDate: '专利申请查询结束日期(包含)',
    publicStartDate: '专利公开查询开始日期(包含)',
    publicEndDate: '专利公开查询结束日期(包含)',
    publicNo: '专利公开号',
    applyNo: '专利申请号',
    IPCCode : '专利IPC编码',
  },
  table: {
    patentVal: '专利价值',
    patentLegalInfo: '专利法律状态',
    patentDesc: '专利说明书',
    patentClaim: '专利要求',
    patentCitation: '专利引用详情',
  },
  patentTitleInput: '电子',
}
