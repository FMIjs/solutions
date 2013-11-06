if (!Object.prototype.watch) {
            Object.defineProperty(Object.prototype, "watch", {
                enumerable: false
            , configurable: true
            , writable: false
            , value: function (prop, handler) {
                var
                oldval = this[prop]
                , newval = oldval
                , getter = function () {
                    return newval;
                }
                , setter = function (val) {
                    oldval = newval;
                    return newval = handler.call(this, prop, oldval, val);
                }
                ;
                if (delete this[prop]) { // can't watch constants
                    Object.defineProperty(this, prop, {
                        get: getter
                    , set: setter
                    , enumerable: true
                    , configurable: true
                    });
                }
            }
            });
        }

        Object.snoop = function (obj, prop, filter) {
            obj.watch(prop, function (prop, oldVal, newVal) {
                if (filter(newVal)) {
                    return newVal;
                }
                else {
                    return oldVal;
                }
            });
        };