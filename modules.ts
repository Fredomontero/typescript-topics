/*
MODULES
A note about terminology: It's important to note that in TypeScript 1.5, the nomenclature has changed "Internal modules" are now "namespaces". "External modules" are now simple "modules", as to align with ES 2015 terminology.

Introduction:

Modules are executed within their own scope, not in the global scope; this means that variables, functions, classes, etc. declared in a module are not visible outside, the module unless they are explicitly exported using one of the export forms. Conversely, to consume a variable, function, class, interface, etc form a different module, it has to be imported using one of the import forms.

Modules are declarative; the relationships between modules are specified in terms of imports and exports at the file level.

---

EXPORT

any declaration (such as a variable, function, class, type. alias, or interface) can be exported by adding the export keyword. any Export statements are handy when wxports need to be renamed for consumers, like this:

    export { ZipCodeValidator }
    export { ZipCodeValidator as mainValidator }

IMPORT

Importing is just about as easy as exporting froma  module. Importing an exported declaration is done through using one of the import forms

    import { ZipCodeValidator } from "./ZipeCodeValidator"
    import { ZipCodeValidator as ZCV } from "./ZipeCodeValidator"

Or we can import the entire module into a single variable, and use it to access the module exports

    import * as validator from "./ZipeCodeValidator";
    let myValidator = new validator.ZipCodeValidator();

EXPORT = AND IMPORT = REQUIRE()

Both commonJS and AMD generally have the concept of an exports object which contains all exports from a module. they also support replacing trhe exports object with a custom single object. Default are meant to act as a replacement for this behavior; however, the two are imcompatible. TypeScript supports export = to model the traditional commonJS and AMD workflow

OPTIONAL MODULE LOADING AND OTHER ADVANCED LOADING SCENARIOS

In some cases, you may want to only load a module under some conditions. In TypeScript, we can use the pattern shown below to implement this and other advanced loading scenarios to directly invoke the module loaderswithout losing type safety.

GUIDANCE FOR STRUCTURING MODULES

Export as close to top-level as possible

Consumers of your module should have as little friction as possible when using things that you export. Adding too many levels ofnestiing tends to be cumbersome, so think carefully about how you want to structure things.
Exporting a namespace from your module is an example of adding too many layers of nesting. While namespaces sometime have their uses, they add an extra level of indirection when using modules. This can quickly become a pain point for users, and is usually unnecessary.

Static methodss on an exported class have a similar problem - the class itself adds a layer of nesting. Unless it increases expresivity or intent in a clearly useful way, consider simply exporting a helper function.

Just as "exporting near the top-level" reduces friction on your module's consumers, so does introducing a default export. If a module's primary purpose is to house one specific export, then you should consider exporting it as a default export. This makes both importing and actually using the import a little easier. For example: 

    //MyClass.ts
    export default class SomeType{
        constructor(){...}
    }

    //Myfunc.ts
    export default function getThing(){return "thing"};

    //consumer.ts
    import t from "./MyClass";
    import f from "./MyFunc";
    let x = new t();
    console.log(f());


This is optimal for consumers, they can name your type whatever the want and sont have to do any excessive doting to find your objects
*/