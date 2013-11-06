Object.snoop = function (object, property, validate) {
    var value = object[property];
    var descriptor = Object.getOwnPropertyDescriptor(object, property);

    var enumerable = descriptor ? descriptor.enumerable : true;
    var getter     = descriptor && descriptor.get || function () { return value; };
    var oldSetter  = descriptor && descriptor.set || function (newValue) { value = newValue; };
    var setter     = function (newValue) { validate(newValue) && oldSetter(newValue); };

    Object.defineProperty(object, property, {get: getter, set: setter, enumerable: enumerable});
};