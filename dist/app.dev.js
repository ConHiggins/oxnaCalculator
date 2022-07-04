"use strict";

var equationArr = [];
var screen = document.getElementById("Calculator__display");
var containsOperator = false;
var screenWidth = 9;
var currLength = 0;
var operators = ["+", "-", "/", "*", "%"]; //// Operator boolean /////////////////////////////////////////////////////////////

var boolOperator = function boolOperator() {
  containsOperator = true;
}; ////Highlight operator button //////////////////////////////////////////////////////


var highlightOperator = function highlightOperator(btn) {
  console.log("operator"); ////remove operator from display

  screen.innerHTML = equationArr.slice(0, equationArr.length - 1).join(""); ///Highlight button 

  btn.classList.add("current");
  console.log("highlight");
  return;
}; ///// Reset operator buttons to inactive /////////////////////////////////////////////


var resetButtons = function resetButtons() {
  var activeButtons = document.getElementsByClassName("current");

  for (i = 0; i < activeButtons.length; i++) {
    console.log("removed");
    activeButtons[i].classList.remove("current");
  }

  ;
}; ////Check for operator ///////////////////////////////////////////////////////////


var operatorCheck = function operatorCheck(arr) {
  ///Reset to result to allow further inputs
  for (i = 0; i < arr.length; i++) {
    console.log("Operator check" + i);

    if (arr[i].classList.contains("Calculator__operator")) {
      return highlightOperator(arr[i]); //return equals();
    }
  }
}; ///Negate / Invert //////////////////////////////////////////////////////////////////


var invertNum = function invertNum(num) {
  return Number(num * -1);
};

var invertNumResult = function invertNumResult() {
  ///Reduce array to single number 
  equals(); ////Get inversion

  var negNum = Number(invertNum(equationArr[equationArr.length - 1])); ///Remove "+/-" from array

  buttonVal = null; ///Set recent number to inversion

  equationArr[equationArr.length - 1] = negNum;
}; //////Total/literal array length/////////////////////////////////////////////////////


var totalArrLength = function totalArrLength(arr, startIndex) {
  var total = 0;

  for (i = startIndex; i < arr.length; i++) {
    total += arr[i].toString().length; //console.log("total:" + total);
  }

  return Number(total);
}; //////Check exponentials ////////////////////////////////////////////////////////////////


var checkNumLength = function checkNumLength(num) {
  return num.toExponential(2);
}; ////Avoid multiple decimals 


var containsDecimal = function containsDecimal(arr) {
  if (arr.includes(".")) {
    return true;
  } else return false;
}; ///////////Get value of button ///////////////////////////////////////////////////


var getValue = function getValue(num) {
  //Get value of button
  var buttonVal = num.innerHTML; //Clear zero

  if (equationArr[0] == 0) {
    equationArr = [];
  }

  if (buttonVal == "+/-") {
    ///Reduce array to single number 
    equals(); ////Get inversion

    var negNum = Number(invertNum(equationArr[equationArr.length - 1])); ///Remove "+/-" from array

    buttonVal = null; ///Set recent number to inversion

    equationArr[equationArr.length - 1] = negNum;
  }

  if (buttonVal == "." && containsDecimal(equationArr) == true) {
    return;
  } ///Get operator index


  var opIndex = 0;

  for (i = 0; i < equationArr.length; i++) {
    if (operators.includes(equationArr[i])) {
      opIndex = i;
    }
  } ////Check length & return /do nothing if number too long   


  var totalLength = totalArrLength(equationArr, 0) - opIndex;

  if (totalLength < screenWidth && buttonVal !== null) {
    ///Pass value to equation array
    //buttonval = Number(checkNumLength(buttonVal));
    equationArr.push(buttonVal);
    console.log("array:" + equationArr); ///Pass array to display

    opIndex = 0;

    for (i = 0; i < equationArr.length; i++) {
      if (operators.includes(equationArr[i])) {
        opIndex = i;
      }
    }

    screen.innerHTML = equationArr.slice(opIndex).join(""); //Operators

    return;
  } else {
    return equals();
  }
}; ///Clear current equation //////////////////////////////////////////////////////////


var clearEquation = function clearEquation() {
  resetButtons();
  equationArr = [];
  screen.innerHTML = equationArr;
}; ////Check decimals function///////////////////////////////////////////////////////////////


var checkDecimal = function checkDecimal(num) {
  if (Number.isInteger(num)) {
    return 1;
  } else {
    return num.toString().split(".")[0].length;
  }
}; ////Run users equation ////////////////////////////////////////////////////////////////////


var equals = function equals() {
  ///Clear if equation starts with operator 
  if (operators.includes(equationArr[0])) {
    resetButtons();
    return clearEquation();
  } else {
    if (!isNaN(equationArr[equationArr.length - 1])) {
      resetButtons();
    } ///Run equation array as mathematical function 


    var result = Function("return " + equationArr.join(""))(); ////Important to have () at the end as it executes it as a function (rather than printing the function)
    //checkNumLength(result);
    ///var for remaining space 

    var decimalSpace = 0;

    if (Number.isInteger(result) == false) {
      decimalSpace = Math.max(checkDecimal(result) + 1, screenWidth - checkDecimal(result));
      result = result.toFixed(decimalSpace); //console.log(decimalSpace);
    }

    if (result > 99999999) {
      result = checkNumLength(result);
    } ///Set equation array to result


    equationArr = [result]; ///Pass result to screen

    screen.innerHTML = equationArr[equationArr.length - 1]; //Reset operator bool

    containsOperator = false; //console.log(result);
  }
};