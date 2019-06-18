<template>
    
    <div class="listPage">
        <qjTop></qjTop>
        
                <!-- <van-search
                    v-model="searchValue"
                    placeholder="请输入搜索关键词"
                    show-action
                    shape="round"
                    @search="onSearch"
                    >
                <van-button slot="action" type="info" round size="small" @click="onSearch">搜索</van-button>
                </van-search> -->
                 <div class="List">
                    <dl class="noMessage" v-if="qjUnHaveList.length == 0">
                        <dt>OA</dt>
                        <dd><span>办公管理系统</span></dd>
                        <dd><p>暂无数据内容请刷新重试</p></dd>
                    </dl>
                    <div class="listBox">
                        <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
                        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="shuaxin" :offset="100">
                        <ul>
                            <li v-for="(n,index) in qjUnHaveList" :key="index" @click="enterDetailed(n.autoID)">
                                <!-- <van-swipe-cell :right-width="50"> -->
                                <h3>请假人：{{n.leave_People}}</h3>
                                <p>
                                    <span>所属部门：{{n.dep}}</span>
                                    <time>{{n.createAt|newCreateAt}}</time></p>
                                <!-- <span class="drop" slot="right"><van-icon name="delete"></van-icon></span> -->
                                <!-- </van-swipe-cell> -->
                            </li>
                        </ul>
                        </van-list>
                        </van-pull-refresh>
                    </div>
                </div>
            
        <div class="xuanfu">
            <!-- <span @click="addnew"><van-icon name="add-o" /></span> -->
            <span @click="backTop" v-show="backTopShow"><van-icon name="arrow-up" /></span>
            <span @click="$router.push({path:'/menuAll'})"><van-icon name="apps-o" /></span>
        </div>
        
    </div>
</template>

<script>
import top from './top'
import mixni from './../../mixins/mixin'
export default {
    name:'listPage',
    components:{
      'qjTop':top  
    },
    mixins:[mixni],
    data() {
        return {
            searchValue:'',
            pageIndex:1,
            pageSize:10,
            loading:false,
            isLoading:false,
            isRefresh:false,
            finished:false,
            qjUnHaveList:[
                { 
                    title:'FFF通知标题通知标题通知标题通知标题通知标题通知标题通知标题',
                    sentPeo:'张洋',
                    noticeType:1,
                    noticeTypeName:"普通消息",
                    time:'2019-01-22',
                    hasN:true
                }
            ]
        }
    },
    mounted() {
        this.loadList(true);
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
                me.qjUnHaveList = [];
            }
            let url = '/api/Leave/todolist';
            let params={pageSize:me.pageSize,pageIndex:me.pageIndex}
            me.$api.get(url,params,res=>{
                console.log(res);
                let resCount = res.data.length;
                if(isInit == true){
                     me.qjUnHaveList = res.data;
                }else{
                    me.qjUnHaveList = me.qjUnHaveList.concat(res.data);
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
                    listType:0
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
        width:70%;
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
