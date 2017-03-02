function add(a,b){
	return a + b;
}

function multiply(a,b){
	return a * b;
}

// standard currying
function curry(fn){
	var fnLength = fn.length;
	return (
		function doit(){
			var totalArgs = Array.prototype.slice.call(arguments);
			// console.log('totalArgs', totalArgs);
			return function(){
				var localArgs = totalArgs.slice();
				// console.log('localArgs', localArgs);
				Array.prototype.push.apply(localArgs, arguments);
				if(localArgs.length >= fnLength){
					return fn.apply(null, localArgs);
				}else{
					return doit.apply(null, localArgs);
				}
			}
		}
	);
}

var a = curry(add);
// var s = a(1,2)(3,4);
var s = a(1)(4);
console.log('standard curry', s);


// accumulative currying
function accumulativeCurry(fn){
	var fnLength = fn.length;
	return (
		function doit(){
			var totalArgs = Array.prototype.slice.call(arguments);
			return function(){
				var localArgs = totalArgs.slice();
				// console.log(arguments.length);
				Array.prototype.push.apply(localArgs, arguments);
				if(arguments.length > 0){
					// check fn's argument length
					// TODO: ignored the multiple arguments situation here, just assumed one argument
					// otherwise there will be a while-loop to do accumulation
					if(localArgs.length === fnLength){
						// make new array
						localArgs = [fn.apply(null, localArgs)];
					}
					return doit.apply(null, localArgs);
				}else{
					return localArgs;
				}
			}
		}
	);
}


var ba = accumulativeCurry(add);
var bm = accumulativeCurry(multiply);
var f = ba(1)(2)(3)(4)(5)(6);
// var f = bm(1)(2)(3)(4);
console.log('accumulative curry', f());


