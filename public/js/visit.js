// method="POST" action="api/patient/new"

$("#addPatientFormButton").click(function() {
  var form = $("#addPatientForm");
  console.log(form.serialize());
  $("#patientFirstnameCheckModal").text($("#inputAddPatientFirstname").val());
  $("#patientLastnameCheckModal").text($("#inputAddPatientLastname").val());
  $("#patientBirthdateCheckModal").text(
    $("#addPatientBirthDay").val() +
      "." +
      $("#addPatientBirthMonth").val() +
      "." +
      $("#addPatientBirthYear").val()
  );
});
