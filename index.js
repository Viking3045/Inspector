import  { thresholdMasses }  from "./thresholdMasses.js";
const riskAssessmentList = document.querySelector(".riskAssessmentList")
import { riskAssessmentCriteria } from "./riskAssessmentCriteria.js";
const submitFirstForm = document.querySelector(".submitFirstForm");
const selectDangerousSubstance = document.querySelector(".selectDangerousSubstance");
const title = document.querySelector(".title");
const calculationForm = document.querySelector(".calculationForm");
const amountSubstance = document.querySelector(".amount");
const main = document.querySelector(".main")
const mainIdentification = document.querySelector(".mainIdentification")
const mainRiskAssessment = document.querySelector(".mainRiskAssessment")

selectDangerousSubstance.addEventListener("change", setOutputSubstance);
submitFirstForm.addEventListener("click", submit);
amountSubstance.addEventListener("change", submitAmount)
// console.log("prikol", riskAssessmentCriteria)

//__________________________________________________ІДЕНТИФІКАЦІЯ ОБ'ЄКТА_______________________________________

const name = thresholdMasses.map(function(word) {

  const option = document.createElement("option")
  option.value = `${word.individualNamesOfDangerousSubstances}`
  option.textContent = `${word.individualNamesOfDangerousSubstances}`
  // option.classList = 
  selectDangerousSubstance.append(option)
  // console.log('word',word.individualNamesOfDangerousSubstances );
})




// __МОДАЛЬНЕ ВІКНО ІДЕНТИФІКАЦІЇ
// Отримати модальне вікно
const modalIdentification = document.getElementById("myModalIdentification");

// Отримати кнопку, яка відкриває модальне вікно
const openModalIdentification = document.getElementById("openModalIdentification");

// Отримати елемент <span>, який закриває модальне вікно
const closeIdentification = document.getElementsByClassName("closeIdentification")[0];

// Коли користувач натискає на кнопку, відкрити модальне вікно
openModalIdentification.onclick = function() {
    modalIdentification.style.display = "block";
}

// Коли користувач натискає на <closeIdentification> (x), закрити модальне вікно
closeIdentification.onclick = function() {
    modalIdentification.style.display = "none";
}

// Коли користувач натискає будь-де поза модальним вікном, закрити його
window.onclick = function(event) {
    if (event.target == modalIdentification) {
        modalIdentification.style.display = "none";
    }
      if (event.target == modalActOfInspection) {
          modalActOfInspection.style.display = "none";
      }
      if (event.target == modalNotification) {
        modalNotification.style.display = "none";
    }
    if (event.target == modalActOfInspectionPB) {
      modalActOfInspectionPB.style.display = "none";
  }
  if (event.target == modalActOfInspectionTB) {
    modalActOfInspectionTB.style.display = "none";
} 
if (event.target == modalRiskAssessment) {
  modalRiskAssessment.style.display = "none";
}
}







let obj = {
  amount:0,
  substance: 0,
  counter: 0,
  classForOne: "",
  risk: "", 
  };
  let array = [];
  function submitAmount(event){
    const selectAmount = event.target.value;
    obj.amount = selectAmount;
  }
