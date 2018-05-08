export default {
  desc: 'This series of APIs provide power to get patent IDs with search terms (e.g. the applicant’s name, patent title and patent public number). Consequently, with the patent ID, multidimensional information of a patent can be retrieved, such as patent value, legal information, description, claim, and citation information.',
  notice: 'Enter any keywords to query the patent ID, the date format is: yyyyMMdd',
  input: {
    applicant: 'Applicant',
    patentTitle: 'Title',
    applyStartDate: 'Apply start date',
    applyEndDate: 'Apply end date',
    publicStartDate: 'Public start date',
    publicEndDate: 'Public end date',
    publicNo: 'Public number',
    applyNo: 'Apply number',
    IPCCode : 'IPC code',
  },
  table: {
    patentVal: 'Patent valuation',
    patentLegalInfo: 'Patent legal information',
    patentDesc: 'Patent description',
    patentClaim: 'Patent claim',
    patentCitation: 'Patent citation',
  },
  patentTitleInput: 'electronic',
}
