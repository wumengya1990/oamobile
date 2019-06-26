<template>
    <div class="enterDetailed">
        <div class="tishi">处理中</div>
    </div>
</template>

<script>
export default {
    name:'enterDetailed',
    data() {
        return {
            
        }
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
          
            // let mySource = that.getQueryString("source");
            let mySource = that.getQueryString("datasoure");
            let myuId = that.getQueryString("uId");
            let mytoken = that.getQueryString("token");
            let wzID = that.getQueryString("autoid");
            let wzType = that.getQueryString("menu");
            let wzListType = that.getQueryString("type");
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
            if (wzID) {
                dataList.wID = wzID;
            }
            if (wzType) {
                dataList.wType = wzType;
            }
            if (wzListType) {
                dataList.wListtype = wzListType;
            }


            // if(dataList!=null){
            // console.log(wzType);
            // that.$store.commit("saveToken", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiankiLCJhdXRvaWQiOiI4MTgiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL2V4cGlyYXRpb24iOiIyMDE5LzYvMjYg5pif5pyf5LiJIDc6NTc6MzYiLCJuYmYiOjE1NjE1Mjg2NTYsImV4cCI6MTU2MTUzNTg1NiwiaWF0IjoxNTYxNTI4NjU2LCJpc3MiOiJqd3RodWFuZXQiLCJhdWQiOiJqd3RodWFuZXQifQ._31OFiDQJt5ukn4i0tgHsa23a8pjOEoHEBTkKCir8tE");      //保存 token
            // that.$store.commit("saveLogin", true);           //保存登录状态
            // that.$store.commit("saveUid", 818);
            // that.$store.commit("saveUserName", "局机要室");
            // let shuzi = parseInt(wzType)
            // switch (shuzi) {
            //     case 15:
            //         debugger;
            //         console.log(wzID);
            //         that.$router.push({
            //             name:'tzdetailed',
            //             params:{
            //                 tzid:wzID,
            //                 listType:wzListType,
            //                 mesType:1
            //             }
            //         })
            //         break;
            //     case 16:
            //         that.$router.push({
            //             name:'gwdetailed',
            //             params:{
            //                 id:wzID,
            //                 type:wzListType,
            //                 zt:1
            //             }
            //         })
            //         break;
            //     case 9:
            //         console.log(wzID);
            //         that.$router.push({
            //             name:'qjDetails',
            //             params:{
            //                 autoID:wzID,
            //                 listType:wzListType
            //             } 
            //         })
            //         break;
            //     default:
            //         that.$router.push({
            //             name:'menuAll'
            //         })
            // }
            // }else{
            //     that.$router.push({
            //         name:'login'
            //     })
            // }
            
            if(dataList!=null){
                let url = '/api/user/sso';
                 this.$toast.loading({
                    mask: true,
                    forbidClick:false,
                    duration:0,
                    message:'加载中...'
                });
                that.$api.get(url,dataList,res=>{
                    if(res.code == 200){
                        that.$toast.clear();
                        that.$store.commit("saveToken", res.token);      //保存 token
                        that.$store.commit("saveLogin", true);           //保存登录状态
                        that.$store.commit("saveUid", res.data.autoID);
                        that.$store.commit("saveUserName", res.data.userName);
                        that.getAuthority();
                        that.getPeoSet();
                        // that.$toast("登录成功");
                        console.log(wzType);
                        let shuzi = parseInt(wzType)
                        switch (shuzi) {
                            case 15:
                                that.$router.push({
                                    name:'tzdetailed',
                                    params:{
                                        tzid:wzID,
                                        listType:0,
                                        mesType:1
                                    }
                                })
                                break;
                            case 16:
                                that.$router.push({
                                    name:'gwdetailed',
                                    params:{
                                        id:wzID,
                                        type:wzListType,
                                        zt:1
                                    }
                                })
                                break;
                            case 9:
                                that.$router.push({
                                    name:'qjDetails',
                                    params:{
                                        autoID:wzID,
                                        listType:wzListType
                                    } 
                                })
                                break;
                            default:
                                that.$router.push({
                                    name:'menuAll'
                                })
                        }
                        
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
    }
}
</script>

<style>
.enterDetailed{ position: absolute; left: 0; top: 0; right: 0; bottom: 0; margin: auto;}
.tishi{ position: absolute; width: 120px; height: 120px; line-height: 120px; box-shadow: 0 1px 2px #c5c5c5; background: #f3f3f3; color: #888; left: 0; top: 0; right: 0; bottom: 0; margin: auto; text-align: center;}
</style>
