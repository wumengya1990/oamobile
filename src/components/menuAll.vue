<template>
<div class="menuAll">
    <!-- <router-link v-if="$store.state.tzAuthority==1" to="/noticeList">
    <em><i class="icon iconfont icontongzhi1"></i></em>
    <span>通知列表</span>
    </router-link> -->
    <router-link to="/tzMain">
    <!-- <em><i class="icon iconfont icontongzhi1"></i></em> -->
    <font v-if="NumberS.noticeTotal>0">{{NumberS.noticeTotal|showNumN}}</font>
    <em><img :src="img1"></em>
    <span>系统内通知</span>
    </router-link>
    <router-link to="/gwMain">
    <!-- <em><i class="icon iconfont iconai-briefcase"></i></em> -->
    <font v-if="NumberS.officeTotal>0">{{NumberS.officeTotal|showNumN}}</font>
    <em><img :src="img2"></em>
    <span>公文流转</span>
    </router-link>
    <router-link v-if="$store.state.qjAuthority==1" to="/qjMain">
    <!-- <em><i class="icon iconfont iconZ"></i></em> -->
    <font v-if="NumberS.leaveTotal>0">{{NumberS.leaveTotal|showNumN}}</font>
    <em><img :src="img3"></em>
    <span>请假管理</span>
    </router-link>
    <router-link v-if="$store.state.qjAuthority==0" to="/qjMain/myApplyFor">
    <!-- <em><i class="icon iconfont iconZ"></i></em> -->
    <em><img :src="img3"></em>
    <span>我的请假申请</span>
    </router-link>
    <van-dropdown-menu>
    <van-dropdown-item v-model="value1" :options="option1" />
    <van-dropdown-item v-model="value2" :options="option2" />
    </van-dropdown-menu>


    
    </div>
</template>

<script>
export default {
    name:'menuAll',
    data() {
        return {
            img1:require('./../assets/images/notice@3x.png'),
            img2:require('./../assets/images/officialDounc@3x.png'),
            img3:require('./../assets/images/leave@3x.png'),
            NumberS:{
                leaveTotal:0,
                noticeTotal:0,
                officeTotal:0
            },
            value1: 0,
            value2: 'a',
            option1: [
                { text: '全部商品', value: 0 },
                { text: '新款商品', value: 1 },
                { text: '活动商品', value: 2 }
            ],
            option2: [
                { text: '默认排序', value: 'a' },
                { text: '好评排序', value: 'b' },
                { text: '销量排序', value: 'c' },
            ]
        }
    },
    beforeCreate() {
        this.$toast.loading({
            mask: true,
            forbidClick:false,
            duration:0,
            message:'加载中...'
        });
    },
    filters:{
        showNumN:function(mes){
            if(mes){
                //console.log(mes);
                if(mes>99){
                    let jieguo = "99";
                    return jieguo+"+";
                }
                return mes;
            }else{
                return mes;
            }
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
            if(that.$store.state.haveLogin){
                that.$toast.clear();
                this.getNum();
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
                        that.getNum();
                        that.$toast("登录成功");
                        // that.$router.push({
                        //     name:'menuAll'
                        // })
                    }else if(res.code==302){
                        that.$toast.clear();
                        that.$toast("未绑定，请重新登录自动绑定");
                        that.$router.push({
                            name:'login',
                            params:{
                                uid:res.uId
                            }
                        })
                    }else{
                        that.$toast.clear();
                        that.$toast("认证错误请重新登录");
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
            let params="";
            me.$api.get(url,params,res=>{
                if(res.code==200){
                    me.$store.commit("saveGWniban", res.data.default_Enlisted_Person);
                }
            })
        },
        getNum(){
            let me = this;
            let url='/api/user/msgtotal';
            let params="";
            me.$api.get(url,params,res=>{
                if(res.code==200){
                     //console.log(res);
                     me.NumberS.leaveTotal = res.leaveTotal;
                     me.NumberS.noticeTotal = res.noticeTotal;
                     me.NumberS.officeTotal = res.officeTotal;
                }else{
                    me.$toast("获取文档数量失败");
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
        flex: 1; width:25%; max-width: 25%; min-width: 25%; text-align:center; text-decoration: none; position: relative;
        font{ position:absolute; padding:0 5px; height:18px; line-height: 18px; font-size: 12px; text-align:center; left:60px; top:8px; border-radius: 50px; overflow: hidden; background:#F30; color:#FFF;}
        em{ 
            padding:5px 0; display: block;
            i{display: block; font-size:40px; color:#1f8bff;}
            img{ width: 50%; margin: 10px 0 5px;}
        }
        span{ font-size: 12px;}
    }
}
</style>
