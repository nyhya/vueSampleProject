<template>
	<div class="replay-wrap">
		<div class="comment-manu">
			<button @click="onClickModify">수정</button>
			<button @click="onClickDelete">삭제</button>
			<div class="re-comment-num">
				<span>0</span>
			</div>
		</div>

		<div class="reply-item">
			<div class="user-img"></div>
			<div class="user-txt">
				<p class="name">이**님</p>
				<p class="region">[CL.강동지부]</p>
			</div>
			<div v-if="showToggle" class="user-reply">
				<p class="date" v-html="comment.rgtDtm"></p>
				<p class="contents" v-html="comment.cmntCnts"></p>
			</div>
			<div v-else class="user-input">
				<button class="comment-btn" @click="onClickInputComment">등록</button>
				<p>
					<span class="active-len">12</span><span class="total-len">88</span>
				</p>
				<form action="">
					<textarea name="" id="" v-model="modifyComment"> </textarea>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import { deleteComment, PutBorderComment } from '@/api/border.js';
export default {
	props: {
		comment: {
			type: Object,
			default: null,
		},
		pstCd: {
			type: String,
			default: '',
		},
		brdCd: {
			type: String,
			default: '',
		},
	},
	components: {},
	data() {
		return {
			showToggle: true,
			modifyComment: this.comment.cmntCnts,
		};
	},
	created() {},
	methods: {
		/**
		 * @function onClickModify
		 * @description 댓글 수정
		 */
		onClickModify() {
			this.showToggle = !this.showToggle;
		},
		/**
		 * @function onClickDelete
		 * @description 댓글 삭제
		 */
		onClickDelete() {
			const vm = this;
			const userData = {
				postCode: this.postCode,
				commentCode: this.comment.commentCode,
			};
			console.log(userData);
			deleteComment(userData)
				.then(function (response) {
					vm.$emit('updateReplyBorderApi', 'delete');
				})
				.catch(function (error) {
					console.log(error);
				});
		},
		onClickInputComment() {
			this.showToggle = !this.showToggle;
			/**
			 *  "cmntCd" : "" //수정할때 넣는거
     			"cntsCd" : "17839FCDB96BBGVPILYJ", 필수
     			"userCode" : "coway", user 정보
     			"cmntCnts" : "" //댓글 내용
			 */
			const vm = this;
			var userData = {
				borderCode: this.brdCd,
				commentCode: this.comment.cmntCd,
				postCode: this.pstCd,
				userCode: 'coway',
				commentCode: this.modifyComment,
				upCode: '',
			};

			PutBorderComment(userData)
				.then(function (response) {
					console.log(response, 'user', userData);
					vm.$emit('updateReplyBorderApi', 'modify');
				})
				.catch(function (error) {
					console.log(error);
				});
		},
	},
};
</script>

<style>
.replay-wrap {
	position: relative;
}

.reply-item {
	display: flex;
	align-items: flex-start;
	background-color: #2d2e36;
	padding: 24px 20px;
	border: solid #444652 1px;
	border-radius: 8px;
	margin-bottom: 4px;
}

.comment-manu {
	position: absolute;
	right: 32px;
	top: 24px;
}

.comment-manu button {
	font-family: NotoSansCJKKR;
	font-size: 13px;
	font-weight: 500;
	line-height: 1.5;
	letter-spacing: -0.33px;
	color: #8f8f93;
	border-bottom: 1px solid #8f8f93;
	padding: 0;
	margin-right: 20px;
	cursor: pointer;
}

