const fs = require('fs');
const path = require('path');

const fileData = fs.readFileSync(path.join(__dirname, 'input.txt'));
const data = fileData
	.toString()
	.split('\r\n');

const boardSize = 5;

const balls = data[0].split(',').map((num) => parseInt(num, 10));

let boards = data.slice(2).reduce((boards, line) => {
	if (line === '') {
		return boards;
	}
	let lastBoardIdx = boards.length - 1;
	if (boards[lastBoardIdx].nums.length === boardSize * boardSize) {
		boards.push({ nums: [ ], lines: [ ] });
		const verts = [ ];
		for (let i = 0; i < boardSize; verts[i++] = [ ]);
		boards[lastBoardIdx].lines.forEach((line) => {
			line.forEach((num, numIdx) => {
				verts[numIdx].push(num);
			});
		});
		boards[lastBoardIdx].lines = boards[lastBoardIdx].lines.concat(verts);
		++lastBoardIdx;
	}
	const nums = line.split(' ').filter(Boolean).map((num) => parseInt(num, 10));
	boards[lastBoardIdx].nums = boards[lastBoardIdx].nums.concat(nums);
	boards[lastBoardIdx].lines.push(nums);
	return boards;
}, [ { nums: [ ], lines: [ ] } ]);

let found = 0;
balls.every((ball) => {
	boards = boards.map((board) => {
		const ballNumIdx = board.nums.indexOf(ball);
		if (ballNumIdx !== -1) {
			board.nums.splice(ballNumIdx, 1);
		}

		let foundLine = false;
		board.lines = board.lines.map((line) => {
			ballLineIdx = line.indexOf(ball);
			if (ballLineIdx !== -1) {
				line.splice(ballLineIdx, 1);
			}
			if (line.length === 0 && boards.length > 1) {
				foundLine = true;
			} else if (line.length === 0) {
				found = board.nums.reduce((curSum, num) => curSum + num, 0) * ball;
			}

			return line;
		});

		if (foundLine) {
			return false;
		}

		return board;
	}).filter(Boolean);

	return (found === 0);
});

console.log(found);