// [survey script] adsf
function myFunc() {
  // Open a form by ID and log the responses to each question.
  var form = FormApp.openById("1hIh-1Lzyh8TBkRZcGseHEfib5LVdq10-0hcuiQclo9M");
  var formResponses = form.getResponses();
  for (var i = 0; i < formResponses.length; i++) {
    // this I can work on
    var formResponse = formResponses[i];

    const form = FormApp.getActiveForm(); // Get the active form
    const items = form.getItems(); // Get all items in the form
    const itemResponses = formResponse.getItemResponses(); // Get the item responses

    const responseArray = items.map((item) => {
      const itemResponse = itemResponses.find(
        (response) => response.getItem().getId() === item.getId()
      );
      return {
        index: items.indexOf(item), // Get the actual question index
        question: item.getTitle(),
        answer: itemResponse ? itemResponse.getResponse() : null, // Handle case where there's no response
      };
    });

    Logger.log(JSON.stringify(responseArray));

    // const form = FormApp.getActiveForm();
    // const items = form.getItems();
    // const formData = items.map((item) => ({
    //   question: item.getTitle(),
    //   type: item.getType(),
    // }));

    // Logger.log(JSON.stringify(formData));

    // end
  }
}
