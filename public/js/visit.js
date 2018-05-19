// CONTROL ///////////////////////////////////////////////

$("#addPatientFormButton").click(function() {
  // var form = $("#addPatientForm");
  var firstnameVal = $("#inputAddPatientFirstname").val();
  var lastnameVal = $("#inputAddPatientLastname").val();
  var middlenameVal = $("#inputAddPatientMiddlename").val();
  var birthdayVal = $("#addPatientBirthDay").val();
  var birthmonthVal = $("#addPatientBirthMonth").val();
  var birthyearVal = $("#addPatientBirthYear").val();

  var addPatientErrorBlock = $("#addPatientErrorBlock");

  var intRegex = /^\d+$/;

  if (!firstnameVal) {
    addPatientErrorBlock.text("Не заполнено имя").show();
  } else if (!lastnameVal) {
    addPatientErrorBlock.text("Не заполнена фамилия").show();
  } else if (!middlenameVal) {
    addPatientErrorBlock.text("Не заполнено отчество").show();
  } else if (
    !intRegex.test(birthdayVal) ||
    !intRegex.test(birthmonthVal) ||
    !intRegex.test(birthyearVal)
  ) {
    addPatientErrorBlock.text("Не заполнена дата рождения").show();
  } else if (birthmonthVal > 12) {
    addPatientErrorBlock.text("Неверно указан месяц рождения").show();
  } else if (birthyearVal > new Date().getFullYear()) {
    addPatientErrorBlock.text("Неверно указан год рождения").show();
  } else {
    addPatientErrorBlock.text("").hide();
    $("#patientFirstnameCheckModal").text(firstnameVal);
    $("#patientLastnameCheckModal").text(lastnameVal);
    $("#patientMiddlenameCheckModal").text(middlenameVal);
    $("#patientBirthdateCheckModal").text(
      birthdayVal + "." + birthmonthVal + "." + birthyearVal
    );

    $("#addPatientCheckModal").modal();
  }
});

$("#startFirstVisitButton").click(function() {
  $(this).prop("disabled", true);
  var firstnameVal = $("#inputAddPatientFirstname").val();
  var lastnameVal = $("#inputAddPatientLastname").val();
  var middlenameVal = $("#inputAddPatientMiddlename").val();
  var birthdayVal = $("#addPatientBirthDay").val();
  var birthmonthVal = $("#addPatientBirthMonth").val();
  var birthyearVal = $("#addPatientBirthYear").val();

  var newPatientData = {
    firstname: firstnameVal,
    lastname: lastnameVal,
    middlename: middlenameVal,
    birthdate: birthyearVal + "-" + birthmonthVal + "-" + birthdayVal
  };

  var newVisitData = {
    start_dttm: getCurrentDateTime(),
    end_dttm: "5999-12-31 00:00:00",
    isFirst: true,
    deleted_flag: false
  };

  $.ajax({
    url: "./api/patient/new",
    type: "POST",
    data: newPatientData,
    success: function(data) {
      newVisitData.patientId = data.id;
      // alert(JSON.stringify(newVisitData));
      $.ajax({
        url: "./api/users/getSelf",
        type: "POST",
        success: function(data) {
          newVisitData.specialistId = data.id;
          alert(JSON.stringify(newVisitData));
          startNewVisit(newVisitData);
        }
      });
    },
    dataType: "json"
  });
});

$("#searchPatientButton").click(function() {
  var lastname = $("#inputFindLastnamePatient").val();

  if (lastname) {
    $.ajax({
      url: "./api/patients:" + lastname,
      type: "POST",
      success: function(data) {
        console.log(data);
        updateListOfPatients(data);
      }
    });
  } else {
    alert("Введите фамилию");
  }
});

$(".searchPatientForm input").keypress(function(e) {
  var key = e.which;
  if (key == 13) {
    // the enter key code
    $("#searchPatientButton").click();
    return false;
  }
});

$(document).on("click", ".choosePatientBadge", function() {
  var badge = $(this);
  var newVisitData = {
    patientId: badge.data("patientId"),
    start_dttm: getCurrentDateTime(),
    end_dttm: "5999-12-31 00:00:00",
    isFirst: false,
    deleted_flag: false
  };

  $.ajax({
    url: "./api/users/getSelf",
    type: "POST",
    success: function(data) {
      console.log(data);
      newVisitData.specialistId = data.id;
      startNewVisit(newVisitData);
    }
  });
});

