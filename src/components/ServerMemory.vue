<template>
	<div class="flex flex-wrap items-center justify-around w-full" v-show="getType('server-memory')"
		v-for="server in servers">
		<div class="my-block inline-flex items-center justify-around" v-for="item in server">
			<img width="75" src="/dashboards/pngegg.png" alt="none">
			<div class="block__memory-wrapper">
				<h4>{{ item.ip }}</h4>
				<div class="my-block__memory">
					<div class="memory_progress flex items-center justify-center" :style="{
						width: item.memory_occupied_persent + '%',
						background: getMemoryBackground(item.memory_occupied_persent),
					}">{{ item.memory_occupied_persent }}%</div>
				</div>
				<p v-if="!langIs('kz')">{{ item.free_memory }} GB {{ i18n('свободных из') }} {{ item.all_memory }} GB {{ i18n('only-kz') }}</p>
				<p v-else>{{ item.all_memory }} GB {{ i18n('свободных из') }} {{ item.free_memory }} GB {{ i18n('only-kz') }}</p>
			</div>
		</div>
	</div>
</template>


<script>
import {i18n, langIs} from '@/utils/i18n';

export default {
	setup() {
		return {i18n, langIs}
	},
	data() {
		return {
			firstLoad: true,
			servers: []
		}
	},
	props: {
		minute: {
			type: String,
			require: true,
		},
		type: {
			type: Object,
			require: true,
		},
	},
	methods: {
		getType(type) {
			if (this.type.value == 'desktop') return true;
				return type == this.type.value;
		},
		fetchMemory() {
			let url = `/ru/dashboards/get-server-memory`;
			fetch(url)
				.then(response => response.json())
				.then(data => {
					console.log('memory done', JSON.parse(data));
					let servers = [];

					let newArr = [];

					JSON.parse(data).forEach((server, i) => {

						newArr.push({
							ip: server.ip,
							memory_occupied_persent: ((server.memory_occupied / server.all_memory) * 100).toFixed(1),
							all_memory: (server.all_memory / (1024**2)).toFixed(1),
							free_memory: ((server.all_memory - server.memory_occupied) / (1024**2)).toFixed(1),
						});

						if (i != 0 && (i + 1) % 4 == 0) {
							servers.push(newArr);
							newArr = [];
						}
					});

					servers.push(newArr);
					this.servers = servers;

				})
		},
		getMemoryBackground(memory) {
			if (memory > 94) return '#ea5463';
			else if (memory > 84) return '#F2C94C';
			else return '#057ad6';
		}
	},
	watch: {
		minute(newVal, oldVal) {
			console.log(oldVal, newVal);
			if (newVal != 0) {
				this.firstLoad = false;
			}
			else if (newVal == 0 && !this.firstLoad) this.fetchMemory();
		},
	},
	mounted() {
		this.fetchMemory();
	},
}

</script>

<style scoped>
.my-block {
	color: #b5b3b3;
	border: 1px solid black;
	/* border-right: 1px solid #057ad6; */
	width: 100%;
	min-width: 360px;
	max-width: 450px;
}

@media (max-width: 666px) {
	.my-block {
		border-bottom: 0px;
	}
	.my-block:last-child {
		border-bottom: 1px solid black;
		margin-bottom: 10px;
	}
}


.my-block img {
	padding-bottom: 6px;
	padding-left: 6px;
}

.my-block__memory .memory_progress {
	height: 100%;
	color: black;
	font-size: 13px;
}

.my-block__memory {
	width: 100%;
	height: 18px;
	background: #d4d4d4;
	border: 1px solid #999999;
}

.block__memory-wrapper p {
	font-weight: 300;
	font-size: 13px;
}

.block__memory-wrapper {
	width: 100%;
	max-width: 330px;
	min-width: 240px;
	padding-right: 15px;
	padding-left: 5px;
}
</style>