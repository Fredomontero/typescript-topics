/*
NAMESPACES

In TypeScript as we alluded in our note about terminology, "internal modules" are now referred to as "namespaces". Additionally, anywhere the module keyword was used when declaring an internal module, the namspace keyword can and should be used instead. This avoids confusing new users by overloading them with similarly named terms.

In order to implement some namespaces we will write some simplistic string validators, as you might write to check a user's input on a form in webpager or check the format of an externally provided data file.

ALIASES

Another way that you can simplify working with namespaces is to use import q = x.y.z to create shorter names for commonly-used objects. Not to be confused with the import x = require("name") syntax used to load modules, this syntax simply creates an aliasfor the specified symbol. You can use these sorts of imports (commonly referred to as aliases) for any kind of identifier, including objects created from modules imports.
*/

namespace Shapes{
    export namespace Polygons{
        export class Triangle { };
        export class Square { };
    }
}

import polygons = Shapes.Polygons;
let square = new polygons.Square();
 