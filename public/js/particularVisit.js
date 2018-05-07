$("#finish-visit-btn").click(function() {
  var visitId = $(this).data("visitId");
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

$("#delete-visit-btn").click(function() {
  var visitId = $(this).data("visitId");
  $.ajax({
    url: "./api/visits:" + visitId + "/delete",
    type: "POST",
    data: { id: visitId },
    success: function(result) {
      window.location.href = "/visit";
    },
    dataType: "json"
  });
});

$(document).on("click", ".sidebar-left .nav-item", function() {
  $(".sidebar-left .nav-item.active").toggleClass("active");
  $(this).toggleClass("active");
});
