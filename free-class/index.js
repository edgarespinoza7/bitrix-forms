document
  .getElementById("leadForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault(); // Prevent default form submission
    const privacyPolicyCheckbox = document.getElementById("privacyPolicy");

    if (!privacyPolicyCheckbox.checked) {
      alert(
        "You must agree to the Privacy Policy and Terms of Service to continue."
      );
      return; // Stop submission
    }

    // Collect form data
    const formData = new FormData(e.target);

    // Map cities to their corresponding Bitrix IDs
    const cityMapping = {
      Barcelona: 725,
      Valencia: 727,
      Online: 1353,
    };

    // Get the selected city and its corresponding ID
    const selectedCityName = formData.get("city"); // The name attribute in the select element
    const selectedCityId = cityMapping[selectedCityName];

    if (!selectedCityId) {
      alert("Invalid city selection. Please try again.");
      return;
    }

    // Map Spanish Levels to their corresponding Bitrix IDs
    const spanishLevelMapping = {
      "from-scratch": 1979,
      "beginner-a1": 1981,
      "elementary-a2": 1983,
      "intermediate-b1": 1985,
      "upper-intermediate-b2": 1987,
      "advance-c1": 1989,
      unknown: 1991,
    };

    // Get the selected Spanish Level and its corresponding ID
    const selectedSpanishLevelKey = formData.get("spanishLevel"); // The name attribute in the select element
    const selectedSpanishLevelId = spanishLevelMapping[selectedSpanishLevelKey];

    if (!selectedSpanishLevelId) {
      alert("Invalid Spanish level selection. Please try again.");
      return;
    }

    // Map lesson durations to their corresponding Bitrix IDs
    const lessonDurationMapping = {
      "2-hours": 1393,
      "4-hours": 1395,
      "6-hours": 1397,
      "8-hours": 1399,
      "10-hours": 1963,
      "15-hours": 1965,
      "20-hours": 1967,
      unknown: 1969,
    };

    // Get the selected lesson duration and its corresponding ID
    const selectedDurationKey = formData.get("lessonDuration"); // Single value
    const selectedDurationId = lessonDurationMapping[selectedDurationKey];

    if (!selectedDurationId) {
      alert("Please select a lesson duration.");
      return;
    }

    // Prepare the data object for Bitrix
    const data = {
      fields: {
        TITLE: `Free Class Request`,
        NAME: formData.get("name"),
        EMAIL: [{ VALUE: formData.get("email"), VALUE_TYPE: "WORK" }],
        PHONE: [{ VALUE: formData.get("phone"), VALUE_TYPE: "WORK" }],
        UF_CRM_1718892306754: selectedCityId, // Send the City ID
        UF_CRM_1736502434: selectedSpanishLevelId, // Send the Spanish Level ID
        UF_CRM_LEAD_1730885559500: selectedDurationId, // Send the single Lesson Duration ID
      },
      params: { REGISTER_SONET_EVENT: "Y" },
    };

    console.log("Data being sent to Bitrix:", JSON.stringify(data));

    // Bitrix24 webhook URL
    const webhookUrl = `https://b24-n7l84s.bitrix24.eu/rest/83/c22p491wx673zg5x/crm.lead.add.json?`;

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.result) {
        console.log("Lead created successfully!");
        e.target.reset(); // Clear the form
        // Redirect to another webpage
        window.location.href = "https://bcnsunlight.com/thank-you/";
      } else {
        console.error("Error creating lead:", result);
        alert("Failed to create lead. Check the console for details.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting the form.");
    }
  });
