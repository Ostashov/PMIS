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
  $(".sidebar-right .sidebar-sticky").removeClass("active");
  if (section == "review") {
    $(".sidebar-right .sidebar-sticky#review-sidebar").addClass("active");
  } else if (section == "diagnosis") {
    $(".sidebar-right .sidebar-sticky#diagnosis-sidebar").addClass("active");
  } else if (section == "prescriptions") {
    $(".sidebar-right .sidebar-sticky#prescriptions-sidebar").addClass(
      "active"
    );
  }
});

$(document).on("click", ".next-visit-section-btn", function() {
  var btn = $(this);
  var nextSection = btn.data("next");
  $(".nav-item[data-section=" + nextSection + "]").click();
});
