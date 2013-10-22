'use strict';

Function.prototype.times=function(times){
    var theFn=this;

    return function(arg){
        for(var i=1;i<=times;i++){
            arg = theFn.call(this, arg);
        }

        return arg;
    }
}

Array.prototype.unique=function(){
    var uniqueHash={};
    var uniqueArr=[];

    for(var i=0;i<this.length;i++){
        if(this[i] in uniqueHash) continue;

        uniqueHash[this[i]]=1;
        uniqueArr.push(this[i]);
    }

    return uniqueArr;
};

Array.prototype.intersect = function(arr){
    var thisArrHash={};
    var intersectedArr=[];

    for(var i=0;i<this.length;i++) thisArrHash[this[i]]=1;

    for(i=0;i<arr.length;i++){
        if(arr[i] in thisArrHash) intersectedArr.push(arr[i]);
    }

    return intersectedArr;
}