.comment-manu .re-comment-num {
	height: 32px;
	display: inline-block;
	background: url(../../assets/image/common/ico-comment-number.png) no-repeat
		17px center/15px auto;
	border-radius: 30px;
	border: 1px solid #444652;
}
.comment-manu .re-comment-num span {
	font-family: Roboto;
	font-size: 14px;
	font-weight: 500;
	line-height: 34px;
	letter-spacing: -0.35px;
	color: #8f8f93;
	padding: 6px 16px 6px 36px;
}
.reply-item .user-img {
	width: 40px;
	height: 40px;
	display: inline-block;
	background: url(../../assets/image/border/ico-user-profile-img.png) no-repeat
		center center/100% auto;
	margin-right: 20px;
}
.reply-item .user-txt {
	display: inline-block;
}
.reply-item .user-txt p {
	width: 124px;
}
.reply-item .user-txt p.name {
	font-family: NotoSansCJKKR;
	color: #dddddd;
	font-size: 16px;
	font-weight: 500;
	font-stretch: normal;
	font-style: normal;
	line-height: 1.5;
	letter-spacing: -0.4px;
}
.reply-item .user-txt p.region {
	font-family: NotoSansCJKKR;
	font-size: 15px;
	font-weight: normal;
	font-stretch: normal;
	font-style: normal;
	line-height: 1.6;
	letter-spacing: -0.38px;
	color: #8f8f93;
}
.reply-item .user-reply {
	width: 800px;
	height: 90px;
	display: inline-block;
}
.reply-item .user-reply .date {
	font-family: Roboto;
	font-size: 14px;
	font-weight: 500;
	color: #8f8f93;
	line-height: 19px;
	margin-bottom: 4px;
}
.reply-item .user-reply .contents {
	font-family: NotoSansCJKKR;
	font-size: 16px;
	font-weight: normal;
	font-stretch: normal;
	font-style: normal;
	line-height: 1.5;
	letter-spacing: -0.4px;
	color: #ddd;
}
.re-reply-item {
	display: flex;
	align-items: flex-start;
	background-color: #2d2e36;
	padding: 24px 20px;
	border: solid #444652 1px;
	border-radius: 8px;
	margin-top: 4px;
}
.re-reply-item .user-img {
	width: 40px;
	height: 40px;
	display: inline-block;
	background: url(../../assets/image/border/ico-user-profile-img.png) no-repeat
		center center/100% auto;
	margin-right: 20px;
}
.re-reply-item .user-txt {
	display: inline-block;
}
.re-reply-item .user-txt p {
	width: 124px;
}
.re-reply-item .user-txt p.name {
	font-family: NotoSansCJKKR;
	color: #dddddd;
	font-size: 16px;
	font-weight: 500;
	font-stretch: normal;
	font-style: normal;
	line-height: 1.5;
	letter-spacing: -0.4px;
}
.re-reply-item .user-txt p.region {
	font-family: NotoSansCJKKR;
	font-size: 15px;
	font-weight: normal;
	font-stretch: normal;
	font-style: normal;
	line-height: 1.6;
	letter-spacing: -0.38px;
	color: #8f8f93;
}
.re-reply-item .user-reply {
	width: 800px;
	height: 90px;
	display: inline-block;
}
.re-reply-item .user-reply .date {
	font-family: Roboto;
	font-size: 14px;
	font-weight: 500;
	color: #8f8f93;
	line-height: 19px;
	margin-bottom: 4px;
}
.re-reply-item .user-reply .contents {
	font-family: NotoSansCJKKR;
	font-size: 16px;
	font-weight: normal;
	font-stretch: normal;
	font-style: normal;
	line-height: 1.5;
	letter-spacing: -0.4px;
	color: #ddd;
}

.user-input {
	position: relative;
	width: calc(100% - 184px);
	height: 90px;
	background-color: #222329;
	border-radius: 8px;
	box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.16);
	border: solid 1px #444652;
	display: inline-block;
	background-color: #1c1c21;
}
.user-input button.comment-btn {
	position: absolute;
	right: 12px;
	bottom: 12px;
	font-family: NotoSansCJKKR;
	font-size: 15px;
	font-weight: bold;
	font-stretch: normal;
	font-style: normal;
	line-height: 22px;
	letter-spacing: -0.38px;
	color: #fff;
	background-color: #0899dc;
	padding: 11px 30px;
	border-radius: 8px;
	box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.16);
	cursor: pointer;
}
.user-input p span {
	font-family: Roboto;
	font-size: 13px;
	font-weight: bold;
	font-stretch: normal;
	font-style: normal;
	line-height: 1.77;
	letter-spacing: -0.33px;
}
.user-input p {
	position: absolute;
	right: 117px;
	bottom: 12px;
}

.user-input p span.active-len {
	position: relative;
	color: #dddddd;
	margin-right: 10px;
}

.user-input p span.active-len::after {
	position: absolute;
	left: 17px;
	height: 13px;
	width: 5px;
	content: '\002F';
}

.user-input p span.total-len {
	color: #6a6a6c;
}

.user-input form {
	width: 100%;
	height: 100%;
}
.user-input textarea {
	box-sizing: border-box;
	width: 100%;
	height: 100%;
	font-family: NotoSansCJKKR;
	font-size: 16px;
	font-weight: normal;
	font-stretch: normal;
	font-style: normal;
	line-height: 1.5;
	letter-spacing: -0.4px;
	background-color: transparent;
	border: 0;
	outline: 0;
	resize: none;
	color: #dddddd;
	padding: 5px 10px;
}
</style>
