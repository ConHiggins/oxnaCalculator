"use strict";

var index, currDisplay;
var equationArr = [];
var screen = document.getElementById("Calculator__display"); //const operators = ["+", "-", "*", "/", "%"];

var containsOperator = false;
var screenWidth = 9; //// Operator boolean /////////////////////////////////////////////////////////////

var boolOperator = function boolOperator() {
  containsOperator = true;
}; ////Check for operator //////////////////////////////////////////////


var operatorCheck = function operatorCheck(num) {
  ///Reset to result to allow further inputs
  if (num.classList.contains("Calculator__operator")) //&& (containsOperator == true)) 
    {
      return equals();
    } else {
    return;
  }
}; ///Negate / Invert //////////////////////////////////////////////////////////////////


var invertNum = function invertNum(num) {
  ///Check for operators 
  if (boolOperator == false) {
    return Number(num * -1);
  } else {
    return;
  }
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
  }

  operatorCheck(num);

  if (buttonVal == "+/-") {
    console.log(Number(equationArr[equationArr.length - 1]));
    var negNum = invertNum(Number(equationArr[equationArr.length - 1]));
    buttonVal = null;
    equationArr[equationArr.length - 1] = Number(negNum);
  }

  var totalLength = totalArrLength(equationArr); ////Check length & return /do nothing if number too long    

  if (equationArr.length < screenWidth && totalLength < screenWidth) {
    ///Pass value to equation array
    equationArr.push(buttonVal);
    console.log("array:" + equationArr); ///Pass array to display

    return screen.innerHTML = equationArr.join("");
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