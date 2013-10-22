//* Задача 1 *//
Function.prototype.times=function(n) 
{
    Function.prototype.compose = function(f) {
    var that = this;
    return function (arg) {
    return that.call(null, f(arg));
    }    
    };
    
    var self = this;
    if (n<=1) {
       n=1;
    }
    for(var i=1; i<=n-1; i++)
    {
        self = this.compose(self);  
    } 
    return self; 
}
 

//* Задача 2 *//
Array.prototype.unique = function(){
   var uniList = {}, result = [];
   for(var i = 0, l = this.length; i < l; ++i){
      if(uniList.hasOwnProperty(this[i])) {
         continue;
      }
      result.push(this[i]);
      uniList[this[i]] = 1;
   }
   return result;
}
//* Задача 3 *//
Array.prototype.intersect = function(b){
	var a=this;
	var result = new Array();
 while( a.length > 0 && b.length > 0 )
  {  
     if      (a[0] < b[0] ){ a.shift(); }
     else if (a[0] > b[0] ){ b.shift(); }
     else 
     {
       result.push(a.shift());
       b.shift();
     }
  }

  return result;
}

