
Object.prototype.snoop = function(obj, property, fn) {
	var descriptor = Object.getOwnPropertyDescriptor(obj, property);
	
	if (descriptor === undefined) {
		descriptor = { enumerable: true };
	}
	
	var property_value = obj[property];
	
	delete obj[property];//Delete the old non-configurable property
	
	var new_descriptor = { configurable: true, enumerable: descriptor.enumerable };
	
	if (descriptor.set !== undefined) {
		new_descriptor.get = function() {
			return descriptor.get();
		}
		
		new_descriptor.set = function(value) {
			if (fn(value)) {
				descriptor.set(value);
			}
		}
	} else {
		new_descriptor.get = function() {
			return property_value;
		}
		
		new_descriptor.set = function(value) {
			if (fn(value)) {
				property_value = value;
			}
		}
	}
	
	Object.defineProperty(obj, property, new_descriptor);
}
