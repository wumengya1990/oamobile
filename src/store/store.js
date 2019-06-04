import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    rightLayerEstate: false,
    token: '',
    uid:'',
    tzAuthority:0,           //通知
    gwAuthority:0,           //公文
    qjAuthority:0,           //请假
    userName:'',           //当前登录用户姓名
    userRole: 0,
    haveLogin:false,
    apiUrl: window.localStorage.ApiUrl
  },
  mutations: {
    switch_dialog(state) { //这里的state对应着上面这个state
      state.rightLayerEstate = state.rightLayerEstate ? false : true;
      //你还可以在这里执行其他的操作改变state
    },
    // 保存地址
    saveApiUrl(state, data) {
      state.apiUrl = data;
      window.localStorage.setItem("ApiUrl", data); //就是这里，保存到了 localStorage 中
      console.log("api写入Store与localStorage中：" + data);
    },
    //保存token
    saveToken(state, data) {
      state.token = data;
      window.localStorage.setItem("Token", data); //就是这里，保存到了 localStorage 中
      console.log("token写入Store与localStorage中：" + data);
    },
    // 保存用户ID
    saveUid(state, data) {
      state.uid = data;
      window.localStorage.setItem("uid", data);
      console.log("uid写入Store与localStorage中：" + data);
    },
    // 通知权限
    saveTZauthority(state, data) {
      state.tzAuthority = data;
      window.localStorage.setItem("tzAuthority", data);
      console.log("tzAuthority写入Store与localStorage中：" + data);
    },
    // 公文权限
    saveGWauthority(state, data) {
      state.gwAuthority = data;
      window.localStorage.setItem("gwAuthority", data);
      console.log("gwAuthority写入Store与localStorage中：" + data);
    },
    // 请假权限
    saveQJauthority(state, data) {
      state.qjAuthority = data;
      window.localStorage.setItem("qjAuthority", data);
      console.log("qjAuthority写入Store与localStorage中：" + data);
    },
    // 保存用户名称
    saveUserName(state, data) {
      state.userName = data;
      window.localStorage.setItem("userName", data);
      console.log("qjAuthority写入Store与localStorage中：" + data);
    },
    saveRole(state, data) {
      state.userRole = data;
      window.localStorage.setItem("userRole", data);
      console.log("userRole写入Store与localStorage中：" + data);
    },
    saveLogin(state, data) {
      state.haveLogin = data;
      window.localStorage.setItem("haveLogin", data);
      console.log("userRole写入Store与localStorage中：" + data);
    }
  },
  actions: {

  }
})

export default store;
