import VueRouter from 'vue-router';
import Vue from 'vue';

Vue.use(VueRouter);

const router = new VueRouter({
	mode: 'history',
	routes: [
		{
			path: '/',
			redirect: '/home',
		},
		{
			path: '/home',
			component: () => import('@/views/MainContents.vue'),
		},
		{
			path: '/support',
			component: () => import('@/views/border/BorderEduSupport.vue'),
			children: [
				{
					path: 'brdlist',
					component: () => import('@/views/border/BorderList.vue'),
				},
				{
					path: 'brdView/:userCode/:brdCd/:pstCd',
					component: () => import('@/views/border/BorderDetailView.vue'),
				},
			],
		},
		{
			path: '/cowayVideo',
			component: () => import('@/views/cowayVideo/CowayVideo.vue'),
			children: [
				{
					path: 'productInfo',
					component: () => import('@/views/cowayVideo/CowayVideoList.vue'),
				},
			],
		},
		{
			name: 'videoView',
			path: '/videoView/:title/:playTime/:postLike/:postHits/:videoPath/:postDate/:videoCd/:cntsCd',
			component: () => import('@/views/cowayVideo/CowayVideoDetailView.vue'),
		},
	],
});

// router.beforeEach((to, from, next) => {
// 	if (to.meta.auth && !store.getters.isLogin) {
// 		console.log('인증이 필요합니다');
// 		next('/login');
// 		return;
// 	}
// 	next();
// });
export default router;