function setOutputSubstance(event) {
    const selectSubstance = event.target.value;
    obj.substance = selectSubstance;
  }


  function submit() {
    const { substance, amount } = obj;
  
  
    if (substance.length > 1 && amount >=0) {
      
      const objWhichSubstances =  thresholdMasses.find(option => option.individualNamesOfDangerousSubstances === obj.substance)
      const thresholdMassesForOne = objWhichSubstances.thresholdMassNorm
 if (Number(amount) < Number(thresholdMassesForOne.thirdClass)){
  obj.classForOne = "Не відноситься до об’єктів підвищеної небезпеки"
  console.log("Не відноситься до об’єктів підвищеної небезпеки")
 }  else if(Number(thresholdMassesForOne.thirdClass) <= Number(amount)&& Number(amount) < Number(thresholdMassesForOne.secondClass)){ 
  obj.classForOne = "3 клас";
  console.log("3 клас")
 } else if(Number(thresholdMassesForOne.secondClass) <= Number(amount) && Number(amount) < Number(thresholdMassesForOne.firstClass)){ 
 obj.classForOne = "2 клас";
 console.log("2 клас")
 }else if( Number(amount) >= Number(thresholdMassesForOne.firstClass)){ 
 obj.classForOne = "1 клас";
 console.log("1 клас")
 }
 else{
  console.log("Помилка, зверніться будь ласка до адміністратора")
 }

 array.push({ ...obj });








      title.innerHTML = " Небезпечні речовини для розрахунку";
      title.classList = "titlesSubstance";
  
      const item = document.createElement("li");
      const ul = document.createElement("ul");
      ul.classList = "substanceWhoAdd";
      const substance1 = document.createElement("li");
      substance1.classList = "substanceWhoAddItem";
      substance1.textContent = `Небезпечна речовина: ${substance}`;

      const amount1 = document.createElement("li");
      amount1.classList = "amountWhoAddItem";
      amount1.textContent = `Кількість речовини: ${amount}`;
      ul.append(substance1, amount1);

      item.append(ul);
 
      // Створення кнопки для розрахунків
      const submitFinalForm = document.createElement("button");
      submitFinalForm.textContent = "Розрахувати";
      submitFinalForm.type = "button";
      submitFinalForm.style = "padding: 20px";
      submitFinalForm.classList = "submitFinaltForm";
      submitFinalForm.addEventListener("click", disabledFinalFormButton);
      function disabledFinalFormButton() {
        submitFinalForm.disabled = true;
      }

      calculationForm.append(item);

      if (obj.counter !== 1) {
        // secondForm.append(title)
        calculationForm.after(submitFinalForm);
      }
   


      const submitFinaltForm2 = document.querySelector(".submitFinaltForm");
      submitFinaltForm2.addEventListener("click", heightOfCollapse);
  
      //Скидаємо данні форми та очищаємо обєкт
      selectDangerousSubstance.selectedIndex = 0;
      amountSubstance.value =""
      obj.substance = 0;
      obj.amount = 0;
      obj.counter = 1;
    } else {
      alert("Будь ласка заповніть всі поля");
    }
  }



//Функція для фінального розрахунку
function heightOfCollapse (){

   

    //Перебираю класи об'єкта
  const allClassesForOne = array.map((arr) => arr.classForOne);
  let cherry = ""
  const first = allClassesForOne.includes("1 клас")
  if(first === true){
    cherry = "належить до 1 класу небезпечних речовин"
    // console.log("1111", first)
  } else if(first === false){
const second = allClassesForOne.includes("2 клас")
if(second === true){
   cherry = "належить до 2 класу небезпечних речовин"
} else if(second === false){
  const third = allClassesForOne.includes("3 клас")
  if(third ===true){
     cherry = "належить до 3 класу небезпечних речовин"
  } else if(third === false){
    cherry = "не відноситься до об’єктів підвищеної небезпеки"
  }
}
  }
  const finalFirstContainer = document.createElement("div")
  finalFirstContainer.classList = "container"
  const firstTitle = document.createElement("p")
  firstTitle.textContent = `Об'єкт  ${cherry}`
  firstTitle.classList = "firstResult substanceWhoAdd calculationForm"

       // Змінити введені данні ідентифікацію
       const refreshFirstStep = document.createElement("button");
       refreshFirstStep.textContent = "Змінити введені данні";
       refreshFirstStep.type = "button";
       refreshFirstStep.style = "padding: 20px";
       refreshFirstStep.classList = "refreshFirstStep, btn";
       refreshFirstStep.addEventListener("click", refreshFirstStepButton);
       function refreshFirstStepButton() {
        submitFirstForm.disabled = false;
        const firstResult = document.querySelector(".firstResult")
        const submitFinaltForm = document.querySelector(".submitFinaltForm")
        const  refreshFirstStep = document.querySelector(".refreshFirstStep")
       
        firstResult.remove()
        submitFinaltForm.disabled = false;
        refreshFirstStep.remove();
        firstStepEnd.remove()
       }

// кнопка переходу від першого кроку до наступного
const firstStepEnd = document.createElement("button")
      firstStepEnd.textContent = "Перейти до наступних кроків";
      firstStepEnd.type = "button";
      firstStepEnd.style = "padding: 20px"; 
      firstStepEnd.classList = "submitFinaltForm";
      firstStepEnd.addEventListener("click", firstStepEndButton);
      function firstStepEndButton() {
        firstStepEnd.onclick = function() {
           modalIdentification.style.display = "none"
      }
      }


  finalFirstContainer.append(firstTitle)
  finalFirstContainer.append(refreshFirstStep)
  finalFirstContainer.append(firstStepEnd)
  
  mainIdentification.append(finalFirstContainer)
console.log("cherry", cherry)

    submitFirstForm.disabled = true;
}




