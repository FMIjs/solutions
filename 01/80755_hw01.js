Function.prototype.times = function () {
	var count = arguments[0]<1 ? 1 : arguments[0];
	var that = this;
	return function (num) {
		var t = that(num);
		for (var i=2; i<=count; i++) {
			t = that(t);
		}
		return t;
	}
};

Array.prototype.unique = function () {
	var temp = {};
	this.map(function (el) {
		(!this.hasOwnProperty(el) && temp[el]) ? "" : temp[el]=1;
	});
	return Object.keys(temp).map(function (el) { return Number(el); });
};

Array.prototype.intersect = function (arr) {
	var temp = [];
	this.unique().map(function (el) {
		(!this.hasOwnProperty(el) && arr.indexOf(el) != -1) ? temp.push(el) : "";			
	});
	return temp;
};
