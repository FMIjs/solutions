Object.snoop = function (obj, property_name, interceptor) {
    'use strict';

    if (obj === undefined) {
        return;
    }

    var property_value = obj[property_name], property_descriptor = Object.getOwnPropertyDescriptor(obj, property_name) || {},
        is_property_enumerable = property_descriptor.enumerable, original_setter, original_getter, interceptors, getter, setter;

    original_setter = property_descriptor.set !== undefined && property_descriptor.set.original_setter === undefined ?
            property_descriptor.set : null;

    original_getter = property_descriptor.get !== undefined && property_descriptor.set.original_getter === undefined ?
            property_descriptor.get : null;

    interceptors = property_descriptor.set !== undefined && property_descriptor.set.interceptors !== undefined ?
            property_descriptor.set.interceptors : [];
    interceptors.push(interceptor);

    getter = function () {
        var get = Object.getOwnPropertyDescriptor(this, property_name).set.original_getter;

        if (!this.hasOwnProperty(property_name)) {
            return undefined;
        }

        if (get !== null) {
            return get.call(this);
        }

        return property_value;
    };

    setter = function (value) {
        var set = Object.getOwnPropertyDescriptor(this, property_name).set.original_setter, i;

        for (i = 0; i < interceptors.length; i += 1) {
            if (!interceptors[i](value)) {
                return;
            }
        }

        if (set !== null) {
            set.call(this, value);
        } else {
            property_value = value;
        }
    };

    setter.original_setter = original_setter;
    setter.original_getter = original_getter;
    setter.interceptors = interceptors;

    Object.defineProperty(obj, property_name, {
        get: getter,
        set: setter,
        enumerable: is_property_enumerable
    });
};