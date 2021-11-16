<template>
	<div class="reply">
		<div class="user-info">
			<p class="user"><span>지은님~</span>자료에 대한 댓글을 남겨 보세요!</p>
			<div class="center-line"></div>
		</div>
		<p class="reply-tit">
			<span class="txt">댓글</span><span class="num">128</span>
		</p>
		<!-- 리플 쓰기 : s -->
		<InputReply :code="this.code" @replyCowayApi="replyCowayApi"></InputReply>
		<!-- 리플 쓰기 : e -->
		<!-- 리플 리스트 : s -->
		<CommentList
			:code="code"
			:comment="comment"
			v-for="(comment, idx) in commentList"
			:key="comment.cmntCd + comment.cntsCd + idx"
			@replyCowayApi="replyCowayApi"
		></CommentList>
		<!-- 리플 리스트 : e -->
		<div class="comment-btn">
			<button class="btn-addComment" @click="onClickAddComment">
				더보기<span class="active" v-html="commentActivePage"></span
				><span class="total" v-html="pageTotalNum"></span>
			</button>
		</div>
	</div>
</template>

<script>
import { fetchCommentList } from '@/api/border.js';
import { fetchCowayCommentList } from '@/api/cowayVideo.js';
import CommentList from '@/components/reply/ItemComment.vue';
import InputReply from '@/components/reply/InputReply.vue';
export default {
	components: {
		CommentList,
		InputReply,
	},
	props: {
		code: {
			type: String,
			default: '',
		},
		pageName: {
			type: String,
			default: '',
		},
	},

	data() {
		return {
			commentListNum: 2,
			commentList: [],
			totalNum: 0,
			commentActivePage: 1,
		};
	},
	computed: {
		pageActiveNum() {
			return Math.floor(this.totalNum / this.commentListNum);
		},
		pageTotalNum() {
			return Math.floor(this.totalNum / this.commentListNum);
		},
	},
	created() {
		/**
		 * 리플 api 불러오기
		 * border PstCd
		 * coway cntsCd
		//  */
		this.init();
	},
	methods: {
		init() {
			if (this.pageName == 'border') {
				this.replyBorderApi();
			} else if (this.pageName == 'coway') {
				const userData = {
					divice: 'W',
					contentCode: this.contentCode,
					offset: 1,
					limit: this.commentListNum,
				};
				this.replyCowayApi(userData);
			}
			console.log('리플 현재 접속 페이지', this.pageName);
		},
		/**
		 * @function replyBorderApi
		 * @description 게시판 리플 API
		 */
		replyBorderApi() {
			const vm = this;
			const userData = {
				divice: 'W',
				postCode: this.postCode,
				offset: 1,
				limit: this.commentListNum,
			};
			fetchCommentList(userData)
				.then(function (response) {
					vm.commentList = response.data.commentList;
					vm.totalNum = response.data.totalCount;
				})
				.catch(function (error) {
					console.log(error);
				});
		},
		/**
		 * @function replyCowayApi
		 * @description 코웨이 TV 리플 API
		 */
		replyCowayApi(userData) {
			const vm = this;
			fetchCowayCommentList(userData)
				.then(function (response) {
					vm.commentList = response.data.tvMovList;
					vm.totalNum = response.data.totalCount;
					vm.$emit('commentTotal', vm.totalNum);
					console.log(response.data);
				})
				.catch(function (error) {
					console.log(error);
				});
		},
		onClickAddComment() {
			this.commentActivePage += 1;
			const userData = {
				divice: 'W',
				commentList: this.code,
				offset: this.commentActivePage,
				limit: this.commentListNum,
			};
			console.log(userData);
			this.replyCowayApi(userData);
		},
	},
};
</script>

<style>
.user-info {
	position: relative;
	margin: 100px 0px;
	text-align: center;
}
.user-info .center-line {
	position: absolute;
	top: 50%;
	width: 100%;
	border-bottom: 1px #444651 dotted;
}
.user-info .user {
	position: relative;
	display: inline-block;
	border: 1px #444652 solid;
	color: #8f8f93;
	padding: 16px 50px;
	border-radius: 28px;
	background-color: #222329;
	z-index: 1;
}
.user-info .user span {
	font-weight: 500;
	color: #ddd;
	margin-right: 3px;
}

.reply-tit {
	margin-bottom: 16px;
}
.reply-tit span.txt {
	font-family: NotoSansCJKKR;
	font-size: 19px;
	font-weight: 500;
	font-stretch: normal;
	font-style: normal;
	line-height: 1.32;
	letter-spacing: -0.48px;
	color: #ddd;
	margin-right: 4px;
}
.reply-tit span.num {
	font-family: Roboto;
	font-size: 20px;
	font-weight: 500;
	font-stretch: normal;
	font-style: normal;
	line-height: 1.25;
	letter-spacing: normal;
	color: #0899dc;
}

.btn-addComment {
	padding: 15px 133px 15px 115px;
	border-radius: 28px;
	border: solid 1px #444652;
	font-family: NotoSansCJKKR;
	font-size: 15px;
	font-weight: 500;
	letter-spacing: -0.38px;
	color: #8f8f93;
	background: url(../../assets/image/common/ico-more-arrow.png) no-repeat 214px
		47%/20px 20px;
	cursor: pointer;
}
.btn-addComment span.active {
	position: relative;
	font-family: Roboto;
	font-size: 16px;
	font-weight: bold;
	font-stretch: normal;
	font-style: normal;
	line-height: 21px;
	letter-spacing: normal;
	text-align: center;
	color: #dddddd;
	margin-left: 8px;
}
.btn-addComment span.active::after {
	position: absolute;
	left: 12px;
	top: -1px;
	width: 6px;
	height: 15px;
	content: '\002F';
}
.btn-addComment span.total {
	font-family: Roboto;
	font-size: 16px;
	font-weight: 500;
	font-stretch: normal;
	font-style: normal;
	line-height: 21px;
	letter-spacing: normal;
	color: #6a6a6c;
	padding-left: 13px;
}

.comment-btn {
	margin-top: 40px;
	text-align: center;
}
</style>
