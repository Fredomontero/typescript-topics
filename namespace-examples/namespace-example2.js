/*
As we add more validators, we're going to want to have some kind of organization scheme so that we can keep track of our types and not worry about name collision with other objects. Instead of putting lots of different names into the global namespace, let's wrap up our objects into a namespace.

In this example, we'll move all validator-related entities into a namespace called Validation. Because we want the interfaces and classes here to be visible outside the namespace, we preface the with export. Conversely, the variables letterRegexp and numberRegexp are implementation details, so they are left unexported and will not be visble to code outside the namespace. In the test code at the bottom of the file, we now need to qualify the names of the types when used outside the namespace e.g. Validation.LettersOnlyValidator.
*/
var Validation;
(function (Validation) {
    var lettersRegexp = /^[A-Za-z]+$/;
    var numberRegexp = /^[0-9]+$/;
    var LettersOnlyValidator = /** @class */ (function () {
        function LettersOnlyValidator() {
        }
        LettersOnlyValidator.prototype.isAcceptable = function (s) {
            return lettersRegexp.test(s);
        };
        return LettersOnlyValidator;
    }());
    Validation.LettersOnlyValidator = LettersOnlyValidator;
    var ZipCodeValidator = /** @class */ (function () {
        function ZipCodeValidator() {
        }
        ZipCodeValidator.prototype.isAcceptable = function (s) {
            return s.length === 5 && numberRegexp.test(s);
        };
        return ZipCodeValidator;
    }());
    Validation.ZipCodeValidator = ZipCodeValidator;
})(Validation || (Validation = {}));
//Some samples to try
var stringsSamples = ["Hello", "99587", "101"];
// Validators to use
var validatorsArray = {};
validatorsArray["ZIP code"] = new Validation.ZipCodeValidator();
validatorsArray["Letters only"] = new Validation.LettersOnlyValidator();
// Show whether each string passed each validator
for (var _i = 0, stringsSamples_1 = stringsSamples; _i < stringsSamples_1.length; _i++) {
    var s = stringsSamples_1[_i];
    for (var name_1 in validatorsArray) {
        console.log("\"" + s + "\" - " + (validatorsArray[name_1].isAcceptable(s) ? "matches" : "does not match") + " " + name_1);
    }
}
