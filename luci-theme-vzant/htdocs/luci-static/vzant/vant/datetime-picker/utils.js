"use strict";

exports.__esModule = true;
exports.times = times;
exports.getTrueValue = getTrueValue;
exports.getMonthEndDay = getMonthEndDay;

var _number = require("../utils/validate/number");

function times(n, iteratee) {
  var index = -1;
  var result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }

  return result;
}

function getTrueValue(value) {
  if (!value) {
    return;
  }

  while ((0, _number.isNaN)(parseInt(value, 10))) {
    value = value.slice(1);
  }

  return parseInt(value, 10);
}

function getMonthEndDay(year, month) {
  return 32 - new Date(year, month - 1, 32).getDate();
}