Object.prototype.snoop = function(target, prop, handler) {
    var oldval = target[prop],
		newval = oldval,
        getter = function () {
            return newval;
        },
        setter = function (val) {
            if(handler(val)){
                newval = val;
            }
        };

    if (delete target[prop]) {
        if (Object.defineProperty) {
            Object.defineProperty(target, prop, {
                get: getter,
                set: setter,
                enumerable: target.propertyIsEnumerable(prop),
                configurable: true
            });
        }
    }
    return this;
};