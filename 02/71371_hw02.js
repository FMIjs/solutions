var conditions = {};
Object.prototype.snoop=function(obj,property,callback){
	if(!Array.isArray(conditions[obj])){
		conditions[obj+'_'+property] = Array();
	}
	conditions[obj+'_'+property].push(callback);
	var propertyInfo = Object.getOwnPropertyDescriptor(obj,property);
	var tempValue;
	if(propertyInfo===undefined){
		tempValue=undefined;
	}
	else if(propertyInfo.hasOwnProperty('value')){
		tempValue=propertyInfo.value;
	}
	else {
		tempValue=propertyInfo.get();
	}

		Object.defineProperty(obj,property,{

			get: function(){
					return tempValue;
				},

			set: function(value){
					for(var i=0;i<conditions[obj+'_'+property].length;i++){
						if(!conditions[obj+'_'+property][i](value)){
							return;
						}
					}
					tempValue=value;
				},
				configurable: true,
				enumerable: true
		});
}