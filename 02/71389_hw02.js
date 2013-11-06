/*jslint nomen: true*/
"use strict";
Object.prototype.snoop = function (obj, property, callback) {
    var setter,
        getter,
        propinfo = Object.getOwnPropertyDescriptor(obj, property);

    if (obj.__lookupSetter__(property) !== undefined) {
        setter = obj.__lookupSetter__(property);
    } else if (propinfo.set !== undefined) {
        setter = propinfo.set;
    }

    if (obj.__lookupGetter__(property) !== undefined) {
        getter = obj.__lookupGetter__(property);
    } else if (propinfo.get !== undefined) {
        getter = propinfo.get;
    }

    if (propinfo === undefined || propinfo.configurable !== false) {
        Object.defineProperty(obj, '_' + property + '_snoop', {
            value : obj[property],
            enumerable: false,
            configurable: true,
            writable: true
        });
        Object.defineProperty(obj, property, {
            get : function () {
                if (getter !== undefined) {
                    return getter.call(this);
                }
                return this['_' + property + '_snoop'];
            },
            set : function (value) {
                if (callback(value) && ((setter !== undefined && setter.call(this, value) !== false) || setter === undefined)) {
                    this['_' + property + '_snoop'] = value;
                    return true;
                }
                return false;
            },
            enumerable : ((propinfo === undefined) ? true : propinfo.enumerable),
            configurable: true
        });
    }
};
