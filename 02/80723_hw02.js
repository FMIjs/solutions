Object.snoop = function(obj, field, func) {
	var g = obj.__lookupGetter__(field);
	if (obj.snoopFields == undefined) {
		obj.snoopFields = new Array();
		obj.snoopFuncs = new Array();
		obj.snoopVals = new Array();
	}
	if (obj.snoopFields.indexOf(field) == -1) {
		obj.snoopFields.push(field);
		obj.snoopFuncs.push(new Array());
	}
	obj.snoopFuncs[obj.snoopFields.indexOf(field)].push(func);
	obj.snoopVals[obj.snoopFields.indexOf(field)] = obj[field];
	
    obj.__defineSetter__(field, function(val) {
		var flag = true;
		var funcs = obj.snoopFuncs[obj.snoopFields.indexOf(field)];
		for (var i=0;i<funcs.length;i++) {
			if (funcs[i](val)==false) {
				flag = false;
			}
		}
		if (flag) {
			obj.snoopVals[obj.snoopFields.indexOf(field)] = val;
		}
    });
	
	if (!g) {    
		obj.__defineGetter__(field, function() {
			return obj.snoopVals[obj.snoopFields.indexOf(field)];
		});
	}
}