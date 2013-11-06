Object.snoop = function(obj, key, fn){
    if(typeof Object.snoop.allSnooped=='undefined') Object.snoop.allSnooped=[];
    if(typeof Object.snoop.conditions=='undefined') Object.snoop.conditions={};

    var obj_i = Object.snoop.allSnooped.indexOf(obj);
    if(obj_i==-1){
        // Push the object in the unique array
        obj_i = Object.snoop.allSnooped.length;
        Object.snoop.allSnooped.push(obj);

        // Init the conditions obj with the array index
        Object.snoop.conditions[obj_i]={}
    }

    // Check if we don't have conditions for the given property of the given object
    if(typeof Object.snoop.conditions[obj_i][key]=='undefined')
    {
        // Initialize the conditions array for this property
        Object.snoop.conditions[obj_i][key]=[];

        // If the property already exists
        if(obj.hasOwnProperty(key)){
            var descr=Object.getOwnPropertyDescriptor(obj, key);

            // If this is a data property
            // add get and set to our "internal" descriptor for this property
            if(typeof descr.writable!='undefined'){
                var stored=obj[key];

                descr.get=function(){
                    return stored;
                };
                descr.set=function(newVal){
                    stored=newVal;
                };
            }

            Object.snoop.conditions[obj_i][key].descriptor=descr;
        }
        else{
            // The property doesn't exist so we create
            // our "internal" descriptor by adding simple get and set
            var stored=obj[key];
            Object.snoop.conditions[obj_i][key].descriptor={
                enumerable: false,
                get: function(){
                    return stored;
                },
                set: function(newVal){
                    stored=newVal;
                }
            }
        }
    }

    // Add the new condition to the array
    var conditions=Object.snoop.conditions[obj_i][key];
    conditions.push(fn);

    Object.defineProperty(obj, key, {
        configurable: true,
        enumerable: Object.snoop.conditions[obj_i][key].descriptor.enumerable,
        get: function(){
            // Check if there is a getter
            var fnGet = Object.snoop.conditions[obj_i][key].descriptor.get;
            if(typeof fnGet=='undefined') return;

            return fnGet.call(obj);
        },
        set: function(newValue){
            // Check if there is a setter
            var fnSet = Object.snoop.conditions[obj_i][key].descriptor.set;
            if(typeof fnSet=='undefined') return;

            // Check if all conditions are satisfied
            for(var i=0;i<conditions.length;i++){
                if( ! conditions[i](newValue)) return;
            }

            return fnSet.call(obj, newValue);
        }
    });
};