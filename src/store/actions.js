import { fetchListLoad } from '@/api/index.js';

export default {
	//비동기 데이타를 스토어에 저장할시 사용
	FETCH_LIST(context) {
		loadData()
			.then(response => {
				context.commit('SET_LIST', response.data.sampleList);
			})
			.catch(error);
	},
	//디스턱춰링
	FETCH_LISTS({ commit }) {
		loadData()
			//response 에 데이타 값만 추출 함
			.then(({ data }) => {
				//context 가 commit 속성을 가지고 있으므로..
				commit('SET_LIST', data);
			})
			.catch(error);
	},
};
