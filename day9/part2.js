
const fs = require('fs');
const path = require('path');

const fileData = fs.readFileSync(path.join(__dirname, 'input.txt'));
const grid = fileData
	.toString()
	.split('\n')
	.map((line) => line.split('').map((n) => ({ b: false, n: parseInt(n, 10) })));

const maxY = grid.length - 1;
const maxX = grid[0].length - 1;

const basins = [ ];

const crawlBasin = (x, y) => {
	const n = grid[y][x].n;
	grid[y][x].b = true;
	const dirs = [ ];

	if (y - 1 >= 0 && grid[y - 1][x].n === n + 1 && !grid[y - 1][x].b && grid[y - 1][x].n !== 9) {
		grid[y - 1][x].b = true;
		dirs.push([ x, y - 1 ]);
	}

	if (y + 1 <= maxY && grid[y + 1][x].n === n + 1 && !grid[y + 1][x].b && grid[y + 1][x].n !== 9) {
		grid[y + 1][x].b = true;
		dirs.push([ x, y + 1 ]);
	}

	if (x - 1 >= 0 && grid[y][x - 1].n === n + 1 && !grid[y][x - 1].b && grid[y][x - 1].n !== 9) {
		grid[y][x - 1].b = true;
		dirs.push([ x - 1, y ]);
	}

	if (x + 1 <= maxX && grid[y][x + 1].n === n + 1 && !grid[y][x + 1].b && grid[y][x + 1].n !== 9) {
		grid[y][x + 1].b = true;
		dirs.push([ x + 1, y ]);
	}

	return dirs;
}

const crawlGrid = (inX, inY, inN) => {
	let x = inX;
	let y = inY;
	let n = inN;
	let firstTime = true;
	while (true) {
		if (n === 9) {
			break;
		}
		if (y > maxY) {
			displayGrid();
			n += 1;
			x = 0;
			y = 0;
			firstTime = true;
			continue;
		}
		if (grid[y][x].n === n && !grid[y][x].b) {
			let basinStack = [ [ x, y ] ];
			let basinSize = 1;
			while (basinStack.length > 0) {
				const coords = basinStack.shift();
				const foundPoints = crawlBasin(coords[0], coords[1]);
				basinSize += foundPoints.length;
				basinStack = basinStack.concat(foundPoints);
			}
			basins.push(basinSize);
		}

		x = x + 1 > maxX ? 0 : x + 1;
		y = x === 0 && !firstTime ? y + 1 : y;
		firstTime = false;
	}
};

const displayGrid = () => {
	grid.forEach((line) => {
		let lineP = '';
		line.forEach((i) => {
			lineP += i.b ? `*${i.n} ` : ` ${i.n} `;
		});
		// console.log(lineP);
	});
	// console.log('--------');
}

crawlGrid(0, 0, 0);
// console.log(basins.sort((a, b) => a - b).reverse().slice(0, 3));

const top3BasinsMultipled = basins.sort((a, b) => a - b).reverse().slice(0, 3).reduce((product, size) => product * size, 1);

console.log(top3BasinsMultipled); // 1330560