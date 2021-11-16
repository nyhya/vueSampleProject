<template>
	<div class="list-btn">
		<span :class="{ on: activeRecentlyBtn }" @click="onClickRecentlyBtn()"
			>최신순</span
		>
		<span class="division-line"></span>
		<span :class="{ on: activeHitsBtn }" @click="onClickHitsBtn()">조회순</span>
	</div>
</template>

<script>
export default {
	data() {
		return {
			activeRecentlyBtn: true,
			activeHitsBtn: false,
		};
	},
	methods: {
		/**
		 * @function onClickRecentlyBtn
		 * @description 최신순 버튼 클릭
		 */
		onClickRecentlyBtn() {
			if (this.activeRecentlyBtn) return;
			this.activeHitsBtn = false;
			this.activeRecentlyBtn = !this.activeRecentlyBtn;
		},
		/**
		 * @function onClickHitsBtn
		 * @description 조회순 버튼 클릭
		 */
		onClickHitsBtn() {
			if (this.activeHitsBtn) return;
			this.activeRecentlyBtn = false;
			this.activeHitsBtn = !this.activeHitsBtn;
		},
	},
};
</script>

>
