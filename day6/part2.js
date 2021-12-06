const fs = require('fs');
const path = require('path');

const fileData = fs.readFileSync(path.join(__dirname, 'input.txt'));
let fish = new Array(9).fill(0);
fileData
	.toString()
	.split(',')
	.forEach((num, idx) => { ++fish[parseInt(num, 10)]; });

const days = 256;

for (let i = 0; i < days; ++i) {
	fish = fish.map((_, idx) => {
		if (idx === fish.length - 1) {
			return fish[0];
		} else {
			return fish[idx + 1];
		}
	});
	fish[fish.length - 3] += fish[fish.length - 1];
}

console.log(fish.reduce((sum, num) => sum + num, 0));