<template>
<div class="menuAll">
    <!-- <router-link v-if="$store.state.tzAuthority==1" to="/noticeList">
    <em><i class="icon iconfont icontongzhi1"></i></em>
    <span>通知列表</span>
    </router-link> -->
    <router-link to="/tzMain">
    <em><i class="icon iconfont icontongzhi1"></i></em>
    <span>系统内通知</span>
    </router-link>
    <router-link to="/gwMain">
    <em><i class="icon iconfont iconai-briefcase"></i></em>
    <span>公文流转</span>
    </router-link>
    <router-link v-if="$store.state.qjAuthority==1" to="/qjMain">
    <em><i class="icon iconfont iconZ"></i></em>
    <span>请假管理</span>
    </router-link>
    <router-link v-if="$store.state.qjAuthority==0" to="/qjMain/myApplyFor">
    <em><i class="icon iconfont iconZ"></i></em>
    <span>我的请假申请</span>
    </router-link>

    
    </div>
</template>

<script>
export default {
    name:'menuAll',
    beforeCreate() {
        this.$toast.loading({
            mask: true,
            forbidClick:false,
            duration:0,
            message:'加载中...'
        });
    },
    mounted() {
        this.getLogin();
    },
    methods: {
        //是否请求用户登录
        getQueryString: function(name) {
            let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            let r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        },
        getLogin(){
            let that = this;
            if(that.$store.state.haveLogin){
                that.$toast.clear();
                return;
            }

            let mySource = that.getQueryString("source");
            let myuId = that.getQueryString("uId");
            let mytoken = that.getQueryString("token");
            let dataList = new Object();
            if (mySource) {
                dataList.source = mySource;
            }
            if (myuId) {
                dataList.uId = myuId;
            }
            if (mytoken) {
                dataList.token = mytoken;
            }
            if(dataList!=null){
                let url = '/api/user/sso';
                that.$api.get(url,dataList,res=>{
                    if(res.code == 200){
                        that.$toast.clear();
                        that.$store.commit("saveToken", res.token);      //保存 token
                        that.$store.commit("saveLogin", true);           //保存登录状态
                        that.$store.commit("saveUid", res.data.autoID);
                        that.$store.commit("saveUserName", res.data.userName);
                        that.getAuthority();
                        that.getPeoSet();
                        that.$toast("登录成功");
                        // that.$router.push({
                        //     name:'menuAll'
                        // })
                    }else if(res.code==302){
                        that.$toast.clear();
                        that.$router.push({
                            name:'login',
                            params:{
                                uid:res.uId
                            }
                        })
                    }else{
                        that.$toast.clear();
                        that.$toast("认证错误请从新登录");
                        that.$router.push({
                            name:'login'
                        })
                    }
                })
            }else{
                that.$router.push({
                    name:'login'
                })
            }
        },
        getAuthority(){
            let me = this;
            let url='/api/user/author';
            let params="";
            me.$api.get(url,params,res=>{
                // console.log(res);
                if(res.code==200){
                    me.$store.commit("saveTZauthority", res.data.bumf_Droit);      //保存 token
                    me.$store.commit("saveGWauthority", res.data.bumflz_Droit);           //保存登录状态
                    me.$store.commit("saveQJauthority", res.data.leave);
                }
            })
        },
        getPeoSet(){
            let me = this;
            let url='/api/user/config';
            let params=""
            me.$api.get(url,params,res=>{
                if(res.code==200){
                    me.$store.commit("saveGWniban", res.data.default_Enlisted_Person);
                }
            })
        }
    },
}
</script>

<style lang="scss">
.menuAll{
    display: flex; flex-wrap: wrap; width:100%;
    a{ 
        flex: 1; width:25%; max-width: 25%; min-width: 25%; text-align:center; text-decoration: none; 
        em{ 
            padding:5px 0; display: block;
            i{display: block; font-size:40px; color:#1f8bff;}
        }
        span{ font-size: 12px;}
    }
}
</style>