// _________________________________________________ПОВІДОМЛЕННЯ___________________________________
// __МОДАЛЬНЕ ВІКНО ІДЕНТИФІКАЦІЇ
// Отримати модальне вікно
const modalNotification = document.getElementById("myModalNotification");

// Отримати кнопку, яка відкриває модальне вікно
const openModalNotification = document.getElementById("openModalNotification");

// Отримати елемент <span>, який закриває модальне вікно
const closeNotification = document.getElementsByClassName("closeNotification")[0];

// Коли користувач натискає на кнопку, відкрити модальне вікно
openModalNotification.onclick = function() {
    modalNotification.style.display = "block";
}

// Коли користувач натискає на <closeNotification> (x), закрити модальне вікно
closeNotification.onclick = function() {
    modalNotification.style.display = "none";
}

// Коли користувач натискає будь-де поза модальним вікном, закрити його



const registerForm = document.querySelector(".form");

registerForm.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const notificationInspectorObj = form.elements.notificationInspectorObj.value;
  const notificationObj = form.elements.notificationObj.value;
  const surnamePerson = form.elements.surnamePerson.value;
  const namePerson = form.elements.namePerson.value;
  const middleNamePerson = form.elements.middleNamePerson.value;
  const locationObj = form.elements.locationObj.value;
  const dateStartNotification = form.elements.dateStartNotification.value;
  const dateFinishNotification = form.elements.dateFinishNotification.value;
  const positionOfHeadOfStateTechnologicalAndEnvironmentalSafety = form.elements.positionOfHeadOfStateTechnologicalAndEnvironmentalSafety.value;
  const surnameOfHeadOfStateTechnologicalAndEnvironmentalSafety = form.elements.surnameOfHeadOfStateTechnologicalAndEnvironmentalSafety.value;
  const nameOfHeadOfStateTechnologicalAndEnvironmentalSafety = form.elements.nameOfHeadOfStateTechnologicalAndEnvironmentalSafety.value;
  const middleNameOfHeadOfStateTechnologicalAndEnvironmentalSafety = form.elements.middleNameOfHeadOfStateTechnologicalAndEnvironmentalSafety.value;

  // if (login === "" || password === "") {
  //   return console.log("Please fill in all the fields!");
  // }


  document.querySelector(".submitNotification").onclick = function() {
    // Отримуємо введені дані з textarea
    const data = `
Додаток 3
до Порядку проведення перевірок органами Державної інспекції техногенної безпеки України 











 
(бланк органу Держтехногенбезпеки України)
________________________________________________________________________________

Від ____________ 20__ року № ______ 
________________________________________
${notificationObj}
${surnamePerson,namePerson,middleNamePerson}
${locationObj}


ПОВІДОМЛЕННЯ
про проведення планової перевірки 

На підставі статті 4 Закону України «Про основні засади державного нагляду (контролю) у сфері господарської діяльності», відповідно до Законів України «Про пожежну безпеку» та
 «Про правові засади цивільного захисту» ${notificationInspectorObj} буде здійснено  

перевірку додержання і виконання вимог законодавства у сфері пожежної і техногенної безпеки
${notificationObj}
${surnamePerson,namePerson,middleNamePerson}
${locationObj}
   

Перевірку буде проведено з ${dateStartNotification} по ${dateFinishNotification}.

Відповідно до частини одинадцятої статті 4 Закону України «Про основні засади державного нагляду (контролю) у сфері господарської діяльності» прошу забезпечити присутність керівника (заступника керівника) або уповноваженої особи суб’єкта господарювання або іншого підконтрольного об’єкта __________________________________________________________         
${notificationObj}
${surnamePerson,namePerson,middleNamePerson}
${locationObj}



${positionOfHeadOfStateTechnologicalAndEnvironmentalSafety}
(підпис) 	___________________
${surnameOfHeadOfStateTechnologicalAndEnvironmentalSafety}
${nameOfHeadOfStateTechnologicalAndEnvironmentalSafety}
${middleNameOfHeadOfStateTechnologicalAndEnvironmentalSafety}

Повідомлення, надіслане телефонограмою,
прийнято _____________________________________ ____________ 20__ року.
                          (прізвище, ініціали, посада особи суб’єкта господарювання)

Повідомлення надіслане рекомендованим листом _______________ 20__ року.
 

У разі надіслання повідомлення рекомендованим листом його копія зберігається разом з повідомленням про вручення поштового відправлення.

Повідомлення вручено особисто __________________ ____________ 20__ року.
(прізвище, ініціали, посада керівника/уповноваженої особи суб'єкта господарювання)

    `;

    // Форматуємо дані у форматі HTML для Word
    const blob = new Blob([data], { type: "application/msword;charset=utf-8;fonts=timesNewRoman" });

    // Зберігаємо файл з ім'ям "document.doc"
    saveAs(blob, "document.doc");}
    form.reset();
  }


    // ________Оцінка ступеня ризику___________________________________
  // __МОДАЛЬНЕ ВІКНО Акту проведення перевірки
  // Отримати модальне вікно
  const modalRiskAssessment = document.getElementById("myModalRiskAssessment");
  
  // Отримати кнопку, яка відкриває модальне вікно
  const openModalRiskAssessment = document.getElementById("openModalRiskAssessment");
  
  // Отримати елемент <span>, який закриває модальне вікно
  const closeRiskAssessment = document.getElementsByClassName("closeRiskAssessment")[0];
  
  // Коли користувач натискає на кнопку, відкрити модальне вікно
  openModalRiskAssessment.onclick = function() {
      modalRiskAssessment.style.display = "block";


  
  }
  
  // Коли користувач натискає на <closeRiskAssessment> (x), закрити модальне вікно
  closeRiskAssessment.onclick = function() {
      modalRiskAssessment.style.display = "none";
  }


      // _____________________________________________________________________________________________________________________ПАРТАК___________________________
