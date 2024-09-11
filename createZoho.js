const { loadLeadsFromFile, classifyLeads } = require('./src/services/leadServices');
const { createLeads } = require('./src/Api/zoho');

// Cargar leads desde el archivo
const leads = loadLeadsFromFile();
// Clasificar los leads
const { completeLeads, incompleteLeads, invalidLeads } = classifyLeads(leads);

// Mostrar los resultados de la clasificación
console.log('Leads completos:', completeLeads);
console.log('Leads incompletos:', incompleteLeads);
console.log('Leads no válidos:', invalidLeads);

// Crear leads completos en Zoho CRM
if (completeLeads.length > 0) {
  createLeads(completeLeads).then((response) => {
    console.log('Leads creados en Zoho CRM:', response);
  });
} else {
  console.error('No hay Leads completos para enviar.');
}