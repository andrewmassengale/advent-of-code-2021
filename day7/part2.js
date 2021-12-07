const fs = require('fs');
const path = require('path');

const fileData = fs.readFileSync(path.join(__dirname, 'input.txt'));
let highest = 0;
const crabs = fileData
	.toString()
	.split(',')
	.map((pos) => {
		const num = parseInt(pos, 10);
		highest = num > highest ? num : highest;
		return num;
	});

function sumAll(start, end) {
	const arr = [ ];
	for (let x = start; x <= end; ++x) {
		arr.push(x);
	}
	const sum = arr.reduce((accum, num) => accum + num, 0);
	return sum;
}

let leastFuel = Infinity;
for (let x = 0; x <= highest; ++x) {
	let usedFuel = 0;
	crabs.forEach((pos) => {
		usedFuel += sumAll(1, Math.abs(pos - x));
	});
	if (usedFuel < leastFuel) {
		leastFuel = usedFuel;
	}
}

console.log(leastFuel);