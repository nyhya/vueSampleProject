<template>
	<div id="sub-coway-video" class="sub-wrap">
		<AppLnbSection :lnbMenu="lnbMenu"></AppLnbSection>
		<router-view></router-view>
	</div>
</template>

<script>
import AppLnbSection from '@/components/common/AppLnbSection.vue';
export default {
	components: {
		AppLnbSection,
	},
	data() {
		return {
			lnbMenu: [
				{
					key: 0,
					tit: 'TV 분류',
					className: 'sub-main-active',
					isActive: 1,

					sub: [
						{ tit: '상품정보', active: 1, to: '/home', key: 0 },
						{ tit: '하트/케어서비스', active: 0, to: '/home', key: 1 },
						{ tit: '현장이슈', active: 0, to: '/home', key: 2 },
						{ tit: '톡톡 생활상식', active: 0, to: '/home', key: 3 },
					],
				},
				{
					key: 1,
					tit: '브랜딩채널',
					className: 'sub-main-active',
					isActive: 0,

					sub: [
						{ tit: '제품안내', active: 1, to: '/home', key: 0 },
						{ tit: '현장이슈', active: 0, to: '/home', key: 1 },
						{ tit: '톡톡 생활 상식', active: 0, to: '/home', key: 2 },
					],
				},
				{
					key: 2,
					tit: '편성표',
					className: 'sub-main-active',
					isActive: 0,

					sub: [
						{ tit: '제품안내', active: 1, to: '/home', key: 0 },
						{ tit: '현장이슈', active: 0, to: '/home', key: 1 },
						{ tit: '톡톡 생활 상식', active: 0, to: '/home', key: 2 },
					],
				},
			],
		};
	},
	created() {},
};
</script>

<style></style>
