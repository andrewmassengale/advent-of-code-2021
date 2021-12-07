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

let leastFuelPos = -1;
let leastFuel = Infinity;
for (let x = 0; x <= highest; ++x) {
	let usedFuel = 0;
	crabs.forEach((pos) => {
		usedFuel += Math.abs(pos - x);
	});
	if (usedFuel < leastFuel) {
		leastFuelPos = x;
		leastFuel = usedFuel;
	}
}

console.log(leastFuel);