"use strict";

var index, currDisplay;
var equationArr = [];
var screen = document.getElementById("Calculator__display"); //const operators = ["+", "-", "*", "/", "%"];

var containsOperator = false; ////Get button inputs /////////////////////////////////////////////////////////////

var boolOperator = function boolOperator() {
  containsOperator = true;
};

var getValue = function getValue(num) {
  //Get value of button
  var buttonVal = num.innerHTML; //Clear zero

  if (equationArr[0] == 0) {
    equationArr = [];
  } ////Check length & return /do nothing if number too long    


  if (equationArr.length < 9) {
    ///Reset to result to allow further inputs
    if (num.classList.contains("Calculator__operator") && containsOperator == true) {
      equals();
    } ///Pass value to equation array


    equationArr.push(buttonVal);
    console.log("array:" + equationArr); ///Pass array to display

    screen.innerHTML = equationArr.join("");
  } else {
    return;
  }
}; ///Clear current equation //////////////////////////////////////////////////////////


var clearEquation = function clearEquation() {
  equationArr = [];
  screen.innerHTML = equationArr;
}; ///Negate / Invert //////////////////////////////////////////////////////////////////
// const invertNum = (num) => {
//     ///Check for operators 
//     //const reg = /((+)|(-)|(\/)|(*))/ ;
//     //let containsOperator = reg.test(equationArr);
//     let reg1 = /+/;
//     let reg2 = /-/;
//     let reg3 = /\//;
//     let reg4 = /\*/;
//     let fullCheck = (reg1 && reg2 && reg3 && reg4);
//     ///Get value on screen
//     if(!fullCheck) {
//         return num *= -1;
//     }
//     else {return;}
// }
////Run users equation ////////////////////////////////////////////////////////////////////


var equals = function equals() {
  ///Clear if equation starts with operator other than + or -
  if (equationArr[0] == "/" || equationArr[0] == "*" || equationArr[0] == "%") {
    return clearEquation();
  } else {
    ///Run equation array as mathematical function 
    var result = Function("return " + equationArr.join(""))(); ////Important to have () at the end as it executes it as a function (rather than printing the function)
    ///Set equation array to result

    equationArr = [result]; ///Pass result to screen

    screen.innerHTML = result; //Reset operator bool

    containsOperator = false;
    console.log(result);
  }
};