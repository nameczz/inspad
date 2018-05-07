export default {
  desc: 'Get related company IDs by company name, organization number, or registration number, and use the ID to find out the company name, staffs, shareholders, investment, change, and branch information.',
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
