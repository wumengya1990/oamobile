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
            debugger;
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
                    alert(JSON.stringify(res));
                    if(res.code == 200){
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
        }
    }
}
</script>

<style>

</style>
