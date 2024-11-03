function onFormSubmit(e) {
  // Replace with your Google Sheets ID (found in the spreadsheet URL)
  const spreadsheetId = "1QdG-oPHBv7ITXvr_E-mFyQwQxMGDal2OlaXuXEOESM4";

  // Open the spreadsheet by ID and select the first sheet
  const sheet = SpreadsheetApp.openById(spreadsheetId).getSheets()[0];

  // Initialize an empty array for form data
  let formData = [];
  if (e && e.response) {
    // Extract answers from the form response
    const itemResponses = e.response.getItemResponses();
    const form = FormApp.getActiveForm(); // Get the active form
    const items = form.getItems(); // Get all form items (questions, section breaks, etc.)

    // Loop through each item and create JSON objects
    items.forEach((item, index) => {
      const questionText = item.getTitle(); // The question text
      const itemType = item.getType(); // The type of the item
      let answer = null; // Default answer to null

      // Check if the response exists and retrieve the answer
      const response = itemResponses[index];
      if (response) {
        // Handle different item types
        if (
          itemType === FormApp.ItemType.GRID ||
          itemType === FormApp.ItemType.CHECKBOX_GRID
        ) {
          answer = response.getResponses() || []; // Get all responses as an array or empty array
        } else {
          answer = response.getResponse(); // Get the user's answer
        }
      }

      // Create a JSON object and push it to the array
      const jsonObject = {
        question: questionText,
        type: itemType,
        answer: answer || null, // Ensure answer is null if empty
      };

      formData.push(jsonObject); // Push the JSON object to the array
    });
  } else {
    // Use test data if no form submission data is available
    const testData = [
      { question: "Test Question 1", type: "TEXT", answer: "Test Answer 1" },
      { question: "Test Question 2", type: "TEXT", answer: null }, // Example of null answer
      { question: "Test Question 3", type: "GRID", answer: [] }, // Example of empty array for grid
      { question: "Test Question 4", type: "CHECKBOX_GRID", answer: null }, // Example of null answer for checkbox grid
    ];
    formData = testData; // Directly use test data objects
  }

  // Convert the formData array to a JSON string
  const jsonArrayString = JSON.stringify(formData);

  // Save the JSON array string to the first cell A1
  sheet.getRange("A1").setValue(jsonArrayString);
}

function logFormQuestionsAndTypes() {
  // Open the active form
  const form = FormApp.getActiveForm();

  // Get all form items (questions, section breaks, etc.)
  const items = form.getItems();

  // Loop through each item and log the question and its type
  items.forEach((item) => {
    const questionText = item.getTitle(); // The question text
    const itemType = item.getType(); // The type of the item

    Logger.log(`Question: ${questionText}, Type: ${itemType}`);
  });
}
