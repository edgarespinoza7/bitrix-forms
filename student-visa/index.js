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
    const selectedCityName = formData.get("city");
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
    const selectedSpanishLevelKey = formData.get("spanishLevel");
    const selectedSpanishLevelId = spanishLevelMapping[selectedSpanishLevelKey];

    if (!selectedSpanishLevelId) {
      alert("Invalid Spanish level selection. Please try again.");
      return;
    }

    // Map course durations to the Bitrix enumeration IDs
    const courseDurationMapping = {
      "8-months": 2187, // 6 + 2 months of vacation (8 months)
      "9-months": 2189, // 9 months
      "12-months-vacation": 2191, // 9 months + 3 months of vacation (12 months)
      "12-months": 2193, // 12 months
      other: 2195, // Other
    };

    const selectedDurationKey = formData.get("courseDuration"); // Single value
    const selectedDurationId = courseDurationMapping[selectedDurationKey];

    if (!selectedDurationId) {
      alert("Please select a course duration.");
      console.log(selectedDurationKey);
      return;
    }

    // Get the approximate start date
    const startDate = formData.get("startDate");
    if (!startDate) {
      alert("Please select the approximate start date of the course.");
      return;
    }

    // Get the nationality
    const nationality = formData.get("nationality");
    if (!nationality) {
      alert("Please enter your nationality.");
      return;
    }

    // Get the PROMOCODE
    const promocode = formData.get("promocode") || "N/A"; // Default to "N/A" if no promocode is entered

    // Prepare the data object for Bitrix
    const data = {
      fields: {
        TITLE: `WEB FORM - Student Visa Request`,
        NAME: formData.get("name"),
        EMAIL: [{ VALUE: formData.get("email"), VALUE_TYPE: "WORK" }],
        PHONE: [{ VALUE: formData.get("phone"), VALUE_TYPE: "WORK" }],
        UF_CRM_1718892306754: selectedCityId, // City ID
        UF_CRM_1736502434: selectedSpanishLevelId, // Spanish Level ID
        UF_CRM_1737971459: selectedDurationId, // Course Duration ID
        UF_CRM_1737971532: startDate, // Start Date mapped to Bitrix field
        UF_CRM_1737973672: nationality, // Nationality
        UF_CRM_1737971574: promocode, // PROMOCODE
      },
      params: { REGISTER_SONET_EVENT: "Y" },
    };

    console.log("Data being sent to Bitrix:", JSON.stringify(data));

    // Bitrix24 webhook URL
    const webhookUrl = `https://b24-n7l84s.bitrix24.eu/rest/83/c22p491wx673zg5x/crm.lead.add.json`;

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
