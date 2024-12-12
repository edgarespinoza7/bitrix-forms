document.getElementById('leadForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  const formData = new FormData(e.target);

  const data = {
    fields: {
      TITLE: `Contact Form Submitted`,
      NAME: formData.get('name'),
      EMAIL: [{ VALUE: formData.get('email'), VALUE_TYPE: 'WORK' }],
      PHONE: [{ VALUE: formData.get('phone'), VALUE_TYPE: 'WORK' }],
      COMMENTS: formData.get('comments'),
      UF_CRM_1718892306754: formData.get('city'),
    },
    params: { REGISTER_SONET_EVENT: 'Y' },
  };

  console.log('Data being sent to Bitrix:', JSON.stringify(data));

  const webhookUrl = `https://b24-n7l84s.bitrix24.eu/rest/83/c22p491wx673zg5x/crm.lead.add.json?FIELDS[TITLE]=${data.fields.TITLE}&FIELDS[NAME]=${data.fields.NAME}&FIELDS[EMAIL][0][VALUE]=${data.fields.EMAIL[0].VALUE}&FIELDS[EMAIL][0][VALUE_TYPE]=WORK&FIELDS[PHONE][0][VALUE]=${data.fields.PHONE[0].VALUE}&FIELDS[PHONE][0][VALUE_TYPE]=WORK&FIELDS[UF_CRM_1718892306754]=${data.fields.UF_CRM_1718892306754}`;

  console.log('Webhook URL:', webhookUrl);

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (result.result) {
      console.log('Lead created successfully!');
      e.target.reset();
    } else {
      console.error('Error creating lead:', result);
    }
  } catch (error) {
    console.error('Error:', error);
  }
});

// document.getElementById('leadForm').addEventListener('submit', async function (e) {

//   e.preventDefault(); // Prevent default form submission
//   const privacyPolicyCheckbox = document.getElementById('privacyPolicy');

//   if (!privacyPolicyCheckbox.checked) {
//     alert('You must agree to the Privacy Policy and Terms of Service to continue.');
//     return; // Stop submission
//   }

//   // Collect form data
//   const formData = new FormData(e.target);

//   const data = {
//     fields: {
//       TITLE: `Contact Form Submitted`,
//       NAME: formData.get('name'),
//       EMAIL: [{ VALUE: formData.get('email'), VALUE_TYPE: 'WORK' }],
//       PHONE: [{ VALUE: formData.get('phone'), VALUE_TYPE: 'WORK' }],
//       COMMENTS: formData.get('comments'),
//       UF_CRM_1718892306754: formData.get('city'),
//     },
//     params: { REGISTER_SONET_EVENT: 'Y' },
//   };

//   let formName = data.fields.TITLE
//   let leadName = data.fields.NAME
//   let leadEmail = data.fields.EMAIL[0].VALUE
//   let leadPhone = data.fields.PHONE[0].VALUE
//   let escuela = data.fields.UF_CRM_1718892306754

//   console.log(escuela)

  


//   // Bitrix24 webhook URL
//   const webhookUrl = `https://b24-n7l84s.bitrix24.eu/rest/83/c22p491wx673zg5x/crm.lead.add.json?FIELDS[TITLE]=${formName}&FIELDS[NAME]=${leadName}&FIELDS[EMAIL][0][VALUE]=${leadEmail}&FIELDS[EMAIL][0][VALUE_TYPE]=WORK&FIELDS[PHONE][0][VALUE]=${leadPhone}&FIELDS[PHONE][0][VALUE_TYPE]=WORK&FIELDS[UF_CRM_1718892306754]=${escuela}`;

//   try {
//     const response = await fetch(webhookUrl, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(data),
//     });

//     const result = await response.json();

//     if (result.result) {
//       console.log('Lead created successfully!');
     
//       e.target.reset(); // Clear the form
//       // Redirect to another webpage
//       // window.location.href = 'https://bcnsunlight.com/thank-you/';
//     } else {
//       console.error('Error creating lead:', result);
//       alert('Failed to create lead. Check the console for details.');
//     }
//   } catch (error) {
//     console.error('Error:', error);
//     alert('An error occurred while submitting the form.');
//   }
// });

