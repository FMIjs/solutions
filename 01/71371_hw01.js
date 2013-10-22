Function.prototype.times = function (n) {
	var that=this;
	return function (x) {
		var i;
		if (x<=1)
		{
			return that(x);
		}
		for (i=0;i<n;i++){
			x=that(x);
		}
		return x;
	}
}
Array.prototype.unique = function () {
	var uniqueArray= new Array();
	var i;
	for  (i=0; i<this.length; i++) {
		if(uniqueArray.indexOf(this[i])==-1){
			uniqueArray.push(this[i]);
		}
	}
	return uniqueArray;
}
Array.prototype.intersect = function (inputArray) {
	var uniqueArray=this.unique();
	var intersect= new Array();
	var i;
	for (i=0;i<uniqueArray.length;i++){
		if(inputArray.indexOf(uniqueArray[i])>=0){
			intersect.push(uniqueArray[i]);
		}
	}
	return intersect;
}