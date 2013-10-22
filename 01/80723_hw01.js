Function.prototype.times=function(n) {
  var res = this;
  var that = this;
  var compose = function(f1,f2) {
	return function (arg) {
		return f1.call(null, f2(arg));
	}
};
  if (n<=1) {
   return that;
  }
  while (n>1) {
    res = compose(that, res);
    n--;
  }
  return res;
}

Array.prototype.unique = function() {
  var copy = this.slice(0);
  var res = [];
  copy.sort();
  res.push(copy[0]);
  var i=0;
  while(i<copy.length) {
   if(copy[i]!=res[res.length-1]) {
     res.push(copy[i]);
   }
   i++;
  }
  return res;
}


Array.prototype.intersection = function(l) {
  var that=this;
  function isMember(x, list) {
    for(var i=0; i<list.length; i++) {
      if(x==list[i]) {
        return true;
      }
    }
    return false;
  }
  var res = [];
  for (var i=0; i<that.length; i++) {
    if(isMember(that[i], l)==true && isMember(that[i], res)==false) {
      res.push(that[i]);
     }
   }
   return res;
}