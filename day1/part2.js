const fs = require('fs');
const path = require('path');

const fileData = fs.readFileSync(path.join(__dirname, 'input.txt'));
const data = fileData.toString().split('\r\n').map((measurement) => parseInt(measurement, 10));

const [ count ] = data.slice(2).reduce(([ count, previousMeasurement, currentMeasurements ], measurement) => {
	currentMeasurements.push(measurement);
	const sum = currentMeasurements.reduce((accum, num) => accum + num, 0);
	if (sum > previousMeasurement) {
		return [ ++count, sum, [ currentMeasurements[1], currentMeasurements[2] ] ];
	} else {
		return [ count, sum, [ currentMeasurements[1], currentMeasurements[2] ] ];
	}
}, [ 0, Infinity, [ data[0], data[1] ] ]);

console.log(count);