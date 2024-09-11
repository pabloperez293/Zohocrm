const { isLeadValid, requiredFields  } = require('./src/utils/validation');

const axios = require('axios');
const xlsx = require('xlsx');

const accessToken = '1000.37ee714c3e1aaa142faabc773ff6e70b.928f502431e16c1d289350de59946569'; 
const baseUrl = 'https://www.zohoapis.com/crm/v5/Leads';

// Leer y filtrar el archivo XLSX
const workbook = xlsx.readFile('Leads.xlsx');
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const Leads = xlsx.utils.sheet_to_json(worksheet);

// Función para verificar si un lead está parcialmente completo
const isLeadIncomplete = lead => {
  return requiredFields.some(field => lead[field]) && !requiredFields.every(field => lead[field]);
};

// Separar leads en tres categorías
const completeLeads = [];
const incompleteLeads = [];
const invalidLeads = [];

Leads.forEach(lead => {
  if (isLeadValid(lead)) {
    completeLeads.push(lead); // Leads que están completos y válidos
  } else if (isLeadIncomplete(lead)) {
    incompleteLeads.push(lead); // Leads con algunos campos requeridos pero no todos
  } else {
    invalidLeads.push(lead); // Leads completamente vacíos o no válidos
  }
});

// Mostrar resultados de la clasificación
console.log('Leads completos:', completeLeads);
console.log('Leads incompletos:', incompleteLeads);
console.log('Leads no válidos:', invalidLeads);


// Filtro Leads 
const validLeads = Leads.filter(isLeadValid);

// En busqueda del error - era porque toma todos los valores erronos
// const invalidLeads = Leads.filter(lead => !isLeadValid(lead));
// console.log("Leads válidos:", validLeads);
// console.log("Leads no válidos:", invalidLeads);

// Crear Leads en Zoho CRM
const createLeads = async (Leads) => {
  try {
    const response = await axios.post(
      baseUrl,
      { data: Leads },
      { headers: { Authorization: `Zoho-oauthtoken ${accessToken}` } }
    );
    console.log('Leads creados:', response.data);
  } catch (error) {
    console.error('Error al crear Leads:', error.response.data);
  }
};

if (completeLeads.length > 0) {
  createLeads(completeLeads);
} else {
  console.error('No hay Leads completos para enviar');
}

