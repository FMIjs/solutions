Object.prototype.snoop = function(object, property, func){
	if(object.conditions == undefined){
		object.conditions = new Array();
		object.conditions[0] = func;	
	}
	else{
		object.conditions[object.conditions.length] = func;	
	}
    object.watch(property,function(id, oldVal, newVal){
        for(var i = 0; i < object.conditions.length; i++){
        	var condition = object.conditions[i];
        	if(!condition(newVal))
        		return oldVal;
        }
        return newVal
    });
}