const xlsx = require('xlsx');
const { isLeadValid, isLeadIncomplete } = require('../utils/validation');
const { createLeads, getLeads, updateLeads, deleteLead } = require('../Api/zoho');

// Leer el archivo XLSX
const loadLeadsFromFile = () => {
  const workbook = xlsx.readFile('./data/Leads.xlsx');
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  return xlsx.utils.sheet_to_json(worksheet);
};

// Clasificar los leads en categorías
const classifyLeads = (leads) => {
  const completeLeads = [];
  const incompleteLeads = [];
  const invalidLeads = [];

  leads.forEach((lead) => {
    if (isLeadValid(lead)) {
      completeLeads.push(lead);
    } else if (isLeadIncomplete(lead)) {
      incompleteLeads.push(lead);
    } else {
      invalidLeads.push(lead);
    }
  });

  return { completeLeads, incompleteLeads, invalidLeads };
};

module.exports = { loadLeadsFromFile, classifyLeads };
