const requiredFields = ['First_Name', 'Last_Name', 'Company', 'Title', 'Email', 'Lead_Source', 'Lead_Status'];

const isLeadValid = lead => requiredFields.every(field => lead[field]);

module.exports = { isLeadValid, requiredFields }; // Exportar también requiredFields
