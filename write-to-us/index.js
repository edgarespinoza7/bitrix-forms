document.getElementById('leadForm').addEventListener('submit', async function (e) {

    e.preventDefault(); // Prevent default form submission
    const privacyPolicyCheckbox = document.getElementById('privacyPolicy');
  
    if (!privacyPolicyCheckbox.checked) {
      alert('You must agree to the Privacy Policy and Terms of Service to continue.');
      return; // Stop submission
    }
  
    // Collect form data
    const formData = new FormData(e.target);
  
      // Prepare the data object for Bitrix
    const data = {
      fields: {
        TITLE: `Have questions? Write to us - FORM`,
        NAME: formData.get('name'),
        EMAIL: [{ VALUE: formData.get('email'), VALUE_TYPE: 'WORK' }],
        PHONE: [{ VALUE: formData.get('phone'), VALUE_TYPE: 'WORK' }],
        COMMENTS: formData.get('comments'),
      },
      params: { REGISTER_SONET_EVENT: 'Y' },
    };
  
    console.log('Data being sent to Bitrix:', JSON.stringify(data));
  
    // Bitrix24 webhook URL
    const webhookUrl = `https://b24-n7l84s.bitrix24.eu/rest/83/c22p491wx673zg5x/crm.lead.add.json?`;
  
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
  
      if (result.result) {
        console.log('Lead created successfully!');
        e.target.reset(); // Clear the form
        // Redirect to another webpage
        window.location.href = 'https://bcnsunlight.com/thank-you/';
      } else {
        console.error('Error creating lead:', result);
        alert('Failed to create lead. Check the console for details.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while submitting the form.');
    }
  });
  
  