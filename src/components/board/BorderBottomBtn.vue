<template>
	<div class="board-list-btn">
		<div class="border-contain">
			<button
				class="start btn border-btn"
				@click="onClickPageView(-1)"
			></button>
			<button class="pre border-btn" @click="onClickPrev()"></button>
			<ul>
				<li
					class="border-btn"
					v-for="item in borderBtnArr"
					:key="item.page"
					:class="{ on: item.active }"
					@click="onClickPageView(item.page)"
				>
					<button>{{ item.page }}</button>
				</li>
			</ul>
			<button class="next border-btn" @click="onClickNext()"></button>
			<button class="end border-btn" @click="onClickPageView(1)"></button>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		borderBtnArr: {
			default: 0,
			typeof: Number,
		},
		pageRange: {
			default: 0,
			typeof: Number,
		},
	},
	computed: {
		lastPageNum() {
			return this.borderBtnArr.length;
		},
	},
	data() {
		return {
			currentPageNum: 1, //현재 페이지
		};
	},
	created() {},
	methods: {
		/**
		 * @function onClickPageView
		 * @description 1~10 페이징 리스트 부르기
		 */
		onClickPageView(itemNum) {
			/**
			 *  페이지 길이 이상 로드 금지
			 */
			if (this.borderBtnArr.length < itemNum) return;
			/**
			 * 버튼 active 초기화
			 */
			this.initBtn();
			/**
			 * 누른버튼에 active 주기
			 */
			this.borderBtnArr[itemNum - 1].active = 1;
			/**
			 * 누른페이지 번호 주기
			 */
			this.currentPageNum = itemNum;
			/**
			 * api 업데이트
			 */
			console.log('페이지렌지', this.pageRange);
			this.$emit('pageListRefresh', itemNum);
		},
		/**
		 * @function onClickPrev
		 * @description 이전 페이지로 이동
		 */
		onClickPrev() {
			const pagePreNum =
				this.currentPageNum - 1 == 0 ? 1 : this.currentPageNum - 1;
			this.onClickPageView(pagePreNum);
		},
		/**
		 * @function onClickNext
		 * @description 다음페이지로 이동
		 */
		onClickNext() {
			if (this.currentPageNum == this.pageRange + 10) {
				this.$emit('updatePageRange', 10);
				this.$emit('btnSettingInit');
				this.currentPageNum = 0;
				this.onClickPageView(this.currentPageNum + 1);
			} else {
				this.currentPageNum + 1;
				this.onClickPageView(this.currentPageNum + 1);
			}
		},

		initBtn() {
			/** 전체버튼 active 초기화 */
			for (var i = 0; i < this.borderBtnArr.length; i++) {
				this.borderBtnArr[i].active = 0;
			}
		},
	},
};
</script>

<style></style>
