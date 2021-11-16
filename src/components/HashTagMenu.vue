<template>
	<li :class="{ on: title.active == 1 }">
		<span>{{ title.tit }}</span>
	</li>
</template>

<script>
export default {
	props: {
		title: {
			type: Object,
			default: null,
		},
	},
};
</script>

<style></style>