//       const submitRisk = document.querySelector(".submitRisk")
//       submitRisk.addEventListener("submit", riskFunction)
//   const list = riskAssessmentCriteria.map(function(word) {

//     const wrap = word.indicatorsOfCriteria
//     const item = document.createElement("li")

//     const h3 = document.createElement("h3")
//     h3.textContent = `${word.criteriaForAssessingTheDegreeOfRisk}`
//     h3.classList = "primaryTextColor title1"

//     const customSelect = document.createElement("div")
//     customSelect.classList = "custom-select"

//     const selectSelected = document.createElement("div")
//     selectSelected.classList = "select-selected"
//  selectSelected.textContent = "Виберіть опцію"
//     const selectItems = document.createElement("div")
//     selectItems.classList = "select-items"

// for(const key in wrap){

//   const option = document.createElement("div")
//   option.classList = "option"
//   option.dataValue = `${wrap[key]}`
//   option.textContent = `${key}`

//   selectItems.append(option)
// }
// customSelect.append(selectSelected)

// item.append(h3)
// customSelect.append(selectItems)
//    item.append(customSelect)

//    riskAssessmentList.append(item)
//    selectSelected.addEventListener('click', () => {
//     selectItems.style.display = selectItems.style.display === 'block' ? 'none' : 'block';
// });

// selectItems.querySelectorAll('div').forEach(item => {
//     item.addEventListener('click', function() {
//         selectSelected.textContent = this.textContent;
//         selectItems.style.display = 'none';
//     });
// });

// // Закриття списку при кліку поза ним
// document.addEventListener('click', function(event) {
//     if (!event.target.closest('.custom-select')) {
//         selectItems.style.display = 'none';
//     }
// });
//   })







  



  const list = riskAssessmentCriteria.map(function(word) {

    const wrap = word.indicatorsOfCriteria
    const item = document.createElement("li")

    const h3 = document.createElement("h3")
    h3.textContent = `${word.criteriaForAssessingTheDegreeOfRisk}`
    h3.classList = "primaryTextColor title1"
    const select = document.createElement("select")
    select.classList = "select"
    const option2 = document.createElement("option")
    option2.disabled
    option2.selected
    option2.textContent = "Оберіть опцію"
    select.append(option2)
for(const key in wrap){

  const option = document.createElement("option")

  option.classList = "option"
  

  option.value = `${wrap[key]}`
  option.textContent = `${key}`
  
  select.append(option)

}

item.append(h3)
   item.append(select)

   riskAssessmentList.append(item)

  })


