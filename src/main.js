import Vue from 'vue';
import App from './App.vue';

import MainStyle from '@/assets/css/style.css';
import RestStyle from '@/assets/css/reset.css';
import CommonStyle from '@/assets/css/common.css';
import NormalizeStyle from '@/assets/css/normalize.css';
import router from '@/routes/index.js';
import Vuetify from 'vuetify';
import { store } from '@/store/index.js';

Vue.config.productionTip = false;
Vue.use(MainStyle);
Vue.use(RestStyle);
Vue.use(CommonStyle);
Vue.use(NormalizeStyle);
Vue.use(Vuetify);
new Vue({
	render: h => h(App),
	router,
	store,
}).$mount('#app');
