export default {
  desc: 'This series of APIs provide power to get trademark IDs with search terms (e.g. company organization number, applicant name and trademark name). With the company ID, multidimensional information of a company can be retrieved, such as trademark names and agents.',
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
