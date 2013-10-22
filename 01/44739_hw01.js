
Function.prototype.times = function(val){
    var that = this;
    return function (arg) {
        if(val == 1) {
            return that.call(this,arg);
        } else{
            var newArg = that.call(this,arg);
            var newVal = val - 1;
            return that.times.call(that,newVal)(newArg);
        }
    }
}
// var add_two = function (num) { return num + 2; };
// var add_six = add_two.times(3);
// alert(add_six(2)); // 8

Array.prototype.unique = function(){
	return this.filter(function(elem, pos, self) {
	    return self.indexOf(elem) == pos;
	});
}

// var l1 = [1, 2, 3, 4, 5, 5, 5, 4, 6, 4];
// alert(l1.unique());

Array.prototype.intersect = function(other){
	return this.concat(other).unique();
}

// var some_numbers = [1, 2, 3, 4, 5];
// var some_other_numbers = [5, 4, 7, 10, 12, 2, 1];
// alert(some_other_numbers.intersect(some_numbers));