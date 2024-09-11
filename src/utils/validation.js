const requiredFields = ['First_Name', 'Last_Name', 'Company', 'Title', 'Email', 'Lead_Source', 'Lead_Status'];

const isLeadValid = (lead) => requiredFields.every((field) => lead[field]);

const isLeadIncomplete = (lead) =>
  requiredFields.some((field) => lead[field]) && !requiredFields.every((field) => lead[field]);

module.exports = { isLeadValid, isLeadIncomplete, requiredFields };
