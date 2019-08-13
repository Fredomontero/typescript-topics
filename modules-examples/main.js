"use strict";
exports.__esModule = true;
var util_1 = require("./util");
var n1 = 10;
var n2 = 20;
var result = util_1.addNumbers(n1, n2);
result = util_1.addNumbers(result, util_1.id);
console.log("The result is: ", result);
