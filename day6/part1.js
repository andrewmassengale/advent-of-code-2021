const fs = require('fs');
const path = require('path');

const fileData = fs.readFileSync(path.join(__dirname, 'input.txt'));
const data = fileData
	.toString()
	.split(',')
	.map((num) => parseInt(num, 10));

const days = 80;
const reset = 6;
const spawn = 8;

for (let i = 0; i < days; ++i) {
	const size = data.length;
	let add = 0;
	for (let y = 0; y < size; ++y) {
		let aSize = data[y];
		if (aSize === 0) {
			data.splice(y, 1, reset);
			++add;
		} else {
			data.splice(y, 1, --aSize);
		}
	}
	for (let z = 0; z < add; ++z) {
		data.push(spawn);
	}
}

console.log(data.length);