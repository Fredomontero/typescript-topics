/*
SYMBOLS
symbol is a primitive data type, just like number and string. symbol values are created by calling the Symbol constructor.
*/

let sym1 = Symbol();
let sym2 = Symbol("key") // Optional string key

//Symbols are immutable, and unique
let sym3 = Symbol("key");
let sym4 = Symbol("key")

sym3 === sym4;  //False: symbols are unique

//Just like strings, symbols can be used as keys for object properties

const sym5 = Symbol();
let obj = {
    [sym5]: "value"
};

console.log(obj[sym5]);  //"value"