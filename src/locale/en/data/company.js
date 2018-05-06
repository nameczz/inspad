export default {
  desc: 'Obtain the relevant company ID by company name, organization code, or registration code, and use the ID to find out the company name, key personnel, shareholders details, outbound investment, change, and branch information.',
  notice: 'Enter any keywords to query the company ID',
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
  changeText: '<b>{name}</b> on {date}<br>from: {from}<br>to: {to}',
}
