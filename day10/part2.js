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
	[ '(', ')', 1 ],
	[ '[', ']', 2 ],
	[ '{', '}', 3 ],
	[ '<', '>', 4 ]
];
const starterChars = charMaps.map((charDeets) => charDeets[START]);
const endToStartMap = charMaps.reduce((obj, charDeets) => { obj[charDeets[END]] = charDeets[START]; return obj; }, { });
const startToEndMap = charMaps.reduce((obj, charDeets) => { obj[charDeets[START]] = charDeets[END]; return obj; }, { });
const endToPointMap = charMaps.reduce((obj, charDeets) => { obj[charDeets[END]] = charDeets[POINTS]; return obj; }, { });

const isStarter = (char) => starterChars.indexOf(char) !== -1;

let scores = [ ];
grid.forEach((line) => {
	let syntaxError = false;
	let stack = [ ];
	line.forEach((char) => {
		if (isStarter(char)) {
			stack.push(char);
		} else {
			const charToMatch = stack.pop();
			if (endToStartMap[char] !== charToMatch) {
				syntaxError = true;
			}
		}
	});

	if (!syntaxError) {
		let stack = [ ];
		line.forEach((char) => {
			if (isStarter(char)) {
				stack.push(char);
			} else {
				const charToMatch = stack.pop();
			}
		});
		const completedLine = [ ];
		stack.forEach((char) => {
			completedLine.unshift(startToEndMap[char]);
		});

		let score = 0;
		completedLine.forEach((char) => {
			score *= 5;
			score += endToPointMap[char];
		});
		scores.push(score);
	}
});

console.log(scores.sort((a, b) => a - b)[(scores.length + 1) / 2 - 1]);