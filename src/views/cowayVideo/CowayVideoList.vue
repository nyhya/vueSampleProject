<template>
	<div class="sub-contents">
		<h1 class="border-tit">상품정보</h1>
		<!-- 해시태그 메뉴 : s  -->
		<div class="hashTag">
			<ul>
				<HashTagMenu
					:title="item"
					v-for="item in menuTree"
					:key="item.key"
				></HashTagMenu>
			</ul>
		</div>
		<!-- 해시태그 메뉴 : e  -->
		<!-- 최신순 조회순 전체 : s  -->
		<div class="btn-list">
			<ul>
				<ListBtns
					:limitNum="viewborderNum"
					:userCode="userCode"
					:obj="tit"
					@refreshCowayList="refreshCowayList"
					v-for="tit in listBtn"
					:key="tit.key"
				></ListBtns>
			</ul>
			<div class="total-list-num">
				전체 <span>{{ `${248}건` }}</span>
			</div>
		</div>
		<!-- 최신순 조회순 전체 : e  -->
		<!-- 비디오 리스트 : s  -->
		<div class="video-list-contents">
			<router-link
				v-for="(video, idx) in cowayApiList"
				:key="video.cntsCd + idx"
				:to="{
					name: 'videoView',
					params: {
						title: video.cntsNm,
						playTime: video.duration,
						postLike: video.likeCnt,
						postHits: video.updDtm,
						videoPath: video.cntsPath,
						postDate: video.updDtm,
						videoCd: video.vimeoCd,
						cntsCd: video.cntsCd,
					},
				}"
				target="_blank"
				><ItemVideo :videoInfo="video"></ItemVideo
			></router-link>
		</div>
		<BorderBottomBtn
			:borderBtnArr="borderBtnArr"
			@pageListRefresh="pageListRefresh"
		></BorderBottomBtn>
		<!-- 비디오 리스트 : e  -->
	</div>
</template>

<script>
import HashTagMenu from '@/components/HashTagMenu.vue';
import ListBtns from '@/components/ListBtns.vue';
import ItemVideo from '@/components/ItemVideo.vue';
import BorderBottomBtn from '@/components/board/BorderBottomBtn.vue';
import { fetchCowayVideoList } from '@/api/cowayVideo.js';
import { settingBoardList } from '@/util/util.js';
export default {
	components: {
		HashTagMenu,
		ListBtns,
		ItemVideo,
		BorderBottomBtn,
	},
	data() {
		return {
			cowayApiList: [],
			cowayListTotal: null,
			viewborderNum: 10,
			borderBtnArr: 0,
			userCode: 'coway',
			listKey: '1',
			menuTree: [
				{ tit: '전체', active: 1, key: 1 },
				{ tit: '정수기', active: 0, key: 2 },
				{ tit: '비데', active: 0, key: 3 },
				{ tit: '매트리스', active: 0, key: 4 },
				{ tit: '코스메틱', active: 0, key: 5 },
				{ tit: '기타', active: 0, key: 6 },
			],
			listBtn: [
				{ tit: '최신순', active: 1, key: 1 },
				{ tit: '조회순', active: 0, key: 2 },
				{ tit: '좋아요순', active: 0, key: 3 },
			],
		};
	},
	computed: {},
	watch: {},
	created() {},
	mounted() {
		this.apiCall();
	},
	methods: {
		apiCall() {
			var vm = this;
			const userData = {
				device: 'W',
				userCode: this.userCode,
				offset: 1,
				limit: this.viewborderNum,
				keyword: '',
				sortOption: this.listKey,
				divCd: '',
				sctrCd: '',
			};
			fetchCowayVideoList(userData)
				.then(function (response) {
					vm.cowayApiList = response.data.tvMovList;
					vm.cowayListTotal = response.data.totalCount;
					vm.btnSettingInit();
				})
				.catch(function (error) {
					console.log('코웨이 tv api error', error);
				});
		},
		/**
		 * @function btnSettingInit
		 * @descrition 게시글 버튼 리스트 세팅
		 */
		btnSettingInit() {
			this.borderBtnArr = settingBoardList(
				this.cowayListTotal,
				this.viewborderNum,
			);
		},
		/**
		 * @function pageListRefresh
		 * @description 페이지 리스트 리프레시
		 */
		pageListRefresh(pageNum) {
			var vm = this;
			const userData = {
				device: 'W',
				userCode: this.userCode,
				offset: pageNum,
				limit: this.viewborderNum,
				keyword: '',
				sortOption: this.listKey,
				divCd: '',
				sctrCd: '',
			};
			console.log(userData);
			fetchCowayVideoList(userData)
				.then(function (response) {
					vm.cowayApiList = response.data.tvMovList;
				})
				.catch(function (error) {
					console.log(error);
				});
		},
		/**
		 * @function refreshCowayList
		 * @description 최신순 조회순 좋아요 순정렬
		 */
		refreshCowayList(cowayApiList, key) {
			this.resetCowayList();
			this.listBtn[key - 1].active = 1;
			this.listKey = key.toString();
			this.cowayApiList = cowayApiList;
			this.btnSettingInit();
		},
		resetCowayList() {
			for (var i = 0; i < this.listBtn.length; i++) {
				this.listBtn[i].active = 0;
			}
		},
	},
};
</script>

<style></style>
