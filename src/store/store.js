import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        token:'',
        uId:'',
        uRole:''
    },
    getters:{
        
    },
    mutations:{
        saveToken(state,platForm){
            state.token = platForm;
        },
        saveId(state,platForm){
            state.uId = platForm;
        },
        saveRole(state,platForm){
            state.uRole = platForm;
        }
    },
    actions:{
        getToken({commit},platForm){
            commit('saveToken',platForm)
        },
        getId({commit},platForm){
            commit('saveId',platForm)
        },
        getRole({commit},platForm){
            commit('saveRole',platForm)
        }
    }
})