Object.snoop = function (object, property, predicate) {
	if (
		typeof object !== 'object' ||
		typeof property !== 'string' ||
		typeof predicate !== 'function'
	) throw 'Invalid arguments. Expecting: (object, string, function)';

	var prop;
	if (object.hasOwnProperty(property)) prop = object[property];

	/* To save the getter and setter if the property has an accessor descriptor */
	var descriptorSetter;
	var descriptorGetter;
	var descriptor = Object.getOwnPropertyDescriptor(object, property);

	if (descriptor) {
		/* Cannot snoop non-writable or non-configurable properties. */
		if (
			descriptor.configurable === false || 
			descriptor.writable === false
		) return;
		
		if (descriptor.hasOwnProperty('set')) descriptorSetter = descriptor.set;
		if (descriptor.hasOwnProperty('get')) descriptorGetter = descriptor.get;
	}
	
	if (!object.hasOwnProperty('__predicates')) {
		Object.defineProperty(object, '__predicates', {
			enumerable: false,
			value : {}
		});
	}
	
	if (!object.__predicates.hasOwnProperty(property)) {
		Object.defineProperty(object.__predicates, property, {
			enumerable: true,
			value : []
		});
	}

	object.__predicates[property].push(predicate);

	/* Define/modify accessors */
	Object.defineProperty(object, property, {
		configurable : true,
		get : function () {
			if (descriptorGetter) return descriptorGetter();
			else return prop;
		},
		set : function (value) { 
			var pass = true;
			for  (var currentPredicate in object.__predicates[property]) {
				if (!object.__predicates[property][currentPredicate](value)) {
					pass = false;
					break;
				}
			}
			if (pass) {
				if (descriptorSetter) descriptorSetter(value);
				else prop = value;
			}
		}
	});
};
