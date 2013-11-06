(function (){
	if(!Function.prototype.compose){
		Function.prototype.compose = function(f) {
			var that = this;
			return function (arg) {
				if(f(arg))
				{
					return that.call(null, arg);
				}
				return false;
			}
		};
	}

	if (!Object.prototype.watch) {
		Object.defineProperty(Object.prototype, "watch", {
			enumerable: false
			, configurable: true
			, writable: false
			, value: function (prop, handler) {
				var
				oldval = this[prop]
				, oldhandler = this["setHandler"]
				, newval = oldval
				, newHandler = oldhandler ? handler.compose(oldhandler) : handler
				, getter = function () {
					return newval;
				}
				, setter = function (val) {
					oldval = newval;
					if(newHandler(val))
					{
						newval = val;
					}
					return newval;
				}
				;
				if (delete this[prop]) {
					Object.defineProperty(this, prop, {
						get: getter
						, set: setter
						, enumerable: true
						, configurable: true
					});
				}
				if(!this.hasOwnProperty("setHandler")){
					Object.defineProperty(this, "setHandler",{
						enumerable: true,
						configurable: true,
						writable: true,
						value: newHandler
					});
				}
				else{
					this["setHandler"] = newHandler;
				}
			}
		});
	}

	if(!Object.prototype.snoop)
	{
		Object.prototype.snoop = function (obj, propName, func) {
			obj.watch(propName, func)
		}
	}
}());
