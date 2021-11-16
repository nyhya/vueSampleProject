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
		<InputReply
			:pstCd="pstCd"
			:brdCd="brdCd"
			:pageName="pageName"
			@replyBorderInputApi="replyBorderInputApi"
		></InputReply>
		<!-- 리플 쓰기 : e -->
		<!-- 리플 리스트 : s -->
		<CommentList
			:pstCd="pstCd"
			:brdCd="brdCd"
			:comment="comment"
			v-for="(comment, idx) in commentList"
			:key="comment.cmntCd + comment.cntsCd + idx"
			@updateReplyBorderApi="updateReplyBorderApi"
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
import CommentList from '@/components/reply/ItemComment.vue';
import InputReply from '@/components/reply/InputReply.vue';
export default {
	components: {
		CommentList,
		InputReply,
	},
	props: {
		pstCd: {
			type: String,
			default: '',
		},
		brdCd: {
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
			const tempTotal = Math.floor(this.totalNum / this.commentListNum);
			return this.totalNum % this.commentListNum > 0
				? tempTotal + 1
				: tempTotal;
		},
		remainderNum() {
			return this.totalNum % this.commentListNum;
		},
	},
	created() {
		/**
		 * 리플 api 불러오기
		 * border PstCd
		 * coway cntsCd
		//  */
		const userData = {
			divice: 'W',
			userCd: this.userCd,
			offset: 1,
			limit: this.commentListNum,
		};
		this.replyBorderApi(userData);
	},
	methods: {
		/**
		 * @function replyBorderApi
		 * @description 게시판 리플 API
		 */
		replyBorderApi(userData) {
			const vm = this;
			fetchCommentList(userData)
				.then(function (response) {
					response.data.cmntList.map(function (item) {
						vm.commentList.push(item);
						console.log(vm.commentList);
					});
					vm.totalNum = response.data.totalCount;
				})
				.catch(function (error) {
					console.log(error);
				});
		},
		updateReplyBorderApi(order) {
			console.log(order);
			const commentLength =
				order == 'modify'
					? this.commentList.length
					: this.commentList.length - 1;
			const vm = this;
			this.commentList = [];
			const userData = {
				device: 'W',
				pstCd: this.pstCd,
				offset: 1,
				limit: commentLength,
				// limit: this.commentList.length - 1,
			};
			fetchCommentList(userData)
				.then(function (response) {
					response.data.cmntList.map(function (item) {
						vm.commentList.push(item);
						console.log(vm.commentList);
					});
					vm.totalNum = response.data.totalCount;
				})
				.catch(function (error) {
					console.log(error);
				});
		},
		onClickAddComment() {
			/** 코멘트 더보기 막기 */
			if (this.pageTotalNum > this.commentActivePage) {
				this.commentActivePage += 1;
			} else {
				return;
			}
			if (this.totalNum == this.commentActivePage) {
				this.commentListNum = remainderNum;
			}
			/**
			 * 코멘트 API 호출
			 */
			const userData = {
				device: 'W',
				pstCd: this.pstCd,
				offset: this.commentActivePage,
				limit: this.commentListNum,
			};
			this.replyBorderApi(userData);
		},
		replyBorderInputApi() {
			const userData = {
				divice: 'W',
				postCd: this.postCd,
				offset: 1,
				limit: 1,
			};
			const vm = this;
			console.log('userData', userData);
			fetchCommentList(userData)
				.then(function (response) {
					response.data.cmntList.map(function (item) {
						console.log(response.data.cmntList);
						vm.commentList.unshift(item);
					});
					// vm.totalNum = response.data.totalCount;
				})
				.catch(function (error) {
					console.log(error);
				});
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
	right: -10px;
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
