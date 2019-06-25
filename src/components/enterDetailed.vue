<template>
    <div class="enterDetailed">
        处理中
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
        alert(123);
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


            if(dataList!=null){
            console.log(wzType);
            that.$store.commit("saveToken", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZ2J0IiwiYXV0b2lkIjoiODEyIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9leHBpcmF0aW9uIjoiMjAxOS82LzI1IOaYn-acn-S6jCAxMDozNTo1OCIsIm5iZiI6MTU2MTQ1MTc1OCwiZXhwIjoxNTYxNDU4OTU4LCJpYXQiOjE1NjE0NTE3NTgsImlzcyI6Imp3dGh1YW5ldCIsImF1ZCI6Imp3dGh1YW5ldCJ9.jMvFJkwSkLz-e7wpLiZwyfI31q5-9ZXDw0iZg5PllkY");      //保存 token
            that.$store.commit("saveLogin", true);           //保存登录状态
            that.$store.commit("saveUid", 39883);
            that.$store.commit("saveUserName", "局机要室");
            let shuzi = parseInt(wzType)
            switch (shuzi) {
                case 15:
                    debugger;
                    console.log(wzID);
                    that.$router.push({
                        name:'tzdetailed',
                        params:{
                            tzid:wzID,
                            listType:wzListType,
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
                    console.log(wzID);
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
            }else{
                that.$router.push({
                    name:'login'
                })
            }
            
            // if(dataList!=null){
            //     let url = '/api/user/sso';
            //      this.$toast.loading({
            //         mask: true,
            //         forbidClick:false,
            //         duration:0,
            //         message:'加载中...'
            //     });
            //     that.$api.get(url,dataList,res=>{
            //         if(res.code == 200){
            //             that.$toast.clear();
            //             that.$store.commit("saveToken", res.token);      //保存 token
            //             that.$store.commit("saveLogin", true);           //保存登录状态
            //             that.$store.commit("saveUid", res.data.autoID);
            //             that.$store.commit("saveUserName", res.data.userName);
            //             that.getAuthority();
            //             that.getPeoSet();
            //             that.$toast("登录成功");
            //             console.log(wzType);
            //             let shuzi = parseInt(wzType)
            //             switch (shuzi) {
            //                 case 15:
            //                     that.$router.push({
            //                         name:'tzdetailed',
            //                         params:{
            //                             tzid:wzID,
            //                             listType:wzListType,
            //                             mesType:1
            //                         }
            //                     })
            //                     break;
            //                 case 16:
            //                     that.$router.push({
            //                         name:'gwdetailed',
            //                         params:{
            //                             id:wzID,
            //                             type:wzListType,
            //                             zt:1
            //                         }
            //                     })
            //                     break;
            //                 case 9:
            //                     that.$router.push({
            //                         name:'qjDetails',
            //                         params:{
            //                             autoID:wzID,
            //                             listType:wzListType
            //                         } 
            //                     })
            //                     break;
            //                 default:
            //                     that.$router.push({
            //                         name:'menuAll'
            //                     })
            //             }
                        
            //         }else if(res.code==302){
            //             that.$toast.clear();
            //             that.$router.push({
            //                 name:'login',
            //                 params:{
            //                     uid:res.uId
            //                 }
            //             })
            //         }else{
            //             that.$toast.clear();
            //             that.$toast("认证错误请从新登录");
            //             that.$router.push({
            //                 name:'login'
            //             })
            //         }
            //     })
            // }else{
            //     that.$router.push({
            //         name:'login'
            //     })
            // }
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
