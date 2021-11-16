<template>
	<div id="video-view-wrap">
		<div class="video-view-contain">
			<h1>코웨이 제품을 왜 사야하나?</h1>
			<!-- 비디오 영역 : s -->
			<div class="video-player">
				<div class="video-player-container">
					<!-- 비디오 : s -->
					<div class="video">
						<div class="video-container">
							<vueVimeoPlayer
								ref="player"
								:player-width="videoWidth"
								:player-height="videoHeight"
								:video-id="vimeoCd"
								@timeupdate="timeupdate"
								@seeking="seeking"
							></vueVimeoPlayer>
							<div class="video-layout">
								<!-- 비디오 : e -->
								<!-- 비디오 재생 정보 : s  -->
								<div class="video-information">
									<p class="tit" v-html="tit"></p>
									<p class="info">
										<span class="date" v-html="postDate"></span>
										<span>조회수</span>
										<span v-html="postHits"></span>
									</p>
									<hashTagKeyword :hashtag="hashTag"></hashTagKeyword>
									<div class="video-action">
										<ul>
											<li
												class="like"
												@click="onClickPostLike"
												v-html="postLike"
											></li>
											<li class="comment-num" v-html="commentTotalNum"></li>
											<li class="more"></li>
										</ul>
									</div>
								</div>
								<!-- 비디오 재생 정보 : e  -->
							</div>
						</div>
					</div>
					<!-- 비디오 시리즈 목록 : s -->
					<div class="video-tablist">
						<div class="btns">
							<button class="on"><span>동영상 목차</span></button>
							<button><span>시리즈 목차</span></button>
						</div>
						<div class="video-index">
							<VideoThumb
								v-for="(item, idx) in tabVideo"
								:key="idx"
								:thumbVideoList="item"
							/>
						</div>
						<div class="video-series"></div>
					</div>
					<!-- 비디오 시리즈 목록 : e -->
				</div>
			</div>
			<!-- 비디오 영역 : e -->
			<!-- 비디오 학습 추천 영상, 자료실 : s -->
			<div class="relation-video-list">
				<div class="video-relation">
					<p>연관 코웨이TV</p>
					<div class="video">
						<router-link
							v-for="(video, idx) in relativeVideo"
							:key="video.cntsCd + idx"
							:to="{
								name: 'videoView',
								params: {
									title: video.contentsCode,
									playTime: video.durationTime,
									postLike: video.likeCount,
									postHits: video.upDate,
									videoPath: video.contentsPath,
									postDate: video.upDate,
									videoCd: video.vimeoCode,
									cntsCd: video.cntsCode,
								},
							}"
							target="_blank"
							><ItemVideo :videoInfo="video"></ItemVideo
						></router-link>
					</div>
				</div>
				<div class="video-relation study">
					<p>연관 학습과정</p>
					<div class="video">
						<ItemVideo></ItemVideo>
					</div>
				</div>
				<!-- 비디오 학습 추천 영상 : e -->
				<!-- 자료실 : s  -->
				<div class="video-relation data">
					<SlideBtn></SlideBtn>
					<p>연관 학습자료</p>
					<ItemData></ItemData>
				</div>
				<!-- 자료실 : e  -->
				<!-- 코멘트 : s -->
				<Comment
					:code="cntsCd"
					:pageName="'coway'"
					@commentTotal="commentTotal"
				></Comment>
				<!-- 코멘트 : e -->
			</div>
		</div>
	</div>
</template>

