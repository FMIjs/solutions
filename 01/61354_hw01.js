Function.prototype.compose = function(f) {
    var that = this;
    return function (arg) {
        return that.call(null, f(arg));
    }
};

Function.prototype.times = function(n){
    if(n<1)
	{
	   n = 1;
	}
	var result;
	var that = this;
	return function(arg)
	{
	    var current = that;
		for(var i=0; i<n-1; i++){
			current = that.compose(current);
		}
		return current(arg);
	}
	
};

Array.prototype.unique = function(){
    var uniques = [];
    for(var i=0; i<this.length; i++)
    {     
     var current = this[i];
     if(uniques.filter(function(u){
            return u == current;
        }).length === 0)
     {
         uniques.push(current);
     }
    }
    return uniques;
};

Array.prototype.intersect = function(otherArray){
    var intersection = [];
    for(var i=0; i<this.length; i++)
    {     
     var current = this[i];
     if(otherArray.filter(function(u){
            return u == current;
        }).length > 0)
     {
         intersection.push(current);
     }
    }
    return intersection;
};