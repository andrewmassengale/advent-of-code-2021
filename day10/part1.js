const fs = require('fs');
const path = require('path');

const fileData = fs.readFileSync(path.join(__dirname, 'input.txt'));
const grid = fileData
	.toString()
	.split('\r\n')
	.map((line) => line.split(''));

const START = 0;
const END = 1;
const POINTS = 2;
const charMaps = [
	[ '(', ')', 3 ],
	[ '[', ']', 57 ],
	[ '{', '}', 1197 ],
	[ '<', '>', 25137 ]
];
const starterChars = charMaps.map((charDeets) => charDeets[START]);
const endToStartMap = charMaps.reduce((obj, charDeets) => { obj[charDeets[END]] = charDeets[START]; return obj; }, { });
const illegalCharMap = charMaps.reduce((obj, charDeets) => { obj[charDeets[END]] = charDeets[POINTS]; return obj; }, { });

const isStarter = (char) => starterChars.indexOf(char) !== -1;

let points = 0;
grid.forEach((line) => {
	const stack = [ ];
	line.forEach((char) => {
		if (isStarter(char)) {
			stack.push(char);
		} else {
			const charToMatch = stack.pop();
			if (endToStartMap[char] !== charToMatch) {
				points += illegalCharMap[char];
			}
		}
	});
});

console.log(points);