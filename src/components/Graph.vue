<template>
	<div class="flex justify-center flex-wrap-1460">
		<figure class="highcharts-figure w-full" v-show="getType('soc-service')">
			<div id="get-social-posts-month"></div>
		</figure>
		<figure class="highcharts-figure w-full" v-show="getType('soc-service')">
			<div id="get-social-posts-day"></div>
		</figure>
		<figure class="highcharts-figure w-full" v-show="getType('soc-service')">
			<div id="get-social-service-posts"></div>
		</figure>
		<figure class="highcharts-figure w-full" v-show="getType('smi')">
			<div id="get-resource-posts"></div>
		</figure>
	</div>

	<div class="flex justify-center flex-wrap-1460">
		<figure class="highcharts-figure w-full" v-show="getType('insta-tg')">
			<div id="socials-per-month"></div>
		</figure>
		<figure class="highcharts-figure w-full" v-show="getType('vk-tw')">
			<div id="socials-per-month-big"></div>
		</figure>
		<figure class="highcharts-figure w-full" v-show="getType('yt-cls')">
			<div id="socials-per-month-big2"></div>
		</figure>
		<figure class="highcharts-figure w-full" v-show="getType('mw')">
			<div id="socials-per-month-big3"></div>
		</figure>
	</div>

	<div class="flex justify-center flex-wrap-1460">
		<figure class="highcharts-figure w-full" v-show="getType('insta-tg')">
			<div id="socials-per-day"></div>
		</figure>
		<figure class="highcharts-figure w-full" v-show="getType('vk-tw')">
			<div id="socials-per-day-big"></div>
		</figure>
		<figure class="highcharts-figure w-full" v-show="getType('yt-cls')">
			<div id="socials-per-day-big2"></div>
		</figure>
		<figure class="highcharts-figure w-full" v-show="getType('mw')">
			<div id="socials-per-day-big3"></div>
		</figure>
	</div>

	<div class="flex justify-center flex-wrap-1460">
		<figure class="highcharts-figure w-full" v-show="getType('fb')">
			<div id="socials-per-month-fb"></div>
		</figure>
		<figure class="highcharts-figure w-full" v-show="getType('fb')">
			<div id="socials-per-day-fb"></div>
		</figure>
		<figure class="highcharts-figure w-full" v-show="getType('reports')">
			<div id="reports-per-month"></div>
		</figure>
		<figure class="highcharts-figure w-full" v-show="getType('reports')">
			<div id="reports-per-day"></div>
		</figure>
	</div>

	<div class="flex justify-center flex-wrap-1460">
		<figure class="highcharts-figure w-full max-w-850" v-show="getType('smi')">
			<div id="resources-per-month"></div>
		</figure>
		<figure class="highcharts-figure w-full max-w-850" v-show="getType('smi')">
			<div id="resources-per-day"></div>
		</figure>
	</div>
</template>

<script>
import {i18n} from '@/utils/i18n';

