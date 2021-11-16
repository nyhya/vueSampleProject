<template>
	<div class="hashtag">
		<ul>
			<li v-for="item in hashtag" :key="item.key">{{ item.keyword }}</li>
		</ul>
	</div>
</template>

<script>
export default {
	props: {
		hashtag: {
			type: Array,
			default: null,
		},
	},
};
</script>

<style></style>
