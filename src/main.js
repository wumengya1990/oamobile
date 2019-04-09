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

// 设置axios跨域
Vue.prototype.$axios = Axios
Axios.defaults.baseURL = '/api'
Axios.defaults.headers.post['Content-Type'] = 'application/json';
// 设置axios跨域结束

Vue.config.productionTip = false

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
