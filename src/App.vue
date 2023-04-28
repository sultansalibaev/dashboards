<template>
	<head-info :dateTime="dateTime" :type="type"></head-info>
	<Graph :minute="dateTime[0][4]" :type="type"></Graph>
	<ServerMemory :minute="dateTime[0][4]" :type="type"></ServerMemory>
</template>


<script>
import HeadInfo from '@/components/HeadInfo';
import Graph from '@/components/Graph';
import ServerMemory from '@/components/ServerMemory';

export default {
	components: {
		HeadInfo,
		Graph,
		ServerMemory,
	},
	data() {
		return {
			dateTime: ['10:01', '10:01'],
			type: { value: 'desktop' },
		}
	},
	methods: {
		timeCounter() {

			let date = new Date();

			let dateArray = [
				date.getHours(),
				date.getMinutes(),
				date.getSeconds(),
				date.getMilliseconds()
			];

			dateArray = dateArray.map(el => {
				if (el < 10) return '0' + el;
				else if (el > 99) return (el + '').slice(0, -1);
				else return el + '';
			});

			setTimeout(() => {
				this.dateTime = [`${dateArray[0]}:${dateArray[1]}`, `${dateArray[2]}:${dateArray[3]}`];
				this.timeCounter();
			}, 10);
		},
	},
	mounted() {
		this.timeCounter();
	},
}

</script>

<style>
body {
	background: #333;
}
.flex.justify-center.flex-wrap-1460 text {
    fill: #acacac !important;
}
</style>