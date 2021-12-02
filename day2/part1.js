const fs = require('fs');
const path = require('path');

const fileData = fs.readFileSync(path.join(__dirname, 'input.txt'));
const data = fileData
	.toString()
	.split('\r\n')
	.map((input) => input.split(' '))
	.map(([ dir, distance ]) => ([ dir.toLowerCase(), parseInt(distance) ]));

const { horizontal, depth } = data.reduce(({ horizontal, depth }, [ dir, distance ]) => {
	switch (dir) {
		case 'forward': horizontal += distance; break;
		case 'down': depth += distance; break;
		case 'up': depth -= distance; break;
	}
	return { horizontal, depth };
}, { horizontal: 0, depth: 0 });

console.log(horizontal, depth, horizontal * depth);