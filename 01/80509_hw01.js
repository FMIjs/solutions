//task 1
var add1 = function(x){ return x + 1;};

Function.prototype.times = function(n){
	var self = this;

	return function (arg) {
		var result = arg;
		if(n < 1)
			n = 1;
		while(n > 0){
			result = self.call(null, result);
			n--;
		}
		
		return result;
	}
}

var add3 = add1.times(3);


//task 2
Array.prototype.unique = function(){
	var result = [];
	for (i = 0; i < this.length; i++){
		flag = false
		for(j = 0; j < result.length; j++) {
			if(this[i] == result[j])
				flag = true;
		}
		if(!flag){
			result.push(this[i]);
		}
	}
	return result;
}

var l1 = [1, 2, 3, 4, 5, 5, 5, 4, 6, 4];


//task 3
Array.prototype.intersect = function (array){
	var result = [];
	for (i=0; i < this.length; i++){
		for(j = 0; j < array.length; j++) {
			if(this[i] == array[j])
				result.push(this[i]);
		}
	}
	return result.unique();
}

var some_numbers = [1, 2, 3, 4, 5, 5];
var some_other_numbers = [5, 4, 7, 5, 10, 12, 2, 1];
