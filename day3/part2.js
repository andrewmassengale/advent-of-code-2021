const fs = require('fs');
const path = require('path');

const fileData = fs.readFileSync(path.join(__dirname, 'input.txt'));
const data = fileData
	.toString()
	.split('\r\n');

function findNext(items, pos, commonality) {
	if (items.length === 1) {
		return items[0];
	}

	const counts = items.reduce((counts, line) => {
		counts[[...line][pos]].push(line);
		return counts;
	}, { 0: [ ], 1: [ ] });

	if (commonality === 'most') {
		return findNext(counts[0].length > counts[1].length ? counts[0] : counts[1], pos + 1, commonality);
	} else {
		return findNext(counts[0].length > counts[1].length ? counts[1] : counts[0], pos + 1, commonality);
	}
}

const oxygenGeneratorRating = parseInt(findNext(data, 0, 'most'), 2);
const co2Scrubber = parseInt(findNext(data, 0, 'least'), 2);

console.log(parseInt(oxygenGeneratorRating * co2Scrubber, 10));