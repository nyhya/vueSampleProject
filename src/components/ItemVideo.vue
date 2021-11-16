<template>
	<dl class="video-obj">
		<!-- 비디오 아이템 : s -->
		<dt>
			<div
				class="video-contain"
				:style="{ 'background-image': `url(${thumbImage})` }"
			>
				<span class="play-time" v-html="playTime"></span>
				<div class="progress-video-bar">
					<div class="current-video-bar"></div>
				</div>
			</div>
		</dt>
		<dd>
			<p class="tit" v-html="tit">정상윤의 섹시한 세일즈 우리가 만드는 도전</p>
			<div class="video-info">
				<ul>
					<li class="hits-num" v-html="postHits"><span></span></li>
					<li class="like-num" v-html="postLike"><span></span></li>
					<li class="date" v-html="postDate"><span></span></li>
				</ul>
			</div>
			<!-- 비디오 아이템 : e -->
		</dd>
	</dl>
</template>

<script>
export default {
	props: {
		videoInfo: {
			type: Object,
			default: Object,
		},
	},
	data() {
		return {
			tit: '',
			playTime: 0,
			postLike: 0,
			postHits: 0,
			postDate: 0,
			thumbImage: '',
			vimeoUrl: '',
			hashTag: '',
			vimeoId: '',
			seriesCd: 0,
			cntsCd: 0,
		};
	},
	created() {
		this.init();
	},
	methods: {
		init() {
			this.tit = this.videoInfo.cntsNm;
			this.playTime = this.videoInfo.duration;
			this.postLike = this.videoInfo.likeCnt;
			this.postHits = this.videoInfo.updDtm;
			this.thumbImage = this.videoInfo.thumPath;
			this.hashTag = this.videoInfo.hashtag;
			this.postDate = this.videoInfo.updDtm;
			this.vimeoCd = this.videoInfo.vimeoCd;
			this.cntsCd = this.videoInfo.cntsCd;
		},
		onClickMovePage() {
			this.$router.push(
				`/cowayVideo/videoView/${this.tit}/${this.playTime}/${this.postLike}/${this.postHits}/${this.postDate}/${this.vimeoCd}/${this.cntsCd}`,
			);
		},
	},
};
</script>

<style></style>