function startNewVisit(visitData) {
  // alert(JSON.stringify(visitData));
  $.ajax({
    url: "./api/visit/new",
    type: "POST",
    data: visitData,
    success: function(data) {
      console.log(data);
      window.location.href = "/visit:" + data.id;
    },
    dataType: "json"
  });
}

function getCurrentDateTime() {
  var clickDttm = new Date();
  // clickDttm = clickDttm.();
  clickDttm =
    clickDttm.getFullYear() +
    "-" +
    clickDttm.getMonth() +
    "-" +
    clickDttm.getDate() +
    " " +
    clickDttm.getHours() +
    ":" +
    clickDttm.getMinutes() +
    ":" +
    clickDttm.getSeconds();
  return clickDttm;
}

$(document).ready(function() {
  var specialist_id = $("#user-id__").val();
  $.ajax({
    url: "./api/visits:" + specialist_id + "/getTen",
    type: "POST",
    success: function(data) {
      // console.log(data);
      updateListOfVisits(data);
    }
  });
  $.ajax({
    url: "./api/patients:" + specialist_id + "/getAllBySpecialist",
    type: "POST",
    success: function(data) {
      // console.log(data);
      updateListOfAllPatients(data);
    }
  });
});

// VIEW //////////////////////////////

function updateListOfPatients(data) {
  var ulPatients = $("#listOfPatients");
  ulPatients.html("");
  // $("#listOfPatientsTitle").text("Список найденных пациентов");
  data.forEach(function(patient) {
    // console.info(patient);
    ulPatients.append(
      "<li><a href='/patient:" +
        patient.id +
        "' class='patient-link'>" +
        patient.lastname +
        " " +
        patient.firstname +
        " " +
        patient.middlename +
        "</a>" +
        choosePatientButton(patient.id) +
        "</br>" +
        new Date(Date.parse(patient.birthdate)).getFullYear() +
        " г.р." +
        "</li>"
    );
  });
  $("div.listOfPatients").show("fast");
}

function updateListOfAllPatients(data) {
  var ulPatients = $("#listOfAllPatients");
  ulPatients.html("");
  // $("#listOfPatientsTitle").text("Список найденных пациентов");
  data.forEach(function(patient) {
    // console.info(patient);
    ulPatients.append(
      "<li><a href='/patient:" +
        patient.id +
        "' class='patient-link'>" +
        patient.lastname +
        " " +
        patient.firstname +
        " " +
        patient.middlename +
        // choosePatientButton(patient.id) +
        "</a></br>" +
        new Date(Date.parse(patient.birthdate)).getFullYear() +
        " г.р." +
        "</li>"
    );
  });
}

function updateListOfVisits(data) {
  if (data[0]) {
    $(".listOfVisits .card-body").html("<ul id='listOfVisits' ></ul>");
    var ulVisits = $("#listOfVisits");
    // ulPatients.html("");
    // $("#listOfPatientsTitle").text("Список найденных пациентов");
    data.forEach(function(visit) {
      // console.info(visit);
      ulVisits.append(liVisit(visit));
    });
  } else {
    $(".listOfVisits .card-body").html("Не создано ни одного приёма");
  }
}

function liVisit(visit) {
  var badge = visit.isfirst
    ? "<span class='badge badge-secondary' title='Первичный приём' >1</span>"
    : "";
  if (new Date(Date.parse(visit.end_dttm)).getFullYear() != 5999) {
    return (
      "<li><a href='/patient:" +
      visit.patient_id +
      "' class='patient-link'>" +
      visit.lastname +
      " " +
      visit.firstname +
      " " +
      visit.middlename +
      "</a> <span class='badge badge-success'>Окончен</span> " +
      badge +
      "</br>" +
      "<a href='/visit:" +
      visit.id +
      "' class='btn btn-outline-secondary btn-sm' target='_blank' >Посмотреть протокол</a>" +
      "</li>"
    );
  } else {
    return (
      "<li><a href='/patient:" +
      visit.patient_id +
      "' class='patient-link'>" +
      visit.lastname +
      " " +
      visit.firstname +
      " " +
      visit.middlename +
      "</a> <span class='badge badge-danger'>Не окончен</span> " +
      badge +
      "</br>" +
      "<a href='/visit:" +
      visit.id +
      "' class='btn btn-outline-success btn-sm' >Продолжить приём</a>" +
      "</li>"
    );
  }
}

function choosePatientButton(id) {
  return (
    " <button class='btn btn-outline-success btn-sm choosePatientBadge' data-patient-id='" +
    id +
    "' >Начать приём</button>"
  );
}
