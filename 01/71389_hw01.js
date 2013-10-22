Function.prototype.times = function (n) {
    "use strict";
    var that = this;
    return function () {
        var args = Array.prototype.slice.apply(arguments);
        if (n <= 1) {
            return that.apply(null, args);
        }
        return that.apply(null, [that.times(n - 1).apply(null, args)]);
    };
};

Array.prototype.unique = function () {
    "use strict";
    var unique = [], i;
    for (i = 0; i < this.length; i += 1) {
        if (this[i] !== undefined && unique.indexOf(this[i]) === -1) {
            unique.push(this[i]);
        }
    }
    return unique;
};

Array.prototype.intersect = function (other) {
    "use strict";
    var intersect = [], i;
    for (i = 0; i < this.length; i += 1) {
        if (this[i] !== undefined && intersect.indexOf(this[i]) === -1 && other.indexOf(this[i]) !== -1) {
            intersect.push(this[i]);
        }
    }
    return intersect;
};
