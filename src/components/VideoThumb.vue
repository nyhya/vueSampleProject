<template>
	<dl>
		<dt>
			<div class="video-contain">
				<span v-html="date"></span>
				<div class="progress-vedio-bar"></div>
			</div>
		</dt>
		<dd>
			<button class="btn-menu"></button>
			<p class="tit" v-html="title"></p>
			<div class="video-info">
				<ul>
					<li class="hits-num" v-html="postHits"></li>
					<li class="like-num" v-html="postLike"></li>
					<li class="date"><span v-html="date"></span></li>
				</ul>
			</div>
		</dd>
	</dl>
</template>

<script>
export default {
	props: {
		thumbVideoList: {
			type: Object,
			default: null,
		},
	},
	data() {
		return {
			title: '',
			postLike: 0,
			postHits: 0,
			date: 0,
			duration: 0,
			videoPath: '',
			thumbPath: '',
			cntsCd: '',
		};
	},
	created() {
		this.title = this.thumbVideoList.contentsName;
		this.postHits = this.thumbVideoList.likeCount;
		this.postLike = this.thumbVideoList.viewCount;
		this.date = this.thumbVideoList.upDate;
		this.duration = this.thumbVideoList.duration;
		this.videoPath = this.thumbVideoList.contentsPath;
		this.thumbPath = this.thumbVideoList.thumbPath;
		this.cntsCd = this.thumbVideoList.contentsCd;
	},
};
</script>

<style></style>
