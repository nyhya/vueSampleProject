<template>
	<li :class="{ on: obj.active == 1 }" @click="onClickListRefresh(obj.key)">
		<span>{{ obj.tit }}</span>
	</li>
</template>

<script>
import { fetchCowayVideoList } from '@/api/cowayVideo.js';
export default {
	props: {
		obj: {
			type: Object,
			default: null,
		},
		limitNum: {
			type: Number,
			default: null,
		},
		userCode: {
			type: String,
			default: '',
		},
	},
	methods: {
		onClickListRefresh(key) {
			var vm = this;
			var userData = {
				divice: 'W',
				userCode: this.userCode,
				offset: 1,
				limit: this.limitNum,
				keyword: '',
				sortOptionions: key.toString(),
				deviceCode: '',
				sortCode: '',
			};
			fetchCowayVideoList(userData, key)
				.then(function (response) {
					const cowayApiList = response.data.tvMovList;
					vm.$emit('refreshCowayList', cowayApiList, key);
				})
				.catch(function (error) {
					console.log('최신순/조회순/좋아요순 ', error);
				});
		},
	},
};
</script>

<style></style>
