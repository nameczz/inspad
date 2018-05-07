export default {
  desc: '通过公司名称、组织机构编码或者注册编码获取相关企业ID，并使用ID查询到企业名称、主要人员、股东详情、对外投资、变更和分支机构等信息',
  notice: '输入任意检索词查询企业ID',
  input: {
    companyName: '公司名称',
    orgNo: '组织机构编码',
    regNo: '注册编码',
  },
  table: {
    companyName: '公司名称',
    staff: '企业主要人员',
    shareholder: '企业股东详情',
    investment: '企业对外投资',
    change: '企业变更',
    branch: '企业分支机构',
  },
  companyNameInput: '阿里巴巴(中国)有限公司',
  changeText: '<b>{name}</b> 于 {date}<br>变更前： {from}<br>变更后： {to}',
}
