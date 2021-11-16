<template>
	<header id="main-header">
		<nav id="gnb">
			<router-link :to="'/'" class="gnb-logo"
				><h1 class="a11y">코웨이 교육 플렛폼</h1></router-link
			>
			<ul class="gnb-contain">
				<router-link
					:class="{ on: menu.active == 1 }"
					:to="`${menu.to}`"
					v-for="menu in mainMenu"
					:key="menu.key"
					><li @click="onClickActive(menu.key)">{{ menu.tit }}</li></router-link
				>
			</ul>
			<ul class="gnb-support">
				<li class="search-container pc">
					<button class="search-btn"></button>
					<form id="search-form" action=""></form>
				</li>
				<li class="search-container mobile">
					<button class="search-btn mobile"></button>
					<form id="search-form" action=""></form>
				</li>
				<li class="btn-ico-alarm"></li>
			</ul>
		</nav>
	</header>
</template>

<script>
export default {
	data() {
		return {
			mainMenu: [
				{ tit: '코웨이 TV', active: 1, to: '/cowayVideo/productInfo', key: 0 },
				{ tit: '교육과정', active: 0, to: '/support', key: 1 },
				{ tit: '마이데스크', active: 0, to: '/support', key: 2 },
				{ tit: '교육지원', active: 0, to: '/support/brdlist', key: 3 },
			],
		};
	},
	computed: {},
	methods: {
		onClickActive(key) {
			console.log(key);
			for (var i = 0; i < this.mainMenu.length; i++) {
				this.mainMenu[i].active = 0;
			}
			this.mainMenu[key].active = 1;
		},
	},
};
</script>
