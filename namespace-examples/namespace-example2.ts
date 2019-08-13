/*
As we add more validators, we're going to want to have some kind of organization scheme so that we can keep track of our types and not worry about name collision with other objects. Instead of putting lots of different names into the global namespace, let's wrap up our objects into a namespace.

In this example, we'll move all validator-related entities into a namespace called Validation. Because we want the interfaces and classes here to be visible outside the namespace, we preface the with export. Conversely, the variables letterRegexp and numberRegexp are implementation details, so they are left unexported and will not be visble to code outside the namespace. In the test code at the bottom of the file, we now need to qualify the names of the types when used outside the namespace e.g. Validation.LettersOnlyValidator.
*/

namespace Validation{
    
    export interface StringValidator{
        isAcceptable(s: string): boolean;
    }

    let lettersRegexp = /^[A-Za-z]+$/;
    let numberRegexp = /^[0-9]+$/;

    export class LettersOnlyValidator  implements StringValidator{
        isAcceptable(s: string){
            return lettersRegexp.test(s);
        }
    }
    
    export class ZipCodeValidator implements StringValidator{
        isAcceptable(s: string){
            return s.length === 5 && numberRegexp.test(s);
        }
    }

}

//Some samples to try
let stringsSamples = ["Hello", "99587", "101"];

// Validators to use
let validatorsArray: { [s: string]: Validation.StringValidator; } = {};
validatorsArray["ZIP code"] = new Validation.ZipCodeValidator();
validatorsArray["Letters only"] = new Validation.LettersOnlyValidator();

// Show whether each string passed each validator
for (let s of stringsSamples) {
    for (let name in validatorsArray) {
        console.log(`"${ s }" - ${ validatorsArray[name].isAcceptable(s) ? "matches" : "does not match" } ${ name }`);
    }
}

