'use strict'

Object.prototype.snoop = function(object, property, filter) {
    var currentValue = object[property];

    var getter = function() { return currentValue };
    var setter = function(value) { currentValue = value };

    var propertyDescriptor = Object.getOwnPropertyDescriptor(object, property);

    if (propertyDescriptor) {
        if (propertyDescriptor.set !== undefined) {
            setter = propertyDescriptor.set
        }

        if (propertyDescriptor.get !== undefined) {
            getter = propertyDescriptor.get
        }
    }

    Object.defineProperty(object, property, {
        get: function() { return getter.call(this) },
        set: function(value) {
            if (filter.call(this, value)) {
                setter.call(this, value);
            }
        },
        configurable: true
    });
}
