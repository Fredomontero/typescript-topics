import { id, addNumbers } from './util';

let n1: number = 10;
let n2: number = 20;

var result = addNumbers(n1, n2);
result = addNumbers(result, id);
console.log("The result is: ", result);