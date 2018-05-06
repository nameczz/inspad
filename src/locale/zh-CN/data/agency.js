export default {
  desc: '通过代理机构编号获取相关代理机构ID，并使用ID查询到代理机构名称、代理机构专利和代理人等信息',
  notice: '输入任意检索词查询代理机构ID',
  input: {
    agencyNo: '代理机构编号',
  },
  table: {
    agencyName: '代理机构名称',
    agencyPatent: '代理机构专利IDs',
    agent: '代理人',
  },
  agencyNumberInput: '11694',
}
