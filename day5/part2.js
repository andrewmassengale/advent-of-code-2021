const fs = require('fs');
const path = require('path');

const fileData = fs.readFileSync(path.join(__dirname, 'input.txt'));
const data = fileData
	.toString()
	.split('\r\n')
	.map(
		(line) => line.split(' -> ').map(
			(xy) => xy.split(',').map(
				(coord) => parseInt(coord, 10)
			)
		)
	);

const start = 0;
const end = 1;
const x = 0;
const y = 1;

const all = { };
const matches = { };
const detectMatch = (x, y) => {
	const sPoint = `${x},${y}`;
	if (!(sPoint in all)) {
		all[sPoint] = true;
	} else if (!(sPoint in matches)) {
		matches[sPoint] = true;
	}
}

data.forEach((line) => {
	if (line[start][x] === line[end][x]) {
		const yStart = line[start][y] > line[end][y] ? line[end][y] : line[start][y];
		const yEnd = line[start][y] > line[end][y] ? line[start][y] : line[end][y];

		const yDiff = yEnd - yStart;
		for (let i = 0; i <= yDiff; ++i) {
			detectMatch(line[start][x], yStart + i);
		}
	} else if (line[start][y] === line[end][y]) {
		const xStart = line[start][x] > line[end][x] ? line[end][x] : line[start][x];
		const xEnd = line[start][x] > line[end][x] ? line[start][x] : line[end][x];

		const xDiff = xEnd - xStart;
		for (let i = 0; i <= xDiff; ++i) {
			detectMatch(xStart + i, line[start][y]);
		}
	} else {
		const lStart = line[start][x] > line[end][x] ? line[end] : line[start];
		const lEnd = line[start][x] > line[end][x] ? line[start] : line[end];
		const yDir = lStart[y] > lEnd[y] ? -1 : 1;

		const diff = lEnd[x] - lStart[x];
		for (let i = 0; i <= diff; ++i) {
			const lY = i * yDir + lStart[y];
			detectMatch(lStart[x] + i, lY);
		}
	}
});

console.log(Object.keys(matches).length);