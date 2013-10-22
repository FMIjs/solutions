
Function.prototype.times = function(n) {
	if (n < 1)
		n = 1;
	
	var this_stored = this;//Can't use this.times(....) in the else statement.
	return function(num) {
		if (n == 1) {
			return this_stored(num);
		} else {
			return this_stored.times(n - 1)(this_stored(num));
		}
	};
}

Array.prototype.unique = function() {
	return this.filter(function(value, index, array) {
		return array.lastIndexOf(value) === index;
	});
};

Array.prototype.intersect = function(other) {
	return this.filter(function(value, index, array) {
		return other.indexOf(value) !== -1;
	}).unique();
};
