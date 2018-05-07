export default {
  desc: 'Get related patent IDs by search terms such as the applicant’s name, patent title, or patent public number, and use the ID to find information such as patent value, legal information, description, claim, and citation information.',
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
