(function () {
    Function.prototype.times = function (n) {
        'use strict';
        // inner function
        var thisFunc = this;
        var returnFunc = function () {
            var returnValue = undefined;
            // arguments to invoke inner function
            var args = arguments; // [2]
            for (var i = 0; i < n; i++) {
                // f(f(f(f(a)))) etc...
                returnValue = thisFunc.apply(null, args);
                args = [returnValue];
            }
            return returnValue;
        };
        return returnFunc;
    }

    //var add_two = function (num) { return num + 2; };
    //var add_six = add_two.times(3);




    //----------------------------------------------------------
    //task 2
    Array.prototype.unique = function () {
        'use strict';
        var r, o, i, j, t, tt;
        r = [];
        o = {};
        for (i = 0; i < this.length; i++) {
            t = this[i];
            tt = o[t] = o[t] || [];
            for (j = 0; j < tt.length; j++)
                if (tt[j] === this[i])
                    break;
            if (j == tt.length)
                r.push(tt[j] = t);
        }
        return r;
    }
})();