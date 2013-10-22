Function.prototype.compose = function(f) {
    var that = this;
    return function (arg) {
        return that.call(null, f(arg));
    }
};

Function.prototype.times = function(n) {
    var that = this;    
    if(n <= 1) {
        return that;
    }
    return function (arg) {
        return that.compose(that.times(n-1))(arg);
    }
}

Array.prototype.unique = function() {
	var entryArr = this; 
	var uniqueArr = []; 
	for (var i = 0; i < entryArr.length; i++) 
	{ 
		if(isInArr(entryArr[i],uniqueArr)==0) 
		{
				uniqueArr.push(entryArr[i])
		}
	}
	return uniqueArr;
}

Array.prototype.intersection = function(secondArr) {
	var entryArr = this; 
	var interArr = []; 
	for (var i = 0; i < entryArr.length; i++) 
	{ 
		if(isInArr(entryArr[i],secondArr)==1) 
		{
				interArr.push(entryArr[i])
		}
	}
	return interArr;
}

var isInArr = function(a, array) { 
	for(var i = 0; i < array.length; i++) 
	{
		if(a == array[i])
		{ 
			return 1;
		}	
	} 
	return 0;
}
