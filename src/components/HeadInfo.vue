<template>
	<header class="flex items-center">
		<span class="img-container">
			<img class="logo-img" :src="getLogo()" alt="none">
		</span>
		<span class="mobile header-title fz-14">Самая мощная казахстанская система мониторинга и анализа <br>
			информационных потоков в режиме реального времени</span>
		<span class="mobile flex time-counter">{{ dateTime[0] }}
			<span>{{ dateTime[1] }}</span>
		</span>
		<span class="mobile fz-14">
			{{ i18n(weekNames[new Date().getDay()]) }},<br> {{ new Date().getDate() }} {{
					i18n(monthNames[new Date().getMonth()])
			}}
			{{ new Date().getFullYear() }} г.</span>
		<img class="mobile ml-auto logo-img" src="/dashboards/madeinkz.png" alt="none">

		<div class="mobile-show ml-auto" v-if="isMobile()">
			<select name="type" class="h-full" id="type" v-model.lazy="type.value">
				<option value="smi" selected>{{ i18n('СМИ') }}</option>
				<option value="soc-service">{{ i18n('Сервис Соц.сети') }}</option>
				<option value="yt-cls">{{ i18n('Youtube и Одноклассники') }}</option>
				<option value="insta-tg">{{ i18n('Instagram и Telegram') }}</option>
				<option value="vk-tw">{{ i18n('ВК и Twitter') }}</option>
				<option value="fb">{{ i18n('Facebook') }}</option>
				<option value="mw">{{ i18n('Мой Мир') }}</option>
				<option value="reports">{{ i18n('Отчёты') }}</option>
				<option value="server-memory">{{ i18n('Server Memory') }}</option>
				<option value="desktop">{{ i18n('Общее') }} ...</option>
			</select>
		</div>
	</header>
</template>

<script>
import {i18n} from '@/utils/i18n';

export default {
	setup() {
		return {i18n}
	},
	name: 'head-info',
	data() {
		return {
			weekNames: [
				'',
				'Понедельник',
				'Вторник',
				'Среда',
				'Четверг',
				'Пятница',
				'Суббота',
				'Воскресенье',
			],
			monthNames: [
				'Января',
				'Февраля',
				'Марта',
				'Апреля',
				'Мая',
				'Июня',
				'Июля',
				'Августа',
				'Сентября',
				'Октября',
				'Ноября',
				'Декабря',
			],
		}
	},
	props: {
		dateTime: {
			type: Array,
			require: true
		},
		type: {
			type: Object,
			require: true
		},
	},
	methods: {
		isMobile() {
			return document.documentElement.clientWidth < 666;
		},
		getLogo() {
			return this.isMobile()
			? '/dashboards/imas_logo_en_blue.png'
			: 'https://cabinet.imas.kz/media/img/imas_logo_en_blue.png';
		}
	},
	mounted() {
		if (document.documentElement.clientWidth < 666) {
			this.type.value = 'desktop';
		}
	}
}

</script>

<style scoped>
.logo-img {
	max-height: 40px;
}

.header-title {
	margin: 0 100px 0 20px;
}

.fz-14 {
	font-size: 14px
}

.time-counter {
	font-size: 33px;
	font-weight: bold;
}

.time-counter span {
	margin-left: 10px;
	margin-right: 16px
}

header {
	padding: 0 15px;
	height: 50px;
	background: white;
	color: #34a5eb;
}

@media (max-width: 1150px) {
	.mobile {
		display: none;
	}


	.img-container img {
		max-height: 35px;
		width: 44px;
	}

	header {
		padding: 0 7px;
		color: black;
	}
}

@media (min-width: 666px) {
	.mobile-show {
		display: none;
	}
}

@media (max-width: 665px) {
	.mobile-show {
		display: block;
		height: 30px;
		padding: 0 6px;
		background: buttonface;
		border-radius: 5px;
	}
}
</style>