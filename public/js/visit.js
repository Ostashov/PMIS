// method="POST" action="api/patient/new"

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

  $.ajax({
    url: "./api/patient/new",
    type: "POST",
    data: newPatientData,
    success: function() {
      alert("POST success");
    },
    dataType: "json"
  });

  window.location.href = "/visit";
});
