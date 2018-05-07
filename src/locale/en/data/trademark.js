export default {
  desc: 'Get related trademark IDs by search keywords such as company organization number, applicant name, or trademark name, and use IDs to find out information such as trademark names and agents.',
  notice: 'Enter any keywords to search the trademark ID',
  input: {
    companyOrgNo: 'Company organization number',
    companyRegNo: 'Company registration number',
    applicantName: 'Applicant name',
    applicantAddr: 'Applicant address',
    trademarkName: 'Trademark name',
    trademarkRegNo: 'Trademark registration number',
    trademarkApplicationCountry: 'Trademark application country',
    trademarkNice: 'Trademark Nice Classification',
    trademarkApplicationNo: 'Trademark application number',
  },
  table: {
    trademarkName: 'Trademark name',
    agent: 'Agent',
  },
  trademarkNameInput: 'Apple',
}
