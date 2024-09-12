const { isLeadValid, isLeadIncomplete } = require('../utils/validation');

describe('Lead Validation', () => {
  test('should return true for a valid lead', () => {
    const validLead = {
      First_Name: 'John',
      Last_Name: 'Doe',
      Company: 'Company Inc',
      Title: 'CEO',
      Email: 'john.doe@example.com',
      Lead_Source: 'Website',
      Lead_Status: 'New',
    };
    expect(isLeadValid(validLead)).toBe(true);
  });

  test('should return false for an incomplete lead', () => {
    const incompleteLead = {
      First_Name: 'John',
      Last_Name: '',
      Company: 'Company Inc',
      Title: 'CEO',
      Email: '',
      Lead_Source: 'Website',
      Lead_Status: 'New',
    };
    expect(isLeadIncomplete(incompleteLead)).toBe(true);
    expect(isLeadValid(incompleteLead)).toBe(false);
  });
});