export default {
	setup() {
		return {i18n}
	},
	data() {
		return {
			firstLoad: true,
			options: {
				chart: {
					backgroundColor: '#333333',
					type: 'spline',
					height: 275,
				},
				title: {
					text: 'Some title',
					align: 'center'
				},
				plotOptions: {
					bar: {
						dataLabels: {
							enabled: true
						}
					},
					series: {
						borderWidth: 0,
					},
					spline: {
						lineWidth: 2,
						states: {
							hover: {
								lineWidth: 4
							}
						},
						marker: {
							enabled: false
						},
					}
				},
				// xAxis: {
				// 	type: 'datetime',
				// 	tickInterval: (per == 'month' ? (1000 * 3600 * 24 * 4) : (1000 * 1800)), // 1 month
				// },

				// xAxis: {
				// 	categories: [],
				// 	title: {
				// 		text: null
				// 	}
				// },
				yAxis: {
					title: {
						text: ''
					},
					gridLineColor: '#7d7d7d'
				},
				tooltip: {
					valueSuffix: ' поста(ов)'
				},
				series: [
					// {
					// 	showInLegend: false,
					// 	name: '????',
					// 	data: [{ x: Date.now(), y: 0 }]
					// }
				],
			},
			socialsPerMonthData: [],
			socialsPerDayData: [],
			resourcesPerMonthData: [],
			resourcesPerDayData: [],
			socialServiceData: [],
			reportsData: [],
			socialNames: {
				1: 'Вконтакте',
				2: 'Facebook',
				3: 'Twitter',
				4: 'Instagram',
				6: 'Youtube',
				7: 'Одноклассники',
				8: 'Мой Мир',
				9: 'Telegram',
			},
		}
	},
	methods: {
		async fetchGet(url) {
			let response = await fetch(url);
			return await response.json();
		},
		convertTime(time) {
			return time < 10 ? '0' + time : time;
		},
		fetchData() {
			let array = [
				['socialsPerMonthData', ['social-posts-per-month', ['this', 'getSocials']]],
				['socialsPerDayData', ['social-posts-per-day', ['this', 'getSocials']]],
				['resourcesPerMonthData', ['resource-posts-per-month', ['JSON']]],
				['resourcesPerDayData', ['resource-posts-per-day', ['JSON']]],
				['socialServiceData', ['social-service-posts', ['JSON']]],
			];
			this.fetchReq(array[0])
			this.fetchReq(array[1])
				.then(() => {
					this.fetchGet('https://export.imas.kz/status')
						.then(data => {
							let newData = data;
							if (newData.status == 'OK') this.reportsData = newData;
							console.log(this.reportsData);
						})
						.catch(error => {
							console.log(error);
							this.reportsData = error;
						});
				})
			this.fetchReq(array[2])
			this.fetchReq(array[3])
				.then(() => {
					this.fetchReq(array[4])
				})
		},
		fetchReq(arr) {
			let url = `/ru/dashboards/get-`;
			return this.fetchGet(url + arr[1][0])
				.then(data => {
					this[arr[0]] = this.getData(arr[1][1], data);
				})
				.catch(error => {
					console.log(error);
					this[arr[0]] = error;
				});
		},
		getData(array, data) {
			switch (array[0]) {
				case 'this':
					return this[array[1]](data);
				case 'JSON':
					return JSON.parse(data);
				default:
					return JSON.parse(data);
			}
		},
		getSocials(data) {
			return [1, 2, 3, 4, 6, 7, 8, 9].map(socId => {
				return JSON.parse(data).filter(obj => (obj.type == socId));
			});
		},

		reportGraphs(data, per = 'month') {
			let countArray = data;


			let socialOptions = JSON.parse(JSON.stringify(this.options));

			socialOptions.chart.type = 'spline';


			socialOptions['xAxis'] = {
				type: 'datetime',
				tickInterval: (per == 'month' ? (1000 * 3600 * 24 * 4) : (1000 * 60 * 60)), // 1 month
			};

			let object = {
				showInLegend: false,
				name: 'Отчёты',
				data: Object.keys(countArray).map((key) => {
					return { x: new Date(key).getTime() + (per == 'day' ? (1000 * 60 * 60 * 6) : 0), y: parseInt(countArray[key]) };
				})
			};
			if (per == 'day') {
				object['color'] = 'rgb(144,237,125)';
			}

			socialOptions.tooltip.valueSuffix = ' отчётов';
			socialOptions.title.text = i18n(`Отчёты за ${per == 'day' ? 'сегодня' : 'месяц'}`); // Посты отработанные парсером Соц.сети
			socialOptions.title.style = {color: '#dedede'}; // Посты отработанные парсером Соц.сети
			socialOptions.series = [object];

			return socialOptions
		},
		getSocialPosts(data, per = 'month') {
			let countArray = data.map(socialArray => {
				return socialArray.reduce(
					(previousValue, currentValue) => parseInt(previousValue) + parseInt(currentValue['count()']),
					0
				);
			});


			let socialOptions = JSON.parse(JSON.stringify(this.options));

			socialOptions.chart.type = 'bar';


			socialOptions['xAxis'] = {
				categories: Object.values(this.socialNames),
				title: {
					text: null
				}
			};

			let object = {
				showInLegend: false,
				name: 'Месяц',
				data: countArray
			};
			if (per == 'day') {
				object['color'] = 'rgb(144,237,125)';
				object.name = 'День';
			}
			socialOptions.title.text = `Соц.сети за ${per == 'day' ? 'сегодня' : 'месяц'}`; // Посты отработанные парсером Соц.сети
			socialOptions.title.style = {color: '#dedede'}; // Посты отработанные парсером Соц.сети
			socialOptions.series = [object];

			return socialOptions

		},
		socialGraphs(socData, title_text = 'месяц', per = 'month') {
			console.log(per, socData);
			let [vk, fb, tw, insta, yt, clsm, mw, tg] = socData,

				[_vk, _fb, _tw, _insta, _yt, _clsm, _mw, _tg] = Object.values(this.socialNames),

				socialsArray = [
					[[insta, tg], [_insta, _tg], '', 'Instagram и Telegram'],
					[[fb], [_fb], '-fb', 'Facebook'],
					[[vk, tw], [_vk, _tw], '-big', 'Вконтакте и Twitter'],
					[[yt, clsm], [_yt, _clsm], '-big2', 'Youtube и Одноклассники '],
					[[mw], [_mw], '-big3', 'Мой Мир']
				];

			socialsArray.forEach(arr => {
				let [socialArray, socialNames, bigSoc, beforeTitle] = arr;
				Highcharts.chart(`socials-per-${per}${bigSoc}`, this.getOptions(title_text, per, socialArray, socialNames, beforeTitle));
			});
		},
		getOptions(title_text, per, socialArray, socialNames, beforeTitle, newData = [], ownOptions = JSON.parse(JSON.stringify(this.options))) {
			let objKey = per == 'month' ? 'toDate(s_date)' : 'toStartOfHour(s_date)';

			socialArray.forEach((socialPostsArray, i) => {
				let seriesData = {
					showInLegend: false,
					name: socialNames[i],
					data: socialPostsArray.length <= 1 ? socialPostsArray.map(obj => {
						return { x: new Date(obj[objKey]).getTime() + (1000 * 60 * 60 * 6), y: 0 };
					}) : socialPostsArray.map(obj => {
						return { x: new Date(obj[objKey]).getTime() + (1000 * 60 * 60 * 6), y: parseInt(obj['count()']) };
					})
				};

				if (newData.length == 1) seriesData['color'] = 'rgb(144,237,125)';

				newData.push(seriesData);

			});
			ownOptions.title.style = {color: '#dedede'};

			ownOptions.title.text = i18n(`${beforeTitle} за ${title_text}`);
			ownOptions['xAxis'] = {
				type: 'datetime',
				tickInterval: (per == 'month' ? (1000 * 3600 * 24 * 4) : (1000 * 60 * 60)), // 1 month
			};
			ownOptions.series = newData;

			return ownOptions;
		},

		// ======================

		getResourcePosts() {

			let monthCountArray = this.resourcesPerMonthData.reduce(
				(previousValue, currentValue) => parseInt(previousValue) + parseInt(currentValue['count()']),
				0
			);
			let dayCountArray = this.resourcesPerDayData.reduce(
				(previousValue, currentValue) => parseInt(previousValue) + parseInt(currentValue['count()']),
				0
			);

			let socialOptions = JSON.parse(JSON.stringify(this.options));

			socialOptions.chart.type = 'bar';
			socialOptions.title.text = i18n(`СМИ`);
			socialOptions.title.style = {color: '#dedede'};

			socialOptions['xAxis'] = {
				categories: [i18n('СМИ')],
				title: {
					text: null
				}
			};
			socialOptions.series = [{
				showInLegend: false,
				name: i18n('Месяц'),
				data: [monthCountArray]
			}, {
				showInLegend: false,
				name: i18n('День'),
				data: [dayCountArray],
				color: 'rgb(144,237,125)'
			}];

			return socialOptions;
		},
		resourceGraphs(res_data, title_text = 'месяц', per = 'month') {


			let resourceArray = res_data;
			let hour6 = 1000 * 60 * 60 * 6;

			let newData = [];

			let seriesData = {
				showInLegend: false,
				name: 'СМИ',
				data: resourceArray.length <= 1 ? resourceArray.map(obj => {
					return { x: new Date(obj['toDate(s_date)'] ?? obj['toStartOfHour(toDateTime(s_date))']).getTime() + hour6, y: 0 };
				}) : resourceArray.map(obj => {
					return { x: new Date(obj['toDate(s_date)'] ?? obj['toStartOfHour(toDateTime(s_date))']).getTime() + hour6, y: parseInt(obj['count()']) };
				})
			};

			newData.push(seriesData);

			let ownOptions = JSON.parse(JSON.stringify(this.options));

			ownOptions.title.text = i18n('СМИ за ' + title_text);
			ownOptions.title.style = {color: '#dedede'};
			ownOptions['xAxis'] = {
				type: 'datetime',
				tickInterval: (per == 'month' ? (1000 * 3600 * 24 * 4) : (1000 * 1800)), // 1 month
			};
			ownOptions.series = newData;

			Highcharts.chart(`resources-per-${per}`, ownOptions);
		},
		getSocialService(socialServiceData) {


			let socialLength = [];
			let socialMinutes = {};
			let socialNames = Object.values(this.socialNames);

			[1, 2, 3, 4, 6, 8, 7, 9].forEach((social, i) => {
				let count = socialServiceData.find(obj => (obj.type == social));
				count = count ?? { 'count(1)': null };
				socialLength.push(parseInt(count['count(1)'] ?? 0));
				if (count['count(1)']) {
					// socialMinutes[socialNames[i]] = parseInt(socialServiceData[social].minutes);
					socialMinutes[socialNames[i]] = parseInt(
						socialServiceData.find(obj => (obj.type == social))['TIMESTAMPDIFF(MINUTE, add_date, NOW())']
					);
				}
				else {
					socialMinutes[socialNames[i]] = 0;
				}
			});


			let socialOptions2 = JSON.parse(JSON.stringify(this.options));
			socialOptions2.chart.type = 'bar';
			socialOptions2.series = [{
				showInLegend: false,
				name: 'Количество постов',
				data: socialLength
			}
			];
			socialOptions2.tooltip = {
				formatter: function () {
					return '<b>' + this.y +
						'</b> постов <b>' + socialMinutes[this.x] + '</b> мин. в отработке';
				}
			};
			socialOptions2['xAxis'] = {
				categories: socialNames,
				title: {
					text: null
				}
			};
			socialOptions2.title.text = i18n('Неотработанные посты каждые 10 мин');
			socialOptions2.title.style = {color: '#dedede'};

			return socialOptions2;
		},
		getType(type) {
			if (this.type.value == 'desktop') return true;
			return type == this.type.value;
		}
	},
	created() {
		this.fetchData();
	},
	props: {
		type: {
			type: Object,
			require: true,
		},
		minute: {
			type: String,
			require: true,
		}
	},
	watch: {
		minute(newVal, oldVal) {
			console.log(oldVal, newVal);
			if (newVal != 0) {
				this.firstLoad = false;
			}
			else if (newVal == 0 && !this.firstLoad) this.fetchData();
		},
		socialsPerMonthData: {
			handler(newValue) {
				this.socialGraphs(newValue);
				Highcharts.chart('get-social-posts-month', this.getSocialPosts(newValue));
			},
			deep: true
		},
		socialsPerDayData: {
			handler(newValue) {
				this.socialGraphs(newValue, 'сегодня', 'day');
				Highcharts.chart('get-social-posts-day', this.getSocialPosts(newValue, 'day'));
			},
			deep: true
		},
		resourcesPerMonthData: {
			handler(newValue) {
				this.resourceGraphs(newValue);
				if (this.resourcesPerDayData != []) {
					Highcharts.chart('get-resource-posts', this.getResourcePosts());
				}
			},
			deep: true
		},
		resourcesPerDayData: {
			handler(newValue) {
				this.resourceGraphs(newValue, 'сегодня', 'day');
				if (this.resourcesPerMonthData != []) {
					Highcharts.chart('get-resource-posts', this.getResourcePosts());
				}
			},
			deep: true
		},
		socialServiceData: {
			handler(newValue) {
				Highcharts.chart('get-social-service-posts', this.getSocialService(newValue));
			},
			deep: true
		},
		reportsData: {
			handler(newValue) {
				Highcharts.chart('reports-per-month', this.reportGraphs(newValue.month));
				Highcharts.chart('reports-per-day', this.reportGraphs(newValue.day, 'day'));
			},
			deep: true
		},
	},
}

