export default {
  desc: 'This series of APIs provide power to get company IDs with search terms (e.g. company name, organization number and registration number). With the company ID, multidimensional information of a company can be retrieved, such as the company name, staffs, shareholders, investment, change, and branch information.',
  notice: 'Enter any keywords to search the company ID',
  input: {
    companyName: 'Company name',
    orgNo: 'Organization number',
    regNo: 'Registration number',
  },
  table: {
    companyName: 'Company name',
    staff: 'Staff',
    shareholder: 'Shareholder',
    investment: 'Investment',
    change: 'Company change',
    branch: 'Branch',
  },
  companyNameInput: '阿里巴巴(中国)有限公司',
  changeText: '<b>{name}</b> on {date}<br>from: {from}<br>to: {to}',
}
