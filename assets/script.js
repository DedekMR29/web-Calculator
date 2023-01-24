const calculator = {
   displayNumber : '0',
   operator : null,
   firstNumber : null,
   waitingForSecondNumber : false

};

// Kita gunakan objek ini sebagai tempat menyimpan data dan kondisi pada calculator, di mana angka yang muncul pada layar kalkulator selalu diambil dari data calculator.displayNumber.

//Properti operator dan firstNumber kita gunakan nilai null terlebih dahulu karena properti tersebut akan diberikan nilai ketika pengguna melakukan aksi.

//Dan properti waitingForSecondNumber merupakan kondisi di mana kalkulator sedang menunggu pengguna menentukkan angka kedua dalam melakukan perhitungan.

function updateDisplay() {
   document.querySelector("#displayNumber").innerText = calculator.displayNumber;

}

function clearCalculator() {
   calculator.displayNumber = '0';
   calculator.operator = null;
   calculator.firstNumber = null;
   calculator.waitingForSecondNumber = false;
}

function inputDigit(digit) {
   if (calculator.displayNumber === '0') {
      calculator.displayNumber = digit;
   } else {
      calculator.displayNumber += digit;
   }
}

function inversNumber(){
   if(calculator.displayNumber === '0') {
      return;
   }
   calculator.displayNumber = calculator.displayNumber * -1;
}

function handleOperator(operator) {
   if (!calculator.waitingForSecondNumber) {
      calculator.operator = operator;
      calculator.waitingForSecondNumber = true;
      calculator.firstNumber = calculator.displayNumber;
      calculator.displayNumber = '0';
   } else {
      alert('Operator sudah di tetapkan')
   }
}

function perfomCalculation() {
   if (calculator.firstNumber == null || calculator.operator == null) {
      alert('Anda belum menetapkan operator');
      return;
   }

   
   let result = 0;
   if (calculator.operator === "+") {
      result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
   } else  {
      result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber);
   } 

   const history = {
      firstNumber: calculator.firstNumber,
      secondNumber: calculator.displayNumber,
      operator: calculator.operator,
      result: result
   }

   putHistory(history);
   calculator.displayNumber = result;
   renderHistory();
}

const buttons = document.querySelectorAll(".button");
for (let button of buttons) {
   button.addEventListener('click', function(event){ 
      //mendapatkan object elemen yang di klik
      const target = event.target;

      // return statement agar fungsi event handler terhenti sehingga kode yang ada di bawahnya tidak ikut tereksekusi.
      //contains() yang merupakan method dari array yang berguna untuk memastikan nilai yang terkandung di dalam array tersebut.
      //event.classList untuk melihat nilai class apa saja dalam bentuk array yang ada pada element target
      if (target.classList.contains('clear')) { 
         clearCalculator();                     
         updateDisplay();
         return;                                
      }

      if (target.classList.contains('negative')) { 
         inversNumber();                     
         updateDisplay();
         return;                                
      }

      if (target.classList.contains('equals')) { 
         perfomCalculation();                     
         updateDisplay();
         return;                                
      }

      if (target.classList.contains('operator')) { 
         handleOperator(target.innerText);
         return;                                
      }

      inputDigit(target.innerText);
      updateDisplay();
   });
   
}

