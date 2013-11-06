
if (!Object.snoop)
    Object.snoop = function (that,prop, handler) {
        var newval = that[prop];
        if (delete that[prop]) { // can't snoop constants
                Object.defineProperty(that, prop, {
                    get: function () {
                        //console.log("getter");
                        return newval;
                    },
                    set: function (val) {
                        //console.log("setter");
                        if(handler.call(that,val))
                        return newval = val;
                    },
                    configurable: true
                });
            
        }
    };

