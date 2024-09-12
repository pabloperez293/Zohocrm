const axios = require('axios');
const { accessToken, baseUrl } = require('../../config/config');

// Crear Leads en Zoho CRM
const createLeads = async (leads) => {
  try {
    const response = await axios.post(
      baseUrl,
      { data: leads },
      { headers: { Authorization: `Zoho-oauthtoken ${accessToken}` } }
    );
    return response.data;
  } catch (error) {
    throw{
      response: {
        data: error.response ? error.response.data : { message: 'Unknown error' }
      }
    }
  }
};

// Leer Leads desde Zoho CRM
const getLeads = async () => {
  try {
    const response = await axios.get(baseUrl, {
      headers: { Authorization: `Zoho-oauthtoken ${accessToken}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error al leer Leads:', error.response.data);
  }
};

// Actualizar Leads en Zoho CRM
const updateLeads = async (leadId, data) => {
  try {
    const response = await axios.put(
      `${baseUrl}/${leadId}`,
      { data },
      { headers: { Authorization: `Zoho-oauthtoken ${accessToken}` } }
    );
    return response.data;
  } catch (error) {
    console.error('Error al actualizar Leads:', error.response.data);
  }
};

// Borrar Leads en Zoho CRM
const deleteLead = async (leadId) => {
  try {
    const response = await axios.delete(`${baseUrl}/${leadId}`, {
      headers: { Authorization: `Zoho-oauthtoken ${accessToken}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error al borrar Leads:', error.response.data);
  }
};

module.exports = { createLeads, getLeads, updateLeads, deleteLead };
