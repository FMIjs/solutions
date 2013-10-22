//1
Function.prototype.times = function(times) {
    var that = this;

    return function(num) {
        for(var i = 0; i < times; i++)
        {
            num = that(num);
        }
        
        return num;    
    };
};

var add_two = function (num) { return num + 2; };
var add_six = add_two.times(3);
add_six(2);


//2
Array.prototype.unique = function() {
    var arr = [], i;
	
	for (i = 0; i < this.length; i++)
	{
		if(arr.indexOf(this[i]) === -1)
		{
			arr.push(this[i]);
		}
	}
	
	return arr;
};


//3
Array.prototype.intersect = function(secondArray) {
    var result = this,
		i;
	
	for (i = 0; i < result.length; i++)
	{
		if(secondArray.indexOf(result[i]) === -1)
		{
			result.splice(i, 1);
			i--;
		}
	}
	
	return result;
};
