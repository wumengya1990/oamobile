// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vant from 'vant'
import 'vant/lib/index.css'
import router from './router'
import Vuex from 'vuex'
import store from './store/store'
require("./assets/fonts/iconfont.css")
import element from 'element-ui'
require('element-ui/lib/theme-chalk/index.css')
import api from './http'
import qs from 'qs'

// 设置axios跨域

// 设置axios跨域结束

Vue.config.productionTip = false

Vue.prototype.$api = api;
Vue.prototype.$qs = qs;


Vue.use(element);
Vue.use(Vant);          //使用Vant
Vue.use(Vuex);          //使用Vuex

//vue初始化
let initVue = function () {
  new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    mounted() {
      console.log("开始初始化Vue");
      this.$store.commit("saveApiUrl", Vue.prototype.apiUrl); //保存 ApiUrl
    },
  template: '<App/>'
  });
}

//app初始化(首先读取配置信息)
let initApp = function () {
  console.log("开始初始化app");
  let nodeEnv = process.env.NODE_ENV;
  if (nodeEnv === 'production') { //生产环境
    if (window.localStorage.ApiUrl != "" && window.localStorage.ApiUrl != undefined) {
      let apiUrl = window.localStorage.ApiUrl;
      console.log("读取localStorage中的api:" + apiUrl);
      Vue.prototype.apiUrl = apiUrl;
      initVue();
    } else {
      //获取配置文件中的地址
      axios.get('/static/appConfig.json').then((res) => {
        let apiUrl = res.data.ApiUrl;
        console.log("读取配置文件中的api:" + apiUrl);
        Vue.prototype.apiUrl = apiUrl;
        initVue();
      }).catch((err) => {
        console.log("配置文件读取失败:" + err);
        let apiUrl = process.env.API_HOST;
        console.log("读取process中的api:" + apiUrl);
        Vue.prototype.apiUrl = apiUrl;
        initVue();
      });
    }
  } else { //开发环境直接读取
    let apiUrl = process.env.API_HOST;
    console.log("开发环境直接读取process中的api:" + apiUrl);
    Vue.prototype.apiUrl = apiUrl;
    initVue();
  }
}

initApp();
