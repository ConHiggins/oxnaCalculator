"use strict";

var equationArr = [];
var screen = document.getElementById("Calculator__display");
var containsOperator = false;
var screenWidth = 9;
var operators = ["+", "-", "/", "*", "%"]; //// Operator boolean /////////////////////////////////////////////////////////////

var boolOperator = function boolOperator() {
  containsOperator = true;
}; ////Highlight operator button /////////////////


var highlightOperator = function highlightOperator(btn) {
  ///Check if most recent press is an operator 
  if (isNaN(Number(equationArr[equationArr.length - 1]))) {
    console.log("operator"); ////remove operator from display

    screen.innerHTML = equationArr[equationArr.length - 2]; ///Highlight button 

    return btn.classList.add("current");
  } else return;
}; ////Check for operator //////////////////////////////////////////////


var operatorCheck = function operatorCheck(num) {
  ///Reset to result to allow further inputs
  if (num.classList.contains("Calculator__operator")) {
    highlightOperator(num);
    return equals();
  } else {
    return;
  }
}; ///Negate / Invert //////////////////////////////////////////////////////////////////


var invertNum = function invertNum(num) {
  return Number(num * -1);
}; //////Total/literal array length/////////////////////////////////////////////////////


var totalArrLength = function totalArrLength(arr) {
  var total = 0;
  arr.forEach(function (item) {
    total += item.toString().length;
  });
  return Number(total);
}; ///////////Get value of button ///////////////////////////////////////////////////


var getValue = function getValue(num) {
  //Get value of button
  var buttonVal = num.innerHTML; //Clear zero

  if (equationArr[0] == 0) {
    equationArr = [];
  } //Operators


  operatorCheck(num);

  if (buttonVal == "+/-") {
    ///Reduce array to single number 
    equals(); ////Get inversion

    var negNum = Number(invertNum(equationArr[equationArr.length - 1])); ///Remove "+/-" from array

    buttonVal = null; ///Set recent number to inversion

    equationArr[equationArr.length - 1] = negNum;
  } ////Check length & return /do nothing if number too long   


  var totalLength = totalArrLength(equationArr);

  if (equationArr.length < screenWidth && totalLength < screenWidth) {
    ///Pass value to equation array
    equationArr.push(buttonVal);
    console.log("array:" + equationArr); ///Pass array to display

    var opIndex = 0;

    for (i = 0; i < equationArr.length; i++) {
      if (operators.includes(equationArr[i])) {
        opIndex = i;
      }
    }

    return screen.innerHTML = equationArr.slice(opIndex).join("");
  } else {
    return equals();
  }
}; ///Clear current equation //////////////////////////////////////////////////////////


var clearEquation = function clearEquation() {
  equationArr = [];
  screen.innerHTML = equationArr;
}; ////Check decimals function///////////////////////////////////////////////////////////////


var checkDecimal = function checkDecimal(num) {
  if (Number.isInteger(num)) {
    return 1;
  } else {
    return num.toString().split(".")[0].length;
  }
}; //////Check exponentials ////////////////////////////////////////////////////////////////


var checkNumLength = function checkNumLength(num) {
  if (num.toString.length() > screenWidth - 1) {
    return num = num.toExponential(4);
  } else {
    return;
  }
}; ////Run users equation ////////////////////////////////////////////////////////////////////


var equals = function equals() {
  ///Clear if equation starts with operator other than + or -
  if (equationArr[0] == "/" || equationArr[0] == "*" || equationArr[0] == "%") {
    return clearEquation();
  } else {
    ///Run equation array as mathematical function 
    var result = Function("return " + equationArr.join(""))(); ////Important to have () at the end as it executes it as a function (rather than printing the function)
    //checkNumLength(result);
    ///var for remaining space 

    var decimalSpace = 0;

    if (Number.isInteger(result) == false) {
      decimalSpace = screenWidth - checkDecimal(result); //console.log(decimalSpace);
    } ///Set equation array to result


    equationArr = [result.toFixed(decimalSpace)]; ///Pass result to screen

    screen.innerHTML = equationArr[equationArr.length - 1]; //Reset operator bool

    containsOperator = false; //console.log(result);
  }
};