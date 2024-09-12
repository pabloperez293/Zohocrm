const { classifyLeads } = require('../src/services/leadServices');

describe('Lead Classification', () => {
  test('should classify leads correctly', () => {
    const leads = [
      { First_Name: 'John', Last_Name: 'Doe', Company: 'Company Inc', Title: 'CEO', Email: 'john@example.com', Lead_Source: 'Website', Lead_Status: 'New' },
      { First_Name: '', Last_Name: '', Company: '', Title: '', Email: '', Lead_Source: '', Lead_Status: '' },
      { First_Name: 'Jane', Last_Name: '', Company: 'Another Inc', Title: 'CTO', Email: '', Lead_Source: 'Referral', Lead_Status: 'New' },
    ];

    const { completeLeads, incompleteLeads, invalidLeads } = classifyLeads(leads);

    expect(completeLeads.length).toBe(1);
    expect(incompleteLeads.length).toBe(1);
    expect(invalidLeads.length).toBe(1);
  });
});
