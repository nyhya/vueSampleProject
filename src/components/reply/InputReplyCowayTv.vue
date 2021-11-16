<template>
	<div class="input-field">
		<div class="user-img"></div>
		<div class="user-txt">
			<p class="name">이**님</p>
			<p class="region">[CL.강동지부]</p>
		</div>
		<div class="user-input">
			<button class="comment-btn" @click="onClickInputComment">등록</button>
			<p><span class="active-len">12</span><span class="total-len">88</span></p>
			<form action="">
				<textarea name="" id="" v-model="comment"> </textarea>
			</form>
		</div>
	</div>
</template>

<script>
import { putCowayComment } from '@/api/cowayVideo.js';
export default {
	props: {
		code: {
			type: String,
			default: '',
		},
	},
	data() {
		return {
			comment: '',
		};
	},
	methods: {
		onClickInputComment() {
			/**
			 *  "comment" : "" //수정할때 넣는거
     			"contentCode" : "17839FCDB96BBGVPILYJ", 필수
     			"userCode" : "coway", user 정보
     			"commentCd" : "" //댓글 내용
			 */
			console.log(this.code);
			const vm = this;
			var userData = {
				comment: '',
				contentCode: this.code,
				userCode: 'coway',
				commentCd: this.comment,
				upCountCd: '',
			};
			putCowayComment(userData)
				.then(function (response) {
					console.log(response);
					vm.$emit('replyApi');
				})
				.catch(function (error) {
					console.log(error);
				});
		},
	},
};
</script>

<style>
.input-field {
	display: flex;
	align-items: flex-start;
	background-color: #222329;
	padding: 24px 20px;
	border: solid #444652 1px;
	border-radius: 8px;
	margin-bottom: 20px;
}
.input-field .user-img {
	width: 40px;
	height: 40px;
	display: inline-block;
	background: url(../../assets/image/border/ico-user-profile-img.png) no-repeat
		center center/100% auto;
	margin-right: 20px;
}
.input-field .user-txt {
	display: inline-block;
}
.input-field .user-txt p {
	width: 124px;
}
.input-field .user-txt p.name {
	font-family: NotoSansCJKKR;
	color: #dddddd;
	font-size: 16px;
	font-weight: 500;
	font-stretch: normal;
	font-style: normal;
	line-height: 1.5;
	letter-spacing: -0.4px;
}
.input-field .user-txt p.region {
	font-family: NotoSansCJKKR;
	font-size: 15px;
	font-weight: normal;
	font-stretch: normal;
	font-style: normal;
	line-height: 1.6;
	letter-spacing: -0.38px;
	color: #8f8f93;
}
.input-field .user-input {
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
.input-field .user-input button.comment-btn {
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
.input-field .user-input p span {
	font-family: Roboto;
	font-size: 13px;
	font-weight: bold;
	font-stretch: normal;
	font-style: normal;
	line-height: 1.77;
	letter-spacing: -0.33px;
}
.input-field .user-input p {
	position: absolute;
	right: 117px;
	bottom: 12px;
}

.input-field .user-input p span.active-len {
	position: relative;
	color: #dddddd;
	margin-right: 10px;
}

.input-field .user-input p span.active-len::after {
	position: absolute;
	left: 17px;
	height: 13px;
	width: 5px;
	content: '\002F';
}

.input-field .user-input p span.total-len {
	color: #6a6a6c;
}

.input-field .user-input form {
	width: 100%;
	height: 100%;
}
.input-field .user-input textarea {
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
