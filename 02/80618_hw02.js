Object.snoop = function(aObject, aProp, aFunc) {
    var self = aObject;
    var prop = aProp;
    var func = aFunc;
    var cache;
    if (self.hasOwnProperty(prop)) {
        cache = self[prop];
        delete self[prop];
        Object.defineProperty(self, prop, {
            get: function () {
                return cache;
            },
            set: function (newValue) {
                if (func(newValue)) {
                    cache = newValue;
                }
            },
            enumerable: true,
            configurable: true
        });
    }
    else {
        Object.defineProperty(self, prop, {
            get: function () {
                return cache;
            },
            set: function (newValue) {
                if (func(newValue)) {
                    cache = newValue;
                }
            },
            enumerable: true,
            configurable: true
        });
    }
}
