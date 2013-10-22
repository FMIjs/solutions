Function.prototype.times = function(times) {
    if (times < 1) {
        times = 1;
    }

    var self = this;

    return function(input) {
        for (var i = 0; i < times; i++) {
            input = self.call(null, input);
        }

        return input;
    }
}

Array.prototype.fuzzyIndexOf = function(value) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == value) {
            return i;
        }
    }

    return -1;
}

Array.prototype.unique = function() {
    return this.filter(
        function(value, index, array) {
            return (array.fuzzyIndexOf(value) >= index)
        }
    )
}

Array.prototype.intersect = function(other) {
    var array = this.unique();
    var result = [];

    for (var i = 0; i < array.length; i++) {
        if (other.fuzzyIndexOf(array[i]) >= 0) {
            result.push(array[i]);
        }
    }

    return result;
}
