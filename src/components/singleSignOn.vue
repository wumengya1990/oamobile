<template>
    <div class="singleSignOn">
        欢迎进入OA市局移动版
    </div>
</template>

<script>
export default {
    name:'singleSignOn',
    data() {
        return {
            
        }
    },
    mounted() {
        //alert(window.location.href);
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
                        that.$store.commit("saveToken", res.token);      //保存 token
                        that.$store.commit("saveLogin", true);           //保存登录状态
                        that.$store.commit("saveUid", res.data.autoID);
                        that.$store.commit("saveUserName", res.data.userName);
                        that.getAuthority();
                        that.getPeoSet();
                        that.$router.push({
                            name:'menuAll'
                        })
                    }else if(res.code==302){
                        that.$router.push({
                            name:'login',
                            params:{
                                uid:res.uId
                            }
                        })
                    }else{
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
    }
}
</script>

<style>

</style>
