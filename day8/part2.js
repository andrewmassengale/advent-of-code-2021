const fs = require('fs');
const path = require('path');

const fileData = fs.readFileSync(path.join(__dirname, 'input.txt'));
const lines = fileData
	.toString()
	.split('\n')
	.map((line) => line.split(' | ').map((entry) => entry.split(' ')) );

const groupBy = (arr) =>
	arr.reduce((rv, x) => {
		if (!rv[x.length]) rv[x.length] = [];
		rv[x.length].push(x.split('').sort());
		return rv;
	}, {});

function uniq(a, num = 1) {
	// create a map from value -> count(value)
	var counts = a.reduce(function(o, k) {
		o[k] = o[k] ? o[k] + 1 : 1;
		return o;
	}, {});
	
	// find those that only appeared once
	return Object.keys(counts).filter(function(k) {
		return (counts[k] === num);
	});
}

const allDigits = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g' ];

const numsToSum = [ ];
lines.forEach((line) => {
	const slots = {
		T: '',
		TL: '',
		TR: '',
		M: '',
		BL: '',
		BR: '',
		B: ''
	};
	const nums = {
		0: [ ],
		1: [ ],
		2: [ ],
		3: [ ],
		4: [ ],
		5: [ ],
		6: [ ],
		7: [ ],
		8: [ ],
		9: [ ]
	};
	const groups = groupBy(line[0]);
	const all6 = groups['6'][0].concat(groups['6'][1]).concat(groups['6'][2]);

	slots.T = groups['3'][0].filter(n => !groups['2'][0].includes(n))[0];
	slots.BR = uniq(groups['2'][0].concat(all6), 4)[0];
	slots.TR = groups['3'][0].filter(n => ![ slots.T, slots.BR ].includes(n))[0];
	slots.BL = uniq(groups['6'].filter(n => n.includes(slots.TR)).concat(groups['4']).flat())[0];

	const found6 = groups['6'].find(n => !n.includes(slots.TR));

	slots.B = found6.filter(n => n !== slots.T && !groups['4'][0].includes(n) && n !== slots.BL)[0];
	slots.M = uniq(groups['6'].filter(n => n.includes(slots.TR)).flat()).filter(n => n !== slots.BL)[0];
	slots.TL = groups['7'][0].filter(n => n !== slots.T && n !== slots.TR && n !== slots.M && n !== slots.BL && n !== slots.BR && n !== slots.B)[0];

	nums[0] = groups['6'].filter(n => n.sort().toString() === [ slots.T, slots.TL, slots.TR, slots.BL, slots.BR, slots.B ].sort().toString())[0].sort().toString();
	nums[1] = groups['2'][0].sort().toString();
	nums[2] = groups['5'].filter(n => n.sort().toString() === [ slots.T, slots.TR, slots.M, slots.BL, slots.B ].sort().toString())[0].sort().toString();
	nums[3] = groups['5'].filter(n => n.sort().toString() === [ slots.T, slots.TR, slots.M, slots.BR, slots.B ].sort().toString())[0].sort().toString();
	nums[4] = groups['4'][0].sort().toString();
	nums[5] = groups['5'].filter(n => n.sort().toString() === [ slots.T, slots.TL, slots.M, slots.BR, slots.B ].sort().toString())[0].sort().toString();
	nums[6] = groups['6'].filter(n => n.sort().toString() === [ slots.T, slots.TL, slots.M, slots.BL, slots.BR, slots.B ].sort().toString())[0].sort().toString();
	nums[7] = groups['3'][0].sort().toString();
	nums[8] = groups['7'][0].sort().toString();
	nums[9] = groups['6'].filter(n => n.sort().toString() === [ slots.T, slots.TL, slots.TR, slots.M, slots.BR, slots.B ].sort().toString())[0].sort().toString();

	let num = '';
	line[1].forEach((code) => {
		for (let [ numK, numV ] of Object.entries(nums)) {
			if (numV === code.split('').sort().toString()) {
				num += numK;
			}
		}
	});
	numsToSum.push(parseInt(num, 10));
});

console.log(numsToSum.reduce((cur, n) => cur + n, 0));