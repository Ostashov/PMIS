$(document).ready(function() {
  var visitId = $("#visit-id-hidden").data("id");
  $.ajax({
    url: "./api/visits:" + visitId + "/report",
    type: "POST",
    data: {
      id: visitId
    },
    success: function(result) {
      showVisitData(result);
    },
    dataType: "json"
  });
});

$("#download-report").click(function() {
  var visitId = $(this).data("id");
  window.open("./api/visits:" + visitId + "/downloadReport");
});

function showVisitData(data) {
  console.log(data);
  data.forEach(function(field) {
    if (field.name == "anamnesisDuration") {
      $("." + field.section + "-info div").append(
        field.description + ": " + field.value + " "
      );
    } else if (field.name == "anamnesisDurationDimension") {
      $("." + field.section + "-info div").append("(" + field.value + ")<br>");
    } else {
      $("." + field.section + "-info div").append(
        field.description + ": " + field.value + "<br>"
      );
    }
  });
}
