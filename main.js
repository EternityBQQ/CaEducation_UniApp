import Vue from 'vue'
import App from './App'

import store from './store';
import request from './common/service/request.js';

import cuCustom from './common/colorui/components/cu-custom.vue'

Vue.config.productionTip = false
Vue.component('cu-custom',cuCustom)

Vue.prototype.$store = store;

// 注册网络请求
Vue.prototype.$request = request;

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
