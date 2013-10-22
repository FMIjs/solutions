Function.prototype.times = function (n) {
    var func = this;
    var newArg;
    return function (arg) {
        if (n <= 1)
            return func.call(this, arg);
        else
            newArg = func.call(this, arg);
            n--;
            return func.times(n).call(this, newArg);
    }
}

Object.prototype.unique = function () {
    var obj = this;
    var uniqueObj = [];
    var uniqueIndex = 0;
    for (var i = 0; i < obj.length; i++) {
        if (uniqueObj.indexOf(obj[i]) == -1) {
            uniqueObj[uniqueIndex] = obj[i];
            uniqueIndex++;
        }
    }
    return uniqueObj;
}

Object.prototype.intersect = function (otherObj) {
    var thisObj = this;
    var objElem;
    var intersectObj = [];
    var interesctIndex = 0;
    if(thisObj.length < otherObj.length) {
        for (var i = 0; i < otherObj.length; i++) {
            objElem = otherObj[i];
            if (thisObj.indexOf(objElem) != -1) {
                intersectObj[interesctIndex] = objElem;
                interesctIndex++;
            }
        }
    }
    else {
        for (var i = 0; i < thisObj.length; i++) {
            objElem = thisObj[i];
            if (otherObj.indexOf(objElem) != -1) {
                intersectObj[interesctIndex] = objElem;
                interesctIndex++;
            }
        }
    }
    return intersectObj;
}