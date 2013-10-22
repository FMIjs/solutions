Function.prototype.times = function (times) {
    var that = this;
    return function (number) {
        var result = number;
        for (var i = 0; i < times; i++) {
            result = that(result);
        }
        return result;
    };
};

Array.prototype.unique = function(){
    var distinct = [];
    for(var i=0; i<this.length; i++) {
        if(distinct.indexOf(this[i]) == -1){
             distinct.push(this[i]);   
        }
    }
    return distinct;
};
var a = [2,3,5,5,3,6];
a.unique();

Array.prototype.intersect = function(){
    var result = [];
    for(var i=0; i< this.length; i++) {
        if(b.indexOf(this[i]) > -1 && result.indexOf(this[i]) == -1){
             result.push(this[i]);   
        }
    }
    return result;
};
var b = [6,3,5,6,3,8];
a.intersect(b);





