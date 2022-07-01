"use strict";

///Negate / Invert //////////////////////////////////////////////////////////////////
var invertNum = function invertNum(num) {
  ///Check for operators 
  var test = Number(num * -1);
  console.log(test);
  return;
};

invertNum(1); //////Total/literal array length

var totalArLength = function totalArLength(arr) {
  var total = 0;
  arr.forEach(function (item) {
    total += item.toString().length;
  });
  console.log(Number(total));
  return Number(total);
};

var arr = [1, 4567, 456, 3, 4];
totalArLength(arr);