<template>
	<div class="list-item-wrap" @click="onClicDetailView()">
		<div class="contain">
			<div class="border-item">
				<div class="txt">
					<p class="tit">{{ borderItem.pstNm }}</p>
					<span class="hits">조회수&nbsp;{{ borderItem.viewCount }}</span>
					<span class="date">{{ borderItem.date }}</span>
				</div>
				<div class="ico-data">
					{{ borderItem.postData }}
				</div>
				<div class="ico-arrow"></div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		borderItem: Object,
	},
	methods: {
		onClicDetailView() {
			this.$router.push(
				`/support/borderView/${this.borderItem.userCode}/${this.borderItem.brdCode}/${this.borderItem.postCode}`,
			);
		},
	},
};
</script>