const submitRisk = document.querySelector(".submitRisk")


  document.querySelector('.riskAssessmentForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Зупиняємо стандартну поведінку форми

    // Отримуємо всі select з класом mySelect
    var selects = document.querySelectorAll('.select');
    var selectedValues = [];

    // Проходимо по кожному select і отримуємо його значення
    selects.forEach(function(select) {
        selectedValues.push(select.value);
    });

    // Виводимо результати
  console.log("asasas",selectedValues)



const total = selectedValues.reduce((previosValue, number)=> {
  return previosValue + Number(number)
},0)

if(total >0){

let typeRisk = ""
if(total>=0 && total<=20){
  typeRisk = "незначний"
} else if(total>=21 && total<=40){
  typeRisk = "середній"
}else if(total>=41 && total<=100){
  typeRisk = "високий"
} else{ typeRisk = "не визначено, з-за відсутності данних"}
obj.risk = typeRisk
console.log("obj", obj)
  const finalFirstContainer = document.createElement("div")
  finalFirstContainer.classList = "container"
  const firstTitle = document.createElement("p")
  firstTitle.textContent = `Ступінь ризику  ${typeRisk}`
  firstTitle.classList = "substanceWhoAdd"






  // кнопка переходу від першого кроку до наступного
const firstStepEnd = document.createElement("button")
firstStepEnd.textContent = "Перейти до наступних кроків";
firstStepEnd.type = "button";
firstStepEnd.style = "padding: 20px"; 
firstStepEnd.classList = "btn";
firstStepEnd.addEventListener("click", firstStepEndButton);
function firstStepEndButton() {
  firstStepEnd.onclick = function() {
    modalRiskAssessment.style.display = "none"
}
}

submitRisk.disabled = true
finalFirstContainer.append(firstTitle)

finalFirstContainer.append(firstStepEnd)

mainRiskAssessment.append(finalFirstContainer)

}else{
  alert("Будь ласка заповніть всі поля");
}
});

 
























// _________________________________________________АКТ___________________________________
// __МОДАЛЬНЕ ВІКНО Акту проведення перевірки
// Отримати модальне вікно
const modalActOfInspection = document.getElementById("myModalActOfInspection");

// Отримати кнопку, яка відкриває модальне вікно
const openModalActOfInspection = document.getElementById("openModalActOfInspection");

// Отримати елемент <span>, який закриває модальне вікно
const closeActOfInspection = document.getElementsByClassName("closeActOfInspection")[0];

// Коли користувач натискає на кнопку, відкрити модальне вікно
openModalActOfInspection.onclick = function() {
    modalActOfInspection.style.display = "block";
}

// Коли користувач натискає на <closeActOfInspection> (x), закрити модальне вікно
closeActOfInspection.onclick = function() {
    modalActOfInspection.style.display = "none";
}


  // ______________________________________________________________АКТПБ___________________________________
  // __МОДАЛЬНЕ ВІКНО Акту проведення перевірки
  // Отримати модальне вікно
  const modalActOfInspectionPB = document.getElementById("myModalActOfInspectionPB");
  
  // Отримати кнопку, яка відкриває модальне вікно
  const openModalActOfInspectionPB = document.getElementById("openModalActOfInspectionPB");
  
  // Отримати елемент <span>, який закриває модальне вікно
  const closeActOfInspectionPB = document.getElementsByClassName("closeActOfInspectionPB")[0];
  
  // Коли користувач натискає на кнопку, відкрити модальне вікно
  openModalActOfInspectionPB.onclick = function() {
      modalActOfInspectionPB.style.display = "block";
  }
  
  // Коли користувач натискає на <closeActOfInspectionPB> (x), закрити модальне вікно
  closeActOfInspectionPB.onclick = function() {
      modalActOfInspectionPB.style.display = "none";
  }

  















    // ________________________________________________________________________________________АКТТБ___________________________________
  // __МОДАЛЬНЕ ВІКНО Акту проведення перевірки
  // Отримати модальне вікно
  const modalActOfInspectionTB = document.getElementById("myModalActOfInspectionTB");
  
  // Отримати кнопку, яка відкриває модальне вікно
  const openModalActOfInspectionTB = document.getElementById("openModalActOfInspectionTB");
  
  // Отримати елемент <span>, який закриває модальне вікно
  const closeActOfInspectionTB = document.getElementsByClassName("closeActOfInspectionTB")[0];
  
  // Коли користувач натискає на кнопку, відкрити модальне вікно
  openModalActOfInspectionTB.onclick = function() {
      modalActOfInspectionTB.style.display = "block";
  }
  
  // Коли користувач натискає на <closeActOfInspectionTB> (x), закрити модальне вікно
  closeActOfInspectionTB.onclick = function() {
      modalActOfInspectionTB.style.display = "none";
  }




