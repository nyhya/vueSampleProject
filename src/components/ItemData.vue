<template>
	<div class="data-item">
		<p class="key">No.250</p>
		<div class="desc-info">
			<p class="date">2021-07-30</p>
			<p>조회수&nbsp;</p>
			<p>1258</p>
		</div>
		<p class="title" v-html="title"></p>
		<div>
			<button class="data-btn">
				<span>다운로드</span>
			</button>
			<button class="data-btn">
				<span>상세보기</span>
			</button>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			title:
				'한 큐에 끝내는 세일즈 UP 기술 심리학<br>설득의 심리학 설득의 심리학',
		};
	},
};
</script>

<style>
.data-item {
	box-sizing: border-box;
	width: 413px;
	height: 221px;
	border-radius: 16px;
	box-shadow: 0 15px 10px 0 rgba(0, 0, 0, 0.05);
	padding: 24px;
	background-color: #2d2e36;
}

.key {
	font-family: Roboto;
	font-size: 17px;
	line-height: 1.29;
	color: #ddd;
}

.desc-info {
	font-family: Roboto;
	font-size: 13px;
	font-weight: 500;
	line-height: 2.15;
	color: #888;
}

.desc-info .date::after {
	content: '\00B7';
	margin: 0 4px;
	color: #8f8f93;
}

.desc-info p {
	display: inline-block;
}

.title {
	font-family: NotoSansCJKKR;
	font-size: 16px;
	line-height: 1.5;
	letter-spacing: -0.4px;
	color: #dddddd;
	margin-bottom: 26px;
}

button.data-btn:first-child {
	margin-right: 16px;
}

button.data-btn {
	width: calc((100% - 16px) / 2);
	border-radius: 8px;
	background-color: #383841;
	padding: 11px 0px;
}

button.data-btn span {
	font-family: NotoSansCJKKR;
	font-size: 15px;
	line-height: 22px;
	letter-spacing: -0.75px;
	color: #ddd;
}
</style>
