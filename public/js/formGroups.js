var formGroups = {
  bodyParameters: {
    html:
      "<div class='form-row' id='form-bodyParameters'>" +
      "<div class='form-group col-md-4'>" +
      "<label for='height'>Рост</label>" +
      "<input class='form-control' id='height' placeholder='см'>" +
      "</div>" +
      "<div class='form-group col-md-4'>" +
      "<label for='weight'>Вес</label>" +
      "<input class='form-control' id='weight' placeholder='кг'>" +
      "</div>" +
      "<div class='form-group col-md-4'>" +
      "<label for='waist'>Обхват талии</label>" +
      "<input class='form-control' id='waist' placeholder='см'>" +
      "</div>" +
      "</div>"
  },
  breath: {
    html:
      "<div class='form-row' id='form-breath'>" +
      "<div class='form-group col-md-2'>" +
      "<label for='dyspnea'>Одышка</label>" +
      "<div class='form-check'>" +
      "<input class='form-check-input' type='radio' id='dyspneaYes' value='yes' >" +
      "<label class='form-check-label' for='dyspneaYes'>Да</label>" +
      "</div>" +
      "<div class='form-check'>" +
      "<input class='form-check-input' type='radio' id='dyspneaNo' value='no' >" +
      "<label class='form-check-label' for='dyspneaNo'>Нет</label>" +
      "</div>" +
      "</div>" +
      "<div class='form-group col-md-10'>" +
      "<label for='dyspneaDescription'>Описание</label>" +
      "<textarea class='form-control' name='yspneaDescription' id='dyspneaDescription' rows='3' placeholder='Описание'></textarea>" +
      "</div>" +
      "</div>"
  }
};
