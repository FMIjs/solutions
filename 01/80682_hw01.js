Array.prototype.unique = function() {
	return this.filter(function(element, index, array) {
		return array.indexOf(element, index + 1) === -1;
	});
}

Array.prototype.intersect = function(other) {
	return this.unique().filter(function(element) {
		return other.indexOf(element) != -1;
	});
}

Function.prototype.times = function(times) {
	var that = this;
	if (times < 1) {
		times = 1;
	}
	return function(arg) {
		result = that.call(null, arg);
		for(var i = 1; i < times; ++i) {
			result = that.call(null, result);
		}
		return result;
	}
}