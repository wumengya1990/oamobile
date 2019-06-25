<template>
    
    <div class="listPage">
        <h3 style="text-align:center; background:#FFF; border-bottom:1px solid #eaeaea; height:40px; line-height:40px; font-weight:normal;">我的申请</h3>
                <!-- <van-search
                    v-model="value"
                    placeholder="请输入搜索关键词"
                    show-action
                    shape="round"
                    @search="onSearch"
                    >
                <van-button slot="action" type="info" round size="small" @click="onSearch">搜索</van-button>
                </van-search> -->
                 <div class="List">
                    <dl class="noMessage" v-if="myLeaveList.length == 0">
                        <dt>OA</dt>
                        <dd><span>办公管理系统</span></dd>
                        <dd><p>暂无数据内容请刷新重试</p></dd>
                    </dl>
                    <div class="listBox">
                        <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
                        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="shuaxin" :offset="100">
                        <ul>
                            <li v-for="(n,index) in myLeaveList" :key="index" @click="enterDetailed(n.autoID)">
                                <van-swipe-cell :right-width="50">
                                <h3>
                                    外出事由：{{n.reason}}
                                    <span style="float:right;">审批状态：
                                        <em v-if="n.auditStatus==0" style="color:#ecc140;">审批中</em>
                                        <em v-if="n.auditStatus==1" style="color:#4fbf17;">同意</em>
                                        <em v-if="n.auditStatus==2" style="color:#F30;">不同意</em>
                                    </span>
                                </h3>
                                <p>
                                    <span>请假人：{{$store.state.userName}}</span>
                                    <time>{{n.createAt|newCreateAt}}</time></p>
                                <span class="drop" slot="right"><van-icon name="delete"></van-icon></span>
                                </van-swipe-cell>
                            </li>
                        </ul>
                        </van-list>
                        </van-pull-refresh>
                    </div>
                </div>
            
        <div class="xuanfu">
            <span @click="addnew"><van-icon name="add-o" /></span>
            <span @click="backTop" v-show="backTopShow"><van-icon name="arrow-up" /></span>
            <span @click="$router.push({path:'/menuAll'})"><van-icon name="apps-o" /></span>
        </div>
        
    </div>
</template>

<script>
import top from './top'
import mixni from './../../mixins/mixin'
export default {
    name:'myApplyFor',
    components:{
      'qjTop':top  
    },
    mixins:[mixni],
    data() {
        return {
            value:'',
            pageIndex:1,
            pageSize:10,
            loading:false,
            isLoading:false,
            isRefresh:false,
            finished:false,
            myLeaveList:[]
        }
    },
    mounted() {
        this.loadList(true)
    },
    filters:{
        newCreateAt:function(mes){
            if(mes){
                let nr = mes.toString();
                let result = nr.replace("T"," ");
                result = result.substring(0,19);
                return result;
            }else{
                return mes;
            }
        }
    },
    methods:{
        onSearch:function(){

        },
        addnew(){
            let me = this;
            me.$router.push({
                name:'applyFor'
            })
        },
        validationScreening(){
            this.loadList();
        },
        //下拉重新加载
        onRefresh(){
            let me = this;                   
            me.loading = false;
            me.loadList(true);
        },
         //上滑刷新
         shuaxin(){
             let me = this;
              me.loadList();
         },
        loadList(isInit){
            let me = this;
            if(me.isLoading == false){            //判断列表是否处于加载状态
                me.isLoading = true;
            }else{
                return false
            }
            if (isInit == true) {               //是否需要清空当前列表
                me.finished = false;
                me.pageIndex = 1;
                me.myLeaveList = [];
            }
            let url = '/api/Leave/applylist';
            let params={pageSize:me.pageSize,pageIndex:me.pageIndex}
            me.$api.get(url,params,res=>{
                // console.log(res);
                // me.myLeaveList = res.data;
                console.log(res);
                let resCount = res.data.length;
                if(isInit == true){
                     me.myLeaveList = res.data;
                }else{
                    me.myLeaveList = me.myLeaveList.concat(res.data);
                }
                me.pageIndex++;
                me.loading = false;
                me.isLoading =false;
                me.isRefresh = false;
                if (resCount < 10) {
                    me.finished = true;
                }
            })
        },
        enterDetailed:function(nq){
            let me = this;
            me.$router.push({
                name:'qjDetails',
                params:{
                    autoID:nq,
                    listType:2,
                    myApply:1,
                }
            })
        },
        backTop:function(){
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
            document.getElementsByClassName("listPage")[0].scrollTop=0;
        }
    }
}
</script>

<style lang="scss">
.van-popup {
    box-sizing: border-box;
    padding: 20px;
    &--right{
        width:100%;
        height:100%;
        .bts{ position:absolute; left: 0; top: auto; right: 0; bottom: 0; text-align:center; padding: 10px 0;}
    }
}
.nei{
    .van-tabs__line{ display: none;}
    .van-tab--active{
        span{ color: #609eff; font-weight: bold;}
    }
}
</style>
