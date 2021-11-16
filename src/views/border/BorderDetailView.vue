<template>
	<div id="border-detail-view-wrap">
		<div class="border-detail-view-contain">
			<div class="sub-contents">
				<h1 class="border-tit">세일즈 자료</h1>
				<div class="detail-view-item-wrap">
					<div class="detail-view-item-contain">
						<!-- 페이지 : s -->
						<div class="view-page">
							<p class="detail-page-info">
								<span>2021-07-30</span><span>조회수</span><span>1258</span>
							</p>
							<h3 v-html="viewDetail.tit"></h3>
							<hashTagKeyword :hashtag="hashTag"></hashTagKeyword>
							<hr />
							<p class="txt-area" v-html="viewDetail.contents"></p>
							<div class="attached-file">
								<ul>
									<li class="file"><span>세일즈비법..pdf(000.0k)</span></li>
									<li class="file"><span>세일즈비법..pdf(000.0k)</span></li>
								</ul>
							</div>
							<hr />
						</div>
						<!-- //페이지 : e -->
						<!-- 하단 버튼 : s -->
						<div class="bottom-btns">
							<div class="btn">
								<button class="list-btn" @click="onClickPrePage">
									<span>이전글</span>
								</button>
								<button class="list-btn" @click="onClickNextPage">
									<span>다음글</span>
								</button>
							</div>
							<button class="list-btn" @click="$router.go(-1)">
								<span>목록</span>
							</button>
						</div>
						<!-- 하단 버튼 : e -->
						<!-- 댓글 영역 : s -->
						<Comment
							:pstCd="this.listItem.pstCd"
							:brdCd="this.listItem.brdCd"
							:pageName="'border'"
						></Comment>
						<!-- 댓글 영역 : e -->
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { fetchDetailView } from '@/api/border.js';
import Comment from '@/components/reply/Comment.vue';
import HashTagKeyword from '@/components/HashTagKeyword.vue';
export default {
	components: {
		Comment,
		HashTagKeyword,
	},
	data() {
		return {
			listItem: {
				pstCd: '',
				brdCd: '',
				prevPstCd: '',
				nextPstCd: '',
				tit: '',
				contents: '',
				date: '',
				viewCnt: '',
				likeCnt: '',
				userCode: '',
			},
			commentListNum: 5,
			commentList: [],
			hashTag: [
				{ keyword: '#정수기' },
				{ keyword: '#세일즈노하우' },
				{ keyword: '#서비스마인드' },
				{ keyword: '#정수기' },
			],
		};
	},
	computed: {
		viewDetail() {
			return this.listItem;
		},
	},
	created() {
		this.listItem.userCode = this.$route.params.userCode;
		this.listItem.brdCd = this.$route.params.brdCd;
		this.listItem.pstCd = this.$route.params.pstCd;
		/**
		 * 파라미터 brdCd, pstCd 받기
		 */
		this.detailViewInit(
			this.listItem.userCode,
			this.listItem.brdCd,
			this.listItem.pstCd,
		);
	},
	methods: {
		/**
		 *@function detailViewInit
		 *@description 게시판 상세페이지 내용 뿌리기 API
		 */
		detailViewInit(userCode, brdCd, pstCd) {
			console.log(userCode, brdCd, pstCd);
			const vm = this;
			const userData = {
				userCode: userCode,
				brdCd: brdCd,
				pstCd: pstCd,
			};
			fetchDetailView(userData)
				.then(function (response) {
					/** 게시글 뷰페이지 세팅 */
					vm.listItem.prevPstCd = response.data.boardInfo.prevPstCd;
					vm.listItem.nextPstCd = response.data.boardInfo.nextPstCd;
					vm.listItem.tit = response.data.boardInfo.pstNm;
					vm.listItem.contents = response.data.boardInfo.pstCnts;
					vm.listItem.date = response.data.boardInfo.rgtDtm;
					vm.listItem.viewCnt = response.data.boardInfo.viewCnt;
					vm.listItem.likeCnt = response.data.boardInfo.likeCnt;
				})
				.catch(function (error) {
					console.log(error);
				});
		},
		/**
		 * @function prePag
		 * @description 이전 글
		 */
		onClickPrePage() {
			/**
			 * pstCd 이전 prevPstCd로 변경
			 */
			this.detailViewInit(
				this.listItem.userCode,
				this.listItem.brdCd,
				this.listItem.prevPstCd,
			);
		},
		/**
		 * @function nextPag
		 * @description 다음 글
		 */
		onClickNextPage() {
			/**
			 * pstCd 이전 prevPstCd로 변경
			 */
			this.detailViewInit(
				this.listItem.userCode,
				this.listItem.brdCd,
				this.listItem.nextPstCd,
			);
		},
	},
};
</script>
