var formGroups = {
  bodyParameters: {
    html:
      "<h6 class='form-section-title'>Параметры тела</h6>" +
      "<div class='form-row' id='form-bodyParameters'>" +
      "<div class='form-group col-md-4'>" +
      "<label for='height'>Рост</label>" +
      "<input class='form-control' id='height' name='height' placeholder='см'>" +
      "</div>" +
      "<div class='form-group col-md-4'>" +
      "<label for='weight'>Вес</label>" +
      "<input class='form-control' id='weight' name='weight' placeholder='кг'>" +
      "</div>" +
      "<div class='form-group col-md-4'>" +
      "<label for='waist'>Обхват талии</label>" +
      "<input class='form-control' id='waist' name='waist' placeholder='см'>" +
      "</div>" +
      "</div>"
  },
  breath: {
    html:
      "<h6 class='form-section-title'>Дыхание</h6>" +
      "<div class='form-row' id='form-breath'>" +
      "<div class='form-group col-md-2'>" +
      "<label for='dyspnea'>Одышка</label>" +
      "<div class='form-check'>" +
      "<input class='form-check-input' type='radio' id='dyspneaYes' name='dyspnea' value='Да' >" +
      "<label class='form-check-label' for='dyspneaYes'>Да</label>" +
      "</div>" +
      "<div class='form-check'>" +
      "<input class='form-check-input' type='radio' id='dyspneaNo' name='dyspnea' value='Нет' >" +
      "<label class='form-check-label' for='dyspneaNo'>Нет</label>" +
      "</div>" +
      "</div>" +
      "<div class='form-group col-md-10'>" +
      "<label for='dyspneaDescription'>Описание</label>" +
      "<textarea class='form-control' name='dyspneaDescription' id='dyspneaDescription' rows='3' placeholder='Описание'></textarea>" +
      "</div>" +
      "</div>"
  },
  pressure: {
    html:
      "<h6 class='form-section-title'>Давление</h6>" +
      "<div class='form-row' id='form-pressure'>" +
      "<div class='form-group col-md-4'>" +
      "<label for='pressureSAD'>САД</label>" +
      "<input class='form-control' id='pressureSAD' name='pressureSAD' >" +
      "</div>" +
      "<div class='form-group col-md-4'>" +
      "<label for='pressureDAD'>ДАД</label>" +
      "<input class='form-control' id='pressureDAD' name='pressureDAD' >" +
      "</div>" +
      "<div class='form-group col-md-4'>" +
      "<label for='pressureCHSS'>ЧСС</label>" +
      "<input class='form-control' id='pressureCHSS' name='pressureCHSS' >" +
      "</div>" +
      "</div>"
  },
  habits: {
    html:
      "<h6 class='form-section-title'>Вредные привычки</h6>" +
      "<div class='form-row' id='form-habits'>" +
      "<div class='form-group col-md-2'>" +
      "<label for='smoking'>Курение</label>" +
      "<div class='form-check'>" +
      "<input class='form-check-input' type='radio' id='smokingYes' name='smoking' value='Да' >" +
      "<label class='form-check-label' for='smokingYes'>Да</label>" +
      "</div>" +
      "<div class='form-check'>" +
      "<input class='form-check-input' type='radio' id='smokingNo' name='smoking' value='Нет' >" +
      "<label class='form-check-label' for='smokingNo'>Нет</label>" +
      "</div>" +
      "</div>" +
      "<div class='form-group col-md-5'>" +
      "<label for='alcohol'>Употребление алкоголя</label>" +
      "<div class='form-check'>" +
      "<input class='form-check-input' type='radio' id='alcoholYes' name='alcohol' value='Да' >" +
      "<label class='form-check-label' for='alcoholYes'>Да</label>" +
      "</div>" +
      "<div class='form-check'>" +
      "<input class='form-check-input' type='radio' id='alcoholNo' name='alcohol' value='Нет' >" +
      "<label class='form-check-label' for='alcoholNo'>Нет</label>" +
      "</div>" +
      "</div>" +
      "</div>"
  },
  ONMK: {
    html:
      "<h6 class='form-section-title'>ОМНК</h6>" +
      "<div class='form-row' id='form-ONMK'>" +
      "<div class='form-group col-md-4'>" +
      "<label for='sufferedStroke'>Перенесённый ОНМК</label>" +
      "<div class='form-check'>" +
      "<input class='form-check-input' type='radio' id='sufferedStrokeYes' name='sufferedStroke' value='Да' >" +
      "<label class='form-check-label' for='sufferedStrokeYes'>Да</label>" +
      "</div>" +
      "<div class='form-check'>" +
      "<input class='form-check-input' type='radio' id='sufferedStrokeNo' name='sufferedStroke' value='Нет' >" +
      "<label class='form-check-label' for='sufferedStrokeNo'>Нет</label>" +
      "</div>" +
      "</div>" +
      "<div class='form-group col-md-4'>" +
      "<label for='numberStroke'>Количество ОНМК</label>" +
      "<input class='form-control' id='numberStroke' name='numberStroke' >" +
      "</div>" +
      "<div class='form-group col-md-4'>" +
      "<label for='typeStroke'>Тип ОНМК</label>" +
      "<input class='form-control' id='typeStroke' name='typeStroke' >" +
      "</div>" +
      "<div class='form-group col-md-6'>" +
      "<label for='dateStroke'>Дата последнего ОНМК</label>" +
      "<input class='form-control' id='dateStroke' name='dateStroke' placeholder='дд.мм.гггг'>" +
      "</div>" +
      "</div>"
  },
  TIA: {
    html:
      "<h6 class='form-section-title'>ТИА</h6>" +
      "<div class='form-row' id='form-TIA'>" +
      "<div class='form-group col-md-6'>" +
      "<label for='TIA'>Перенесённая ТИА</label>" +
      "<div class='form-check'>" +
      "<input class='form-check-input' type='radio' id='TIAYes' name='TIA' value='Да' >" +
      "<label class='form-check-label' for='TIAYes'>Да</label>" +
      "</div>" +
      "<div class='form-check'>" +
      "<input class='form-check-input' type='radio' id='TIANo' name='TIA' value='Нет' >" +
      "<label class='form-check-label' for='TIANo'>Нет</label>" +
      "</div>" +
      "</div>" +
      "<div class='form-group col-md-6'>" +
      "<label for='dateTIA'>Дата последней ТИА</label>" +
      "<input class='form-control' id='dateTIA' name='dateTIA' placeholder='дд.мм.гггг'>" +
      "</div>" +
      "</div>"
  }
};
