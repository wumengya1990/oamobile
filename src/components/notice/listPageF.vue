<template>
    <div class="listPage">
        <tzTop></tzTop>

        <div class="List">
            <dl class="noMessage" v-if="outboxList.length == 0">
                <dt>OA</dt>
                <dd><span>办公管理系统</span></dd>
                <dd><p>暂无数据内容请刷新重试</p></dd>
            </dl>
            <div class="listBox">
                <!--
                        <van-search
                    v-model="value"
                    placeholder="请输入搜索关键词"
                    show-action
                    shape="round"
                    @search="onSearch"
                    >
                <van-button slot="action" type="info" round size="small" @click="onSearch">搜索</van-button>
                </van-search> -->
                <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
                    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="shuaxin" :offset="100">
                <ul>
                    <li v-for="(n,index) in outboxList" :key="index" @click="enterDetailed(n.autoID,1,n.notice_Type)">
                        <!-- <van-swipe-cell :right-width="50"> -->
                        <h3>
                            <span v-if="n.typebf=='重要'" style="color:#f3a30e;"><i class="icon iconfont iconjingshigantanhao2"></i></span>
                            <span v-if="n.typebf=='保密'" style="color:#6daf18;"><i class="icon iconfont iconmima"></i></span>
                            <span v-if="n.typebf=='紧急'" style="color:#F30;"><i class="icon iconfont iconyingjiguangbo"></i></span>
                            {{n.title}}
                            </h3>
                        <p>
                            <span>发送人：{{n.senduserName}}</span>
                            <span>{{n.notice_Type}}</span>
                            <time>{{n.beginDate}}</time>
                        </p>
                        <!-- <span class="drop" slot="right"><van-icon name="delete"></van-icon></span> -->
                        <!-- </van-swipe-cell> -->
                    </li>
                </ul>
                    </van-list>
                </van-pull-refresh>
            </div>
        </div>
                 
           
        <div class="xuanfu">
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
        'tzTop':top
    },
    mixins:[mixni],
    data() {
        return {
            btState:0,              //已读未读状态
            zhuangtai:[
                {name:'已读',state:0},
                {name:'未读',state:1}
            ],
            pageIndex:1,
            pageSize:10,
            loading:false,
            isLoading:false,
            isRefresh:false,
            finished:false,
            outboxList:[]
        }
    },
    
    mounted() {
        this.loadOutboxList(true);
    },
    methods:{
        onSearch:function(){

        },
         //下拉重新加载
        onRefresh(){
            let me = this;                   
            me.loading = false;
            me.loadOutboxList(true);
        },
         //上滑刷新
         shuaxin(){
             let me = this;
              me.loadOutboxList();
         },
        // 获取发件箱内容
        loadOutboxList(isInit){
            let me = this;
            if(me.isLoading == false){            //判断列表是否处于加载状态
                me.isLoading = true;
            }else{
                return false
            }
            if (isInit == true) {               //是否需要清空当前列表
                me.finished = false;
                me.pageIndex = 1;
                me.outboxList = [];
            }
            let url = '/api/Notic/outbox';
            let params = { pageSize:me.pageSize, pageIndex:me.pageIndex, State:me.readState};
            me.$api.get(url, params,res=>{
                console.log("发件箱");
                console.log(res);
                let resCount = res.data.length;
                if(isInit == true){
                     me.outboxList = res.data;
                      me.setTime();
                }else{
                    me.outboxList = me.outboxList.concat(res.data);
                     me.setTime();
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
        setTime(){
            let me = this;
            for(let i=0, len=me.outboxList.length;i<len;i++){
                let timen = me.outboxList[i].beginDate;
                me.outboxList[i].beginDate  = timen.replace(/T/g," ");
            }
        },
        
        // 进入详情详情页面传参
        enterDetailed:function(tzid,liebiaoType,xinxiType){
            let me = this;
            me.$router.push({
                name:'tzdetailed',
                params:{
                    tzid:tzid,
                    listType:liebiaoType,
                    mesType:xinxiType
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
