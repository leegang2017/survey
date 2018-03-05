'use strict';
const xlsx = require('node-xlsx').default;
const fs = require('fs');
const CommonController = require('./commonController');

class SurveyRecordsController extends CommonController {
	init() {
		this.daoService = this.service.surveyRecords;
	}

	async exportRecord(ctx) {
		const pageContents = await this.daoService.find({}, { 'conclusion.score': -1, created: 1 },  { target: 1, conclusion: 1, created: 1 })
		const data = [['姓名', '身份证号码', '分数']];
		for (let i = 0; i < pageContents.length; i++) {
			const item = pageContents[i];
			const row = [item.target.name, item.target.identityNumber, item.conclusion.score];
			data.push(row)
		}

		var buffer = xlsx.build([{ name: '学习十九大知识竞答结果', data: data }]); // Returns a buffer
		fs.writeFile(`./学习十九大知识竞答结果.xlsx`, buffer, function (err) {
			if (err) {
				throw err;
			}

			console.log('Saved.');
		});
	}
};
module.exports = SurveyRecordsController;
