Object.snoop = function (obj, prop, rule)  {
	(function() {
		var bValue = obj[prop];
		Object.defineProperty(obj, prop, {
			get: function () {
				return bValue;
			},
			set: function (newValue) {
				if (rule(newValue)) {
					bValue = newValue;
				}
			},
			enumerable : true,  
			configurable : true
		}); 
	})();
}