import {listOfQuestions} from "./listOfData/forAct.js"
const actOfInspectionButtonTB = document.querySelector(".actOfInspectionButtonTB")
actOfInspectionButtonTB.addEventListener("click", startTB)
function startTB(event){
  event.preventDefault();
// console.log("list", listOfQuestions)
  // const containerTB = document.querySelector(".containerTB")
  let number1 = 0
const formTB = document.querySelector(".formTB")


  const mapTB = listOfQuestions.map(function(word) {
// const parta = "середній"
    // console.log("word", word.indicator)
  
  //  console.log("number", number1)
   
    if(word.indicator.includes(obj.risk) === true){
      const dataOfListQuestions = word
     number1 +=1
      const fieldset = document.createElement("fieldset")
      fieldset.classList = "form-group"
  
      const legend = document.createElement("legend")
      legend.classList = "group-title question1"
      legend.textContent = `${dataOfListQuestions.question}`
  
      const formField1 = document.createElement("div")
      formField1.classList = "form-field"
  
      const labelForQuestion1 = document.createElement("label")
        
      const inputForQuestion1 = document.createElement("input")
       labelForQuestion1.textContent = "так"
      inputForQuestion1.type = "radio";
      inputForQuestion1.name = `answer${number1}`;
      inputForQuestion1.value = "так"
      labelForQuestion1.prepend(inputForQuestion1)

  
      const labelForQuestion2 = document.createElement("label")
      labelForQuestion2.textContent = "ні"
      const inputForQuestion2 = document.createElement("input")
      inputForQuestion2.type = "radio";
      inputForQuestion2.name = `answer${number1}`;
      inputForQuestion2.value = "ні"
     labelForQuestion2.prepend(inputForQuestion2)
  
  
      const labelForQuestion3 = document.createElement("label")
         labelForQuestion3.textContent = "не розглядалися"
      const inputForQuestion3 = document.createElement("input")
      inputForQuestion3.type = "radio";
      inputForQuestion3.name = `answer${number1}`;
      inputForQuestion3.value = "не розглядалися"
      labelForQuestion3.prepend(inputForQuestion3)
   
  
      formField1.append(labelForQuestion1)
      formField1.append(labelForQuestion2)
      formField1.append(labelForQuestion3)
      fieldset.append(legend)
      fieldset.append(formField1)
  
      
    const legend2 = document.createElement("legend")
      legend2.classList = "group-title "
      legend2.textContent = "Позиція суб’єкта господарювання щодо негативного впливу вимоги законодавства (від 1 до 4 балів)**"
  
      const formField2 = document.createElement("div")
      formField2.classList = "form-field"
  
      const labelForPoint1 = document.createElement("label")
      labelForPoint1.textContent = "1"
      const inputForPoint1 = document.createElement("input")
      inputForPoint1.type = "radio";
      inputForPoint1.name = `rating${number1}`;
      inputForPoint1.value = "1"
      labelForPoint1.prepend(inputForPoint1)
  
      const labelForPoint2 = document.createElement("label")
      labelForPoint2.textContent = "2";
      const inputForPoint2 = document.createElement("input")
      inputForPoint2.type = "radio";
      inputForPoint2.name = `rating${number1}`;
      inputForPoint2.value = "2";
      labelForPoint2.prepend(inputForPoint2);
  
      const labelForPoint3 = document.createElement("label")
      labelForPoint3.textContent = "3"
      const inputForPoint3 = document.createElement("input")
      inputForPoint3.type = "radio";
      inputForPoint3.name = `rating${number1}`;
      inputForPoint3.value = "3"
      labelForPoint3.prepend(inputForPoint3)
  
      const labelForPoint4 = document.createElement("label")
      labelForPoint4.textContent = "4"
      const inputForPoint4 = document.createElement("input")
      inputForPoint4.type = "radio";
      inputForPoint4.name = `rating${number1}`;
      inputForPoint4.value = "4"
      labelForPoint4.prepend(inputForPoint4)
  
      const titelNorm = document.createElement("h3")
      titelNorm.textContent = "Нормативне обгрунтування"
  
      const norm = document.createElement("p")
      norm.classList = `regulatoryJustification`
      norm.textContent = `${dataOfListQuestions.normative}`
  
  
      formField2.append(labelForPoint1)
      formField2.append(labelForPoint2)
      formField2.append(labelForPoint3)
      formField2.append(labelForPoint4)
      formField2.append(titelNorm)
      formField2.append(norm)
      fieldset.append(legend2)
      fieldset.append(formField2)
      formTB.prepend(fieldset)



   
    }  else {
      // alert("Будь ласка проведіть оцінку ступеня ризику об'єкта");
    }


   


    // const option = document.createElement("option")
    // option.value = `${word.individualNamesOfDangerousSubstances}`
    // option.textContent = `${word.individualNamesOfDangerousSubstances}`
    // // option.classList = 
    // selectDangerousSubstance.append(option)
    // console.log('word',word.individualNamesOfDangerousSubstances );
  })

















      const submitTB = document.querySelector(".submitTB")

      submitTB.addEventListener("click", handleSubmitTB)
function handleSubmitTB(event){
  event.preventDefault();
  const results = {};
    
  // Отримуємо всі fieldset елементи
  const fieldsets = document.querySelectorAll('.form-group');

  fieldsets.forEach((fieldset, index) => {
      // Знаходимо радіокнопки в поточному fieldset
      const radios = fieldset.querySelectorAll('input[type="radio"]');
      const pText = fieldset.querySelectorAll(".regulatoryJustification")
      const question = fieldset.querySelectorAll(".question1")
      for(const q of question){
        results[`number${index+1}`] = `${index+1}`
        results[`questions${index+1}`] = q.textContent
        results[`id${index+1}`] = `${obj.risk}`
      }
      for (const radio of radios) {
        if (radio.checked) {
            results[`rating ${index + 1}`] = radio.value;
            // break; // Виходимо з циклу, якщо знайдено вибране значення
        }
    }
      for (const radio of radios) {
          if (radio.checked) {
              results[`answer${index + 1}`] = radio.value;
              break; // Виходимо з циклу, якщо знайдено вибране значення
          }
      }
    for (const p of pText){
      results[`text${index+1}`] = p.textContent
    }  
  });

function objectToArray(obj) {
  const keys = Object.keys(obj);
  const result = [];

  for (let i = 0; i < keys.length; i += 6) {
      const chunk = {};
      for (let j = 0; j < 6; j++) {
          if (keys[i + j]) {
              chunk[keys[i + j]] = obj[keys[i + j]];
          }
      }
      result.push(chunk);
  }

  return result;
}

const transformedArray = objectToArray(results);
console.log(transformedArray);



// // Функція для створення таблиці
function createTable(data) {
    // Створюємо елемент таблиці
    const table = document.createElement('table');
  table.style.borderCollapse = "collapse"
    // Створюємо заголовок таблиці
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    
    // Заголовки колонок
    const headers = [ "Порядковий номер","Питання щодо дотримання суб’єктом господарювання вимог законодавства", "Ступінь ризику суб’єкта господарювання", "Позиція суб’єкта господарю- вання щодо негативного впливу вимоги законодавства (від 1 до 4 балів)**","Відповіді на питання (так, ні, не розглядалося)",  "Нормативне обґрунтування"];
    headers.forEach(headerText => {
        const header = document.createElement('th');
        header.textContent = headerText;
        header.style.border = "1px solid black"
        header.style.padding = "10px"
        header.style.textAlign = "left"
        headerRow.appendChild(header);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Створюємо тіло таблиці
    const tbody = document.createElement('tbody');
    // tbody.style.border = "1px solid black"
    // tbody.style.padding = "8px"
    // tbody.style.textAlign = "left"
    data.forEach(item => {
        const row = document.createElement('tr');
        Object.values(item).forEach(text => {
            const cell = document.createElement('td');
            cell.style.border = "1px solid black"
            cell.style.padding = "10px"
            cell.textContent = text;
            row.appendChild(cell);
        });
        tbody.appendChild(row);
    });
    table.appendChild(tbody);

    return table;
}
  const div = document.createElement("div")
  div.appendChild(createTable(transformedArray));
  // console.log("div", div.outerHTML)
  const pro = `${div.outerHTML}`

    // Форматуємо дані у форматі HTML для Word
    const blob = new Blob([pro], { type: "application/msword;charset=utf-8;fonts=timesNewRoman" });

    // Зберігаємо файл з ім'ям "document.doc"
    saveAs(blob, "document.doc");

  
}






}













