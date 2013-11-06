(function () {
    Object.defineProperty(o, "b", {
        get: function () { return bValue; },
        set: function (newValue) { bValue = newValue; },
        enumerable: true,
        configurable: true
    });

    Object.prototype.snoop = function (obj, prop, func) {
        var self = this;
        if (!obj.hasOwnProperty(prop)) {
            var shouldBeApplied = func.apply(self, Array.prototype.slice.call(arguments, 1));
            if (shouldBeApplied) {
                obj[prop] = func.arguments[0];
            }
            else {
                obj.defineProperty(prop);
            }
        }
    };

})();