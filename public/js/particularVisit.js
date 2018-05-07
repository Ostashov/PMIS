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
  if (window.confirm("Вы действительно хотите отменить приём?")) {
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
  }
});

$(document).on("click", ".sidebar-left .nav-item", function() {
  var section = $(this).data("section");
  $(".sidebar-left .nav-item.active").toggleClass("active");
  $(".visit-section.active").toggleClass("active");
  $(".visit-content #" + section).toggleClass("active");
  $(this).toggleClass("active");
});
