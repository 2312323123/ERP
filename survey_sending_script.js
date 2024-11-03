function onFormSubmit(e) {
  // Replace with your Google Sheets ID (found in the spreadsheet URL)
  const spreadsheetId = "1QdG-oPHBv7ITXvr_E-mFyQwQxMGDal2OlaXuXEOESM4";
  
  // Open the spreadsheet by ID and select the first sheet
  const sheet = SpreadsheetApp.openById(spreadsheetId).getSheets()[0];
  
  // Check if 'e' and 'e.response' exist
  let formData = [];
  if (e && e.response) {
    // Extract answers from the form response
    const itemResponses = e.response.getItemResponses();
    formData = itemResponses.map(item => item.getResponse()); // Collects each answer in an array
  } else {
    // Use test data if no form submission data is available
    formData = ["Test Answer 1", "Test Answer 2", "Test Answer 3"];
  }

  // Save form responses to the first row starting from A1
  sheet.getRange(1, 1, 1, formData.length).setValues([formData]);
}
