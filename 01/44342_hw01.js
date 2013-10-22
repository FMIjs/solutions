Function.prototype.times = function(times) {
	var self = this;
	return function(){
		var args = Array.prototype.slice.apply(arguments), i = 0, result;
		for (; i < times; i++) {
			result = self.apply(self, args);
			args[0] = result;
		}
		return result;
	}
};

Array.prototype.unique = function () {
	var unique = [];
	for (var i = 0; i < this.length; i++)
	{
		if (unique.indexOf(this[i]) === -1) {
			unique.push(this[i]);
		}
	}
	return unique;
};

Array.prototype.intersect = function(other) {
	var intersection = [];

	if (this.length > other.length) {
		var longer = this, shorter = other;
	}
	else {
		var longer = other, shorter = this;
	}

	for (var i = 0; i < longer.length; i++)
	{
		if (shorter.indexOf(longer[i]) !== -1) {
			intersection.push(longer[i]);
		}
	}

	return intersection.unique();
};