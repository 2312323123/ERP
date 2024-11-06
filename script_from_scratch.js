const surveySendingToken = "ZAMIEŃ_NA_SWÓJ_TOKEN"; // Replace with your token
const endpointURL = "https://erp.best.krakow.pl/api/surveys/new-survey";

// function that given a FormResponse returns user answers
function getAnswers(formResponse) {
  const form = FormApp.getActiveForm(); // Get the active form
  const items = form.getItems(); // Get all items in the form
  const itemResponses = formResponse.getItemResponses(); // Get the item responses

  const responseArray = items.map((item) => {
    const itemResponse = itemResponses.find(
      (response) => response.getItem().getId() === item.getId()
    );
    return {
      question: item.getTitle(),
      type: item.getType(),
      answer: itemResponse ? itemResponse.getResponse() : null, // Handle case where there's no response
    };
  });

  return responseArray;
}

// function that takes something and logs it nicely
function logSomething(something) {
  Logger.log(JSON.stringify(something));
}

// function that given something sends it to the url defined at the top
function sendSomething(something) {
  const options = {
    method: "post",
    contentType: "application/json",
    headers: {
      Authorization: `Bearer ${surveySendingToken}`,
    },
    payload: JSON.stringify(something),
  };
  UrlFetchApp.fetch(endpointURL, options);
}

// function that combines the above
function onFormSubmit(e) {
  const formResponse = e.response;
  const answers = getAnswers(formResponse);
  logSomething(answers);
  sendSomething(answers);
}
