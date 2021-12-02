const fs = require('fs');
const path = require('path');

const fileData = fs.readFileSync(path.join(__dirname, 'input.txt'));
const data = fileData.toString().split('\r\n').map((measurement) => parseInt(measurement, 10));

const [ count ] = data.reduce(([ count, previousMeasurement ], measurement) => {
	if (measurement > previousMeasurement) {
		++count;
	}
	return [ count, measurement ];
}, [ 0, Infinity ]);

console.log(count);