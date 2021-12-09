const fs = require('fs');
const path = require('path');

const fileData = fs.readFileSync(path.join(__dirname, 'input.txt'));
const lines = fileData
	.toString()
	.split('\n')
	.map((line) => line.split(' | ').map((entry) => entry.split(' ')) );

const DIGIT = 0;
const NUM = 1;
const uniques = [
	[ 1, 2 ],
	[ 4, 4 ],
	[ 7, 3 ],
	[ 8, 7 ]
];

let uniqueCount = 0;

lines.forEach((line) => {
	line[1].forEach((entry) => {
		const isUnique = (uniques.findIndex(([ _, num]) => num === entry.length) !== -1);
		if (isUnique) {
			++uniqueCount;
		}
	});
});

console.log(uniqueCount);