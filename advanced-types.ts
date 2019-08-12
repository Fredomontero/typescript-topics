/*
INTERSECTION TYPES
An intersection type combines multiple types into one. This allows you to add together ecisting types to get a single type that has all features you need.
For example, Person & Serializable & Loggable is a Person and Serializable and Loggable. That means an object of this type will have all memebers of all types.

You will mostly see intersection types used for mixins and other concepts that don't fit in the classic object-oriented mold. (there are a lot of these in JavaScript) Here's a simple example that shows how to create a mixin.
*/

function extend <First, Second>(first: First, second: Second): First & Second{
    const result: Partial<First & Second> = {};
    for(const prop in first){
        if(first.hasOwnProperty(prop)){
            (result as First)[prop] = first[prop];
        }
    }
    for(const prop in second){
        if(second.hasOwnProperty(prop)){
            (result as Second)[prop] = second[prop];
        }
    }
    return result as First & Second;
}

class PersonAlt {
    constructor(public name: string) {}
}

interface Loggable{
    log(name: string): void;
}

class ConsoleLogger implements Loggable{
    log(name){
        console.log(Hello, I'm ${ name });
    }
}

const jim = extend(new PersonAlt('Jim'), ConsoleLogger.prototype);
jim.log(jim.name);

/*
UNION TYPES

Union types are closely related to intersection types but they are used very differently. Occasionally run into a library that expects a parameter to be either a number or a string. For instance, take the following function for the traditional solution, with the new approach we can use a union type for the padding parameter
 */

 function padLeft(value: string, padding: any){
     if(typeof padding === "string"){
         //Do something
     }
     if(typeof padding === "number"){
         //Do something else...
     }
 }

 //New approach
 function padLeftAlt(value: string, padding: string | number){

 }

 /*
 A union type describres a value that can be one of severa; types. We use the vertical bar (|) to se parate each type, so numb er | string | boolean is the type of a value that can be a number, a string, or a boolean. It's important to take in consideration that if we have a value that has a union type, we can only access members that are common to all types in the union
 */

 interface Bird{
     fly();
     layEggs();
 }

 interface Fish{
     swim();
     layEggs();
 }

 function getSmallPet(): Fish | Bird{
     //..
     return
 }

 let pet = getSmallPet();
 pet.layEggs();                 //Okay
 pet.swim();                    //Errors

 /*
TYPE GUARDS
Union types are useful for modeling situations when values can overlap in the types they can take on. What happens when we need to know specifically whether we have a fish? a Common idiom in JavaScript to differentiate between twp possible values is to check fot the  presence of a member. As we mentioned you can only access members that are guaranteed to be in all consituents of a unions type.
 */

 let myPet = getSmallPet();
 //Each of these propery accesses will cause an error

 if(pet.swim){
     pet.swim();
 }else if(pet.fly){
     pet.fly();
 }

 //To define a type guard, we simply need to define a function whose return type is a type predicate
 function isFish(pet: Fish | Bird): pet is Fish{
     return (pet as Fish).swim !== undefined;
 }

 /*
 pet is Fish is our type predicate in this example. A predicat takes the form parameterName is Type , where parameterName must be the name of the current function signature.
 Any time isFish is called with some variable, TypeScript will narrow that variable to that specific type if the original type is compatible.
  */

  /*
  TYPE ALIASES  
  Type Aliases create a new name for a type. Type alisases are sometimes similar to interdaces, but can name primitives, unions, tuples and any other types that you'd otherwise have to write by hand. 
  */

  type Name = string;
  type NameResolver = () => string;
  type NameOrResolver = Name | NameResolver;
  function getName(n: NameOrResolver): Name{
    if(typeof n === "string"){
        return n;
    }else{
      return n();
    }
  }

  /*
  Aliasing doesn't actually create a new type - ir creates a new name on to refer to that type. Aliasing a primitive is not terrobly useful, though it can be used as a form of documentation

  INTERFACES VS TYPE ALIASES [FOR LATER: read about this]

  STRING LITERAL TYPES

  String Literal tyoes allow you to specify the exact value a string must have. In practice string literal types combin nicely with union types, type guards, and type aliases. You can use these features together to get enum-like behavior with strings.
  */

