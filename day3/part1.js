const fs = require('fs');
const path = require('path');

const fileData = fs.readFileSync(path.join(__dirname, 'input.txt'));
const data = fileData
	.toString()
	.split('\r\n');

const countsInit = [ ];
for (let i = 0; i < data[0].length; countsInit[i++] = { 0: 0, 1: 0 });

const counts = data.reduce((counts, line) => {
	[...line].forEach((char, charIndex) => {
		counts[charIndex][char] = counts[charIndex][char] + 1;
	});
	return counts;
}, countsInit);

const gammaStr = counts.reduce((str, count) => str += (count[0] > count[1]) ? '0' : '1', '');
const epsilonStr = counts.reduce((str, count) => str += (count[0] > count[1]) ? '1' : '0', '');

const gamma = parseInt(gammaStr, 2);
const epsilon = parseInt(epsilonStr, 2);

console.log(parseInt(gamma * epsilon, 10));