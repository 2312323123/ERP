function sendPostRequest(responsesArray) {
  const token = "REPLACE_THIS_WITH_YOUR_TOKEN_FROM_SURVEY_SETTINGS";

  const url = "https://erp.best.krakow.pl/api/surveys/send-survey";
  const payload = {
    responses: responsesArray,
  };
  const options = {
    method: "POST",
    contentType: "application/json",
    payload: JSON.stringify(payload),
    headers: {
      Authorization: "Bearer " + token,
    },
    muteHttpExceptions: true, // optional: ignore HTTP exceptions
  };

  try {
    // make the request
    const response = UrlFetchApp.fetch(url, options);

    // Log the response for debugging purposes
    Logger.log(response.getContentText());

    // handle the response status code
    const responseCode = response.getResponseCode();
    if (responseCode === 200) {
      Logger.log("POST request successful!");
    } else {
      Logger.log("Error: " + responseCode);
    }
  } catch (error) {
    Logger.log("Error: " + error.message);
  }
}
