<template>
	<div id="sub-edu-support" class="sub-wrap">
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
					tit: '교육지원 안내',
					className: 'sub-main-active',
					isActive: 1,

					sub: [
						{ tit: '제품안내', active: 1, to: '/home', key: 0 },
						{ tit: '현장이슈', active: 0, to: '/home', key: 1 },
						{ tit: '톡톡 생활 상식', active: 0, to: '/home', key: 2 },
					],
				},
				{
					key: 1,
					tit: '교육지원 안내',
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
					tit: '교육지원 안내',
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
};
</script>
