const fs = require('fs');
const path = require('path');

const fileData = fs.readFileSync(path.join(__dirname, 'input.txt'));
const grid = fileData
	.toString()
	.split('\n')
	.map((line) => line.split('').map((n) => parseInt(n, 10)) );

const maxY = grid.length - 1;
const maxX = grid[0].length - 1;
let risks = 0;
grid.forEach((line, y) => {
	line.forEach((n, x) => {
		if (
			(
				y - 1 < 0 ||
				grid[y - 1][x] > n
			) &&
			(
				x + 1 > maxX ||
				grid[y][x + 1] > n
			) &&
			(
				y + 1 > maxY ||
				grid[y + 1][x] > n
			) &&
			(
				x - 1 < 0 ||
				grid[y][x - 1] > n
			)
		) {
			risks += 1 + n;
		}
	});
});
console.log(risks);