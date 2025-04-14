import  { thresholdMasses }  from "./thresholdMasses.js";
const submitFirstForm = document.querySelector(".submitFirstForm");
const selectDangerousSubstance = document.querySelector(".selectDangerousSubstance");
const title = document.querySelector(".title");
const calculationForm = document.querySelector(".calculationForm");
const amountSubstance = document.querySelector(".amount");
const main = document.querySelector(".main")
const mainIdentification = document.querySelector(".mainIdentification")

selectDangerousSubstance.addEventListener("change", setOutputSubstance);
submitFirstForm.addEventListener("click", submit);
amountSubstance.addEventListener("change", submitAmount)


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
}







let obj = {
  amount:0,
  substance: 0,
  counter: 0,
  classForOne: "",
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
    console.log("1111", first)
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

// Коли користувач натискає будь-де поза модальним вікном, закрити його


