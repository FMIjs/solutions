Object.snoop = function (obj, prop, func) {
    if (obj === undefined) {
        return;
    }
 
    var FUNCTIONS = '_functions';

    var prop_value = obj[prop];
    var property_descriptor = Object.getOwnPropertyDescriptor(obj, prop) || {};
    var is_enumerable = property_descriptor != undefined ? property_descriptor.enumerable : true;

   if (!obj.hasOwnProperty(FUNCTIONS)) {
     Object.defineProperty(obj, FUNCTIONS, { value: [] });
   }
    Object.getOwnPropertyDescriptor(obj,FUNCTIONS).value.push(func);

    var getter = function () {
        if (!this.hasOwnProperty(prop)) {
            return undefined;
        }

        return prop_value;
    };

    var setter = function (value) {
  var interceptors = Object.getOwnPropertyDescriptor(this, FUNCTIONS).value;
        for (i = 0; i < interceptors.length; i += 1) {
            if (!interceptors[i](value)) {
                return;
            }
        }

        prop_value = value;
    };
    Object.defineProperty(obj, prop, {
        get: getter,
        set: setter,
        enumerable: is_enumerable
    });
};