<script>
import { vueVimeoPlayer } from 'vue-vimeo-player';
import VideoThumb from '@/components/VideoThumb.vue';
import ItemVideo from '@/components/ItemVideo.vue';
import hashTagKeyword from '@/components/HashTagKeyword.vue';
import Comment from '@/components/reply/CommentCowayTv.vue';
import {
	fetchCowaySeriesVideo,
	fetchCowayRelativeVideo,
	putCowayHitLikeIncrease,
} from '@/api/cowayVideo.js';
import ItemData from '@/components/ItemData.vue';
import SlideBtn from '@/components/BtnSlide.vue';
export default {
	name: 'videoView',
	components: {
		vueVimeoPlayer,
		VideoThumb,
		ItemVideo,
		hashTagKeyword,
		Comment,
		ItemData,
		SlideBtn,
	},
	props: {},
	data() {
		return {
			tit: '',
			playTime: 0,
			postLike: 0,
			postHits: 0,
			postDate: 0,
			thumbImage: '',
			videoPath: '',
			vimeoCd: '',
			cntsCd: 0,
			videoWidth: `${Math.floor(1360 * 0.666666667)}px`,
			videoHeight: `${Math.floor(1360 * 0.666666667)}px`,
			videoUrl: 'https://vimeo.com/123456789',
			options: {
				muted: true,
				autoplay: true,
			},
			playerReady: false,
			hashTag: [
				{ keyword: '#세일즈노하우' },
				{ keyword: '#서비스마인드' },
				{ keyword: '#icon' },
				{ keyword: '#정수기' },
			],
			tabVideo: [],
			relativeVideo: [],
			commentList: [],
			commentTotalNum: 0,
			vimeoCurrentPlayTime: 0,
			vimeoStartPlayTime: 0,
			vimeoPlayStart: false,
		};
	},
	created() {
		this.paramsInit();
		this.hitsSend();
	},
	mounted() {
		this.vimeoPlayInit(this.vimeoStartPlayTime);
	},
	methods: {
		vimeoPlayInit(starTime) {
			const vm = this;
			this.$refs.player.player.setCurrentTime(starTime).then(function (e) {
				vm.$refs.player.player
					.play()
					.then(function () {
						// vm.$refs.player.player.pause();
					})
					.catch(function (error) {});
			});
		},
		timeupdate(e) {
			const vm = this;
			this.$refs.player.player.getSeeking().then(function () {
				// if (vm.vimeoCurrentPlayTime == 0 && vm.vimeoPlayStart == false) {
				// 	vm.$refs.player.player.pause();
				// 	vm.$refs.player.player.setCurrentTime(0);
				// }
				vm.vimeoCurrentPlayTime = e.seconds;
			});
		},
		seeking(e) {
			if (e.seconds > this.vimeoCurrentPlayTime) {
				this.$refs.player.player.setCurrentTime(this.vimeoCurrentPlayTime);
			}
		},
		paramsInit() {
			this.tit = this.$route.params.title;
			this.playTime = this.$route.params.playTime;
			this.postLike = parseInt(this.$route.params.postLike);
			this.postHits = this.$route.params.postLike;
			this.videoPath = this.$route.params.videoPath;
			this.postDate = this.$route.params.postDate;
			this.vimeoCd = this.$route.params.videoCd;
			this.cntsCd = this.$route.params.cntsCd;
			this.tablistApi();
			this.relateVideoApi();
		},
		/**
		 * @function tablistApi
		 * @description tab 시리즈 인덱스 비디오 리스트 api
		 */
		tablistApi() {
			const vm = this;
			const userData = {
				cntsCd: this.cntsCd,
			};
			fetchCowaySeriesVideo(userData)
				.then(function (response) {
					vm.tabVideo = response.data.seriesList;
				})
				.catch(function (error) {
					console.log(error);
				});
		},
		/**
		 * @function relateVideoApi
		 * @description 코웨이 연관 비디오 리스트 api
		 */
		relateVideoApi() {
			const vm = this;
			const userData = {
				device: 'W',
				userCode: 'coway',
				offset: 1,
				limit: 5,
				keyword: '',
				sortOptionion: '1',
				devieCode: '',
				sctCd: '',
				contentsCd: this.cntsCd,
			};
			fetchCowayRelativeVideo(userData)
				.then(function (response) {
					vm.relativeVideo = response.data.tvMovList;
				})
				.catch(function (error) {
					console.log(error);
				});
		},
		/**
		 * @function hitsSend
		 * @description 페이지 접속시 조횟수 증가
		 */
		hitsSend() {
			const userData = {
				contentsCode: this.contentsCode,
				userCode: 'coway',
				viewLikeOption: 'V',
			};
			putCowayHitLikeIncrease(userData)
				.then(function (response) {})
				.catch(function (error) {
					console.log(error);
				});
		},
		/**
		 * @function commentTotal
		 * @description 댓글 전체 수
		 */
		commentTotal(cmtTotal) {
			this.commentTotalNum = cmtTotal;
		},
		/**
		 * @function onClickPostLike
		 * @description 조아요 증가
		 */
		onClickPostLike() {
			this.postLike += 1;
			const userData = {
				contentsCode: this.contentsCode,
				userCode: 'coway',
				viewLikeOpt: 'L',
			};
			putCowayHitLikeIncrease(userData)
				.then(function (response) {
					console.log(response);
				})
				.catch(function (error) {
					console.log(error);
				});
		},
	},
};
</script>

<style>
#video-view-wrap
	.video-view-contain
	.relation-video-list
	.video-relation
	.video
	a {
}
</style>
