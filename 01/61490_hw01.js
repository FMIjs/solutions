Function.prototype.times = function(n) {
  var f = this;
  return function(x) {
    for (var i = 0, result = x; i < n || i < 1; i++)
      result = f(result);
    return result;
  };
};


Array.prototype.unique = function() {
  for (var i = 0, n = this.length, result = []; i < n; i++)
    if (this.indexOf(this[i]) == i)
      result.push(this[i]);
  return result;
};


Array.prototype.intersect = function(other) {
  for (var i = 0, n = this.length, result = []; i < n; i++)
    if (other.indexOf(this[i]) != -1)
      result.push(this[i]);
  return result;
};
