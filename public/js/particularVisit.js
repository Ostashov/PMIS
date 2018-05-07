$("#finish-visit-btn").click(function() {
  var visitId = $(this).data("visitId");
  alert(visitId);
  $.ajax({
    url: "./api/visits:" + visitId + "/finish",
    type: "POST",
    data: { id: visitId },
    success: function(result) {
      window.location.href = "/visit";
    },
    dataType: "json"
  });
});