</script>


<style scoped>
.highcharts-figure,
.highcharts-data-table table {
	min-width: 360px;
	max-width: 600px;
}


.highcharts-figure {
	padding-right: 15px;
	border: 1px solid #000;
}

@media (max-width: 666px) {
	.highcharts-figure {
		border-bottom: 0px;
	}
}




.highcharts-data-table table {
	font-family: Verdana, sans-serif;
	border-collapse: collapse;
	border: 1px solid #ebebeb;
	margin: 10px auto;
	text-align: center;
	width: 100%;
	max-width: 600px;
}

.highcharts-data-table caption {
	padding: 1em 0;
	font-size: 1.2em;
	color: #555;
}

.highcharts-data-table th {
	font-weight: 600;
	padding: 0.5em;
}

.highcharts-data-table td,
.highcharts-data-table th,
.highcharts-data-table caption {
	padding: 0.5em;
}

.highcharts-data-table thead tr,
.highcharts-data-table tr:nth-child(even) {
	background: #f8f8f8;
}

.highcharts-data-table tr:hover {
	background: #f1f7ff;
}





.socials-per-month {
	width: 380px;
	height: 275px;
}

.socials-per-day {
	width: 380px;
	height: 275px;
}

.bd-bottom-1 {
	border-bottom: 1px solid #000;
}


.bd-left-1 {
	border-left: 1px solid #000 !important;
}

.bd-right-1 {
	border-right: 1px solid #000;
}

@media (max-width: 1460px) {
	.flex-wrap-1460 {
		flex-wrap: wrap;
	}

}

@media (min-width: 1460px) {
	.max-w-850 {
		max-width: 850px;
	}

}
</style>