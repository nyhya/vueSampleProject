import Vue from 'vue';
import Vuex from 'vuex';
import mutations from '@/store/mutations.js';
import actions from '@/store/actions.js';

Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
		sampleList: [],
	},
	getters: {
		getList(state) {
			return state.sampleList;
		},
	},
	mutations: mutations,
	actions: actions,
});
