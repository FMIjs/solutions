/*
 * Домашно 1
 * Михаил Нколов, ФН: 80527
 *
 * Условия: https://github.com/kunev/js-assignments-2013/tree/master/01
 */

// Задача 1
Function.prototype.times = function (n) {
	var self = this;

	return function (a) {
        var r = self(a), i;
        
        if(n <= 1) {
            return r;
        }

        for(i = 1; i < n; i++) {
            r = self(r);
        }

        return r;
	};
}

// Задача 2
Array.prototype.unique = function () {
    var unique = [], i, j, unique_flag;

    for(i = 0; i < this.length; i++) {
        unique_flag = true;

        for(j = 0; j < unique.length; j++) {
            if(this[i] == unique[j]) {
                unique_flag = false;
                break;
            }
        }

        if(unique_flag) {
            unique.push(this[i]);
        }
    }

    return unique;
}

// Задача 3
Array.prototype.intersect = function (second_array) {
    var intersect = [], i, j, in_both;

    for(i = 0; i < this.length; i++) {
        in_both = false;

        for(j = 0; j < second_array.length; j++) {
            if(this[i] == second_array[j]) {
                in_both = true;
                break;
            }
        }

        if(in_both) {
            intersect.push(this[i]);
        }
    }

    // използвам функцията от предната задача
    return intersect.unique();
}
