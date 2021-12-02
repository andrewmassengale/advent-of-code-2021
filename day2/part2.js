const fs = require('fs');
const path = require('path');

const fileData = fs.readFileSync(path.join(__dirname, 'input.txt'));
const data = fileData
	.toString()
	.split('\r\n')
	.map((input) => input.split(' '))
	.map(([ dir, distance ]) => ([ dir.toLowerCase(), parseInt(distance) ]));

const { horizontal, depth, aim } = data.reduce(({ horizontal, depth, aim }, [ dir, distance ]) => {
	switch (dir) {
		case 'forward': horizontal += distance; depth += aim * distance; break;
		case 'down': aim += distance; break;
		case 'up': aim -= distance; break;
	}
	return { horizontal, depth, aim };
}, { horizontal: 0, depth: 0, aim: 0 });

console.log(horizontal, depth, aim, horizontal * depth);