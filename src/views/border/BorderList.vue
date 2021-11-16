<template>
	<div class="sub-contents">
		<h1 class="border-tit">세일즈 자료</h1>
		<div class="calendar-wrap">
			<div class="calendar">
				<label for="start">등록일</label>
				<input type="date" v-model="startDay" />
				<p>~</p>
				<input type="date" v-model="endDay" />
			</div>

			<div class="select-search">
				<select v-model="selected">
					<option>전체</option>
					<option>내용</option>
					<option>제목</option>
				</select>
				<div class="input-box">
					<label for="sales">세일즈</label>
					<input type="text" v-model="keyword" />
					<button @click="searchBorderData">
						<span class="a11y">찾기버튼</span>
					</button>
				</div>
			</div>
		</div>
		<BoardListLoadBtn></BoardListLoadBtn>
		<BoardListItem
			:borderItem="item"
			v-for="item in borderArr"
			:key="item.key"
		></BoardListItem>
		<BorderBottomBtn
			:borderBtnArr="borderBtnArr"
			:pageRange="updateRange"
			@updatePageRange="updatePageRange"
			@btnSettingInit="btnSettingInit"
			@pageListRefresh="pageListRefresh"
		></BorderBottomBtn>
	</div>
</template>

<script>
import { fetchListLoad } from '@/api/border.js';
import { settingBoardList } from '@/util/util.js';
import { mapGetters, mapState } from 'vuex';
import BoardListItem from '@/components/board/BoardListItem.vue';
import BoardListLoadBtn from '@/components/board/BoardListLoadBtn.vue';
import BorderBottomBtn from '@/components/board/BorderBottomBtn.vue';
export default {
	components: {
		BoardListItem,
		BoardListLoadBtn,
		BorderBottomBtn,
	},
	data() {
		return {
			pageRange: 0,
			borderTotalNum: 0, //게시판 전체길이
			borderArr: [], //api에서 가져온 데이타
			viewborderNum: 5, //게시글 리스트 전체 보이는 수
			borderBtnArr: [], // 게시글 페이징 버튼 배열
			subMenuTree: [],
			startDay: '',
			endDay: '',
			selected: '',
			keyword: '',
		};
	},
	computed: {
		...mapState({
			//store state에 값을 바로 뿌려주는 방법.. computed에 sample라는 변수에 state.sampleList값이 담김
			sample: state => state.sampleList,
		}),
		...mapGetters({
			//store getters에 값을 바로 뿌려주는 방법.. computed에 getSample 변수에 state.sampleList값이 담김
			getSample: 'getList',
		}),
		updateRange() {
			return this.pageRange;
		},
	},
	created() {
		/** api 최신 게시글 호출 화면 표시 **/
		const userData = {
			device: 'W',
			borderCode: 'RPRARUC-DRSHYYEPFNJQ',
			offset: 1,
			limit: this.viewborderNum,
		};
		this.fetchList(userData);
		// this.endDay = this.getDay();
	},
	methods: {
		loadRecentlyData() {},
		loadHitsOrderData() {},
		/**
		 * @function fetchList
		 * @description 게시글 세팅 api
		 */
		fetchList(userData) {
			var vm = this;
			fetchListLoad(userData)
				.then(function (response) {
					vm.borderArr = response.data.boardList;
					vm.borderTotalNum = response.data.totalCount;
					/** 페이지 버튼 세팅 */
					vm.btnSettingInit();
				})
				.catch(function (error) {
					console.log(error);
				});

			//비동기 데이타를 스토어 액션에 저장하기
			// this.$store.dispatch('FETCH_LIST');

			//async awit version
			// try {
			// 	const userData = {
			// 		BRD_CD: 'VLRWRXZ-KRBCRHYPNXHZ',
			// 	};
			// 	var response = await loadData(userData);
			// 	this.borderArr = response.data.sampleList;
			// 	this.settingBoardList();
			// } catch (error) {
			// 	console.log(error);
			// }
		},
		/**
		 * @function btnSettingInit
		 * @descrition 게시글 버튼 리스트 세팅
		 */
		btnSettingInit() {
			console.log('페이지렌지', this.pageRange);
			this.borderBtnArr = settingBoardList(
				this.pageRange,
				this.borderTotalNum,
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
				borderCd: 'ABCEDEFG-HIJKLMN',
				offset: pageNum + this.pageRange,
				limit: this.viewborderNum,
				sdate: this.startDay, //날짜 포멧
				endate: this.endDay,
				sortOption: '1', //키워드 검색후 2페이지 누르면 검색 안됨
				keyword: this.keyword,
			};
			fetchListLoad(userData)
				.then(function (response) {
					vm.borderArr = response.data.boardList;
					// console.log(response.data.boardList);
				})
				.catch(function (error) {
					console.log(error);
				});
		},
		updatePageRange(rangeNum) {
			this.pageRange += rangeNum;
			// console.log(this.pageRange);
		},
		searchBorderData() {
			if (this.keyword == '') {
				alert('검색어를 입력해 주세요');
			}
			const userData = {
				device: 'W',
				borderCode: 'ABCEDEFG-HIJKLMN',
				offset: 1,
				limit: this.viewborderNum,
				strDate: this.startDay,
				endDate: this.endDay,
				sortOptionion: '2',
				keyword: this.keyword,
			};
			console.log('userdata', userData);
			this.fetchList(userData);
		},
	},
};
</script>

<style></style>
