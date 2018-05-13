$(document).ready(function() {
  var patientId = $("#patient-id-hidden").data("id");
  $.ajax({
    url: "./api/patients:" + patientId + "/getVisits",
    type: "POST",
    data: {
      id: patientId
    },
    success: function(result) {
      showLastVisits(result);
    },
    dataType: "json"
  });
});

function showLastVisits(data) {
  var list = $("#list-of-visits");
  list.html("");
  data.forEach(function(visit) {
    list.append(liVisit(visit));
  });
  console.log(data);
}

function getDateTime(date) {
  var dateMs = new Date(Date.parse(date));
  // clickDttm = clickDttm.();
  var dateStr =
    ("0" + dateMs.getDate()).slice(-2) +
    "." +
    ("0" + (dateMs.getMonth() + 1)).slice(-2) +
    "." +
    dateMs.getFullYear();
  var timeStr = dateMs.getHours() + ":" + dateMs.getMinutes();
  return [dateStr, timeStr];
}

function liVisit(visit) {
  if (new Date(Date.parse(visit.end_dttm)).getFullYear() != 5999) {
    return (
      "<li>" +
      getDateTime(visit.start_dttm)[0] +
      ", " +
      visit.specialist_lastname +
      " " +
      visit.specialist_firstname +
      " " +
      "<span class='badge badge-success'>Окончен</span> " +
      "</br>" +
      "<a href='/visit:" +
      visit.id +
      "' class='btn btn-outline-secondary btn-sm' target='_blank' >Посмотреть отчёт</a>" +
      "</li>"
    );
  } else {
    return (
      "<li>" +
      getDateTime(visit.start_dttm)[0] +
      ", " +
      visit.specialist_lastname +
      " " +
      visit.specialist_firstname +
      "</a> <span class='badge badge-danger'>Не окончен</span></li>"
    );
  }
}
