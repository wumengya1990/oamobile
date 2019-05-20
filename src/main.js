// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vant from 'vant'
import 'vant/lib/index.css'
import router from './router'
import Axios from 'axios'
import Vuex from 'vuex'
import store from './store/store'
import {post,fetch,patch,put} from './htttp'
import api from './https'
require("./assets/fonts/iconfont.css")
import element from 'element-ui'
require('element-ui/lib/theme-chalk/index.css')

// 设置axios跨域
Vue.prototype.$post=post;
Vue.prototype.$fetch=fetch;
Vue.prototype.$patch=patch;
Vue.prototype.$put=put;
Vue.prototype.$api=api;
// 设置axios跨域结束

Vue.config.productionTip = false

Vue.use(element);
Vue.use(Vant);          //使用Vant
Vue.use(Vuex);          //使用Vuex

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  
  components: { App },
  template: '<App/>'
})
