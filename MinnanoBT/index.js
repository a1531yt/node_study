#!/usr/bin/env node

const axios = require('axios');
const csv = require('csv');
const fs = require('fs');

(async function() {
	const { data } = await axios.get('https://cc.minkabu.jp/api/bar/BTC-JPY.json?range=30m&limit=48');
	//const stringifier = csv.stringify();
	const stringifier = csv.stringify({
		header: true,
		column: {
			time: '時刻',
			openBid: '始値',
			closeBid: '終値',
			highBid: '高値',
			lowBid: '安値',
		}
	});
	const writableStream = fs.createWriteStream('output.csv', {encoding: 'utf-8'});
	stringifier.pipe(writableStream);

	//stringifier.write(data);
	data.forEach(d => stringifier.write(d));
	//console.log(data);
})();

