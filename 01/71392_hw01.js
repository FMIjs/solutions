Function.prototype.times = function (timesToApply) {
	if (typeof timesToApply !== "number") {
		console.error("Argument must be a number");
		return;
	}

	var that = this;
	return function (someArg) {
		for (var i=0; i<timesToApply; i++) {
			someArg = that.call(null, someArg);
		}
		return someArg;
	}
}

Array.prototype.unique = function () {
	var set = [];
	for (var i=0; i<this.length; i++) {
		/* 
		 * undefined behaves strangely ... that's why it's removed
		 * Example: [,].indexOf([,][0]) returns -1 ... at least in v8
		 */
		if (set.indexOf(this[i]) === -1 && typeof this[i] !== "undefined")
			set.push(this[i]);
	}
	return set;
}

Array.prototype.intersect = function (arr) {
	var intersection = [];
	var uniqueThis = this.unique();
	for (var i=0; i<uniqueThis.length; i++) {
		if (arr.indexOf(uniqueThis[i]) !== -1) intersection.push(uniqueThis[i]);
	}
	return intersection;
}
