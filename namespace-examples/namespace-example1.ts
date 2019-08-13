interface StringValidator{
    isAcceptable(s: string): boolean;
}

let lettersRegexp = /^[A-Za-z]+$/;
let numberRegexp = /^[0-9]+$/;

class LettersOnlyValidator implements StringValidator{
    isAcceptable(s: string){
        return lettersRegexp.test(s);
    }
}

class ZepCodeValidator implements StringValidator{
    isAcceptable(s: string){
        return s.length === 5 && numberRegexp.test(s);
    }
}

//some samples to try
let strings = ["Hello", "99587", "101"];

//Validators to use 
let validators: { [s:string]: StringValidator; } = {};
validators["ZIP code"] = new ZepCodeValidator();
validators["Letters only"] =  new LettersOnlyValidator();

//show whether each string passed each validator
for(let s of strings){
    for(let name in validators){
        let isMatch = validators[name].isAcceptable(s);
        console.log(`'${ s }' ${ isMatch ? "matches": "does not match" } '${ name }'. `);
    }
}