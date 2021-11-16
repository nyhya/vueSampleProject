<template>
	<div id="lnb-nav">
		<ul>
			<li
				v-for="menu in lnbMenu"
				:key="menu.key"
				:class="{ 'sub-main-active': menu.isActive == 1 }"
			>
				<div @click="onClickActiveMenu(menu.key)">
					<router-link :to="''" class="sub-tit-menu"
						>{{ menu.tit }}
					</router-link>
				</div>

				<ul class="sub-list-menu">
					<li
						v-for="sub in menu.sub"
						:key="sub.subKey"
						@click="onClickSubActiveMenu(menu.key, sub.key)"
					>
						<router-link :to="sub.to" :class="{ on: sub.active }">{{
							sub.tit
						}}</router-link>
					</li>
				</ul>
			</li>
		</ul>
		<!-- LNB : e  -->
	</div>
</template>

<script>
export default {
	props: {
		lnbMenu: {
			type: Array,
			default: null,
		},
	},
	data() {
		return {};
	},
	created() {},
	methods: {
		/**
		 * @function onClickActiveMenu
		 * @description LNB 1뎁스 메뉴 ACITVE ON/OFF
		 * @param selectNum 메뉴 뎁스의 위치
		 */
		onClickActiveMenu(select) {
			this.initMenu();
			console.log(select);
			this.lnbMenu[select].isActive = 1;
		},
		/**
		 * @function onClickSubActiveMenu
		 * @description LNB 2뎁스 메뉴 ACITVE ON/OFF
		 */
		onClickSubActiveMenu(selectMain, selectSub) {
			this.initSubMenu();
			console.log(selectMain, selectSub);
			this.lnbMenu[selectMain].sub[selectSub] = 1;
		},
		/**
		 * @function initMenu
		 * @description 메뉴 1뎁스 배열 값 초기화
		 */
		initMenu() {
			for (var i = 0; i < this.lnbMenu.length; i++) {
				this.lnbMenu[i].isActive = 0;
				for (var j = 0; j < this.lnbMenu[i].sub.length; j++) {
					this.lnbMenu[i].sub[j].active = 0;
				}
			}
		},
		/**
		 * @function initSubMenu
		 * @description 메뉴 2뎁스 배열 값 초기화
		 */
		initSubMenu() {
			for (var i = 0; i < this.lnbMenu.length; i++) {
				for (var j = 0; j < this.lnbMenu[i].sub.length; j++) {
					this.lnbMenu[i].sub[j].active = 0;
				}
			}
		},
	},
};
</script>

<style></style>
