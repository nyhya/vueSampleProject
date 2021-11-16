<template>
	<div id="app">
		<div class="contain">
			<AppHeader v-if="checkToggleHeader"></AppHeader>
			<div id="app-contents">
				<router-view></router-view>
			</div>
			<AppFooter></AppFooter>
		</div>
	</div>
</template>

<script>
import AppHeader from '@/components/common/AppHeader.vue';
import AppFooter from '@/components/common/AppFooter.vue';
export default {
	name: 'App',
	components: {
		AppHeader,
		AppFooter,
	},
	computed: {
		checkToggleHeader() {
			const path = this.$route.path;
			const val = path.indexOf('videoView') == -1 ? true : false;
			return val;
		},
	},
	created() {
		// console.log(this.$route.path);
	},
};
</script>
<style scoped></style>
