function myFunc() {
  // Open a form by ID and log the responses to each question.
  var form = FormApp.openById("1hIh-1Lzyh8TBkRZcGseHEfib5LVdq10-0hcuiQclo9M");
  var formResponses = form.getResponses();
  for (var i = 0; i < formResponses.length; i++) {
    var formResponse = formResponses[i];
    var itemResponses = formResponse.getItemResponses();
    for (var j = 0; j < itemResponses.length; j++) {
      var itemResponse = itemResponses[j];
      Logger.log(
        'Response #%s to the question "%s" was "%s"',
        (i + 1).toString(),
        itemResponse.getItem().getTitle(),
        itemResponse.getResponse()
      );
    }
  }
}
