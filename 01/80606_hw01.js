
Function.prototype.times = function(n) {
   var that = this;
   return function(arg) {
       var result = that.call(null,arg);
	   for(var i=1; i<n; i++) {
			result = that.call(null,result);
	   }
	   return result;
   }
};

Array.prototype.isInArray = function(elem) {
    var _this = this;
    for(var i = 0; i < _this.length; i++) {
        if(_this[i] === elem){
            return true;
        }
    }
    return false;
};  

Array.prototype.unique = function() {
    var array = [];
    var _this = this;
    for(var i = 0; i < _this.length; i++) {
        if(!array.isInArray(_this[i])) {
            array.push(_this[i]);
        }
    }
    return array; 
};

Array.prototype.intersect = function(other_array) {
    var this_arr = this;
    var array = [];
    for(var i=0; i < this_arr.length; i++) {
        if(other_array.isInArray(this_arr[i])) {
            array.push(this_arr[i]);
        }
    }
    return array;
}
