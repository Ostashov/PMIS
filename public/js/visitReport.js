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

function showVisitData(data) {
  var block = $(".main-info div");
  console.log(data);
  data.forEach(function(field) {
    block.append(field.description + ": " + field.value + "<br>");
  });
}
