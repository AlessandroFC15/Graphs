function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function getPerformanceTime(method, iterations) {
    var totalTime = 0;

    for (var i = 0; i < iterations; i++) {
        var inicio = performance.now();

        method();

        var fim = performance.now();

        totalTime += (fim - inicio);
    }

    var returnValue = totalTime / iterations;
	
	if (returnValue == 0) 
		return getPerformanceTime(method, iterations);
	else
		return returnValue;
}