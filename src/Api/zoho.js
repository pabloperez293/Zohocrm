const xlsx = require('xlsx');

// Se carga el archivo 
const workbook = xlsx.readFile('leads.xlsx'); 
const sheetName = workbook.SheetNames[0]; 
const worksheet = workbook.Sheets[sheetName];

// Conversion 
const leads = xlsx.utils.sheet_to_json(worksheet);

// Filtro los leads 
const filteredLeads = leads.filter(lead => 
    lead.FirstName && lead.LastName && lead.Company && lead.Email && lead.LeadSource && 
    lead.LeadStatus
  );

  console.log('Leads filtrados:', filteredLeads);