  type Easing = "ease-in" | "ease-out" | "ease-in-out";
  class UIElement{
      animate(dx: number, dy: number, easing: Easing){
          //...
      }
  }

  /*
  NUMERICAL LITERAL TYPES

  TypeScript also has numerical types, these are seldom written explicitly, they can be useful when anrrowing can catch bugs

  DISCRIMINATED UNIONS

  You can combine singleton types, union types, type guards, and tyoes aliases to build advanced pattern called discrimintaed unions, also know as tagged unions or algebraic data types. Discriminated unions are useful in functional programming. Some languages automatically discriminate unions for you; TypeScript instead builds on JavaScript patterns as they exist today. There are 3 ingredients:

  1.- types that have a common singleton type property - the discriminant
  2.- A type Alias that takes the union of those types - the union
  3.- Type guards on the common property
  */

  interface Square{
    kind: "Square";
    size: number;
  }

  interface Rectangle{
    kind: "Rectangle";
    width: number;
    height: number;
  }

  interface Circle{
    kind: "Circle";
    radius: number;
  }

  /*
  First we declare the interfaces we will union, Each interface gas a kinf property string literal type. The kind property is called the ddiscriminant or tag. The other properties are specific on each interface. Notcie that the interfaces are currently unrelated, lets put them into a union
  */

  type Shape = Square | Rectangle | Circle;

  function area(s: Shape) {
    switch (s.kind) {
        case "Square": return s.size * s.size;
        case "Rectangle": return s.height * s.width;
        case "Circle": return Math.PI * s.radius ** 2;
    }
}

/*
[FOR LATER: READ ABOUT INDEX TYPES]

MAPPED TYPES

A common task is to take an existing type  and make each of its properties optional
*/

interface PersonPartial{
    name?: string;
    age?: number;
}

//Or we might want a readonly version

interface PersonPartialAlt{
    readonly name: string;
    readonly age: number;
}

/*
This happens often enough in JavaScript that  TypeScript provides a way to create new types based on old types -- Mapped types. In mapped type, the new transforms each property in the old type in the same way. For example, you can make all properties of a type readonly or optional. Here are a couple of examples.
*/

interface Person{ }

type ReadonlyAlt<T> ={
    readonly [P in keyof T]: T[P];
}

type PartialAlt<T> = {
    [P in keyof T]? : T[P];
}

//if we want to add new members
type ReadonlyAltNewMember<T> ={
    readonly [P in keyof T]: T[P];
}&{ newMember: boolean };

//And to use it

type PersonPartialAlt2 = PartialAlt<Person>;
type ReadOnlyPerson =  ReadonlyAlt<Person>;

/*
CONDITONAL TYPES

TypeScript 2.8 introduces Conditional types which add the ability to express non-uniform  type mappings. A conditional type selects one of two possible types based on a condition expressed as a type relationship test:

    T extends U ? X : Y
    
the type above means when T is assignable to U the type is X, otherwise the wype is Y.

A conditional type T extends U ? X : Y is either resolved to X or Ym or deferred because the condition depends on one or more type variables. When T or U contains type variables, whether to resolve to X or Y, or defer, is determined by wheter or not the type system has enough information to conclude that T is always assignable to U.
As an exmaple of some types that are immediately resolved, we can take a look at the following example:

*/

declare function f<T extends boolean> (x: T): T extends true ? string: number;
//type is string|number
let x = f(Math.random() < 0.5);

//Another example with nested conditionals:

type TypeName<T> =
    T extends string ? "string" :
    T extends number ? "number" :
    T extends boolean ? "boolean" :
    T extends undefined ? "undefined" :
    T extends Function ? "function" :
    "object";

type T0 = TypeName<string>;  // "string"
type T1 = TypeName<"a">;  // "string"
type T2 = TypeName<true>;  // "boolean"
type T3 = TypeName<() => void>;  // "function"
type T4 = TypeName<string[]>;  // "object"