<template>
    <div class="listPage">
        <gwTop></gwTop>
        <div class="topBts">
            <a v-for="b in zhuangtai" :class="{on:btState==b.state}" @click="changeState(b.state)" :key="b.state">{{b.name}}</a>
        </div>
        <div class="List">
        <dl class="noMessage" v-if="documentList.length == 0">
            <dt>OA</dt>
            <dd><span>办公管理系统</span></dd>
            <dd><p>暂无数据内容请刷新重试</p></dd>
        </dl>
        <div class="listBox">
            <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="shuaxin" :offset="100">
            <ul>
                <li v-for="(n,index) in documentList" :key="index" @click="enterDetailed(n.autoID)">
                    <van-swipe-cell :right-width="50">
                    <h3>{{index++}}、{{n.title}}</h3>
                    <p>
                        <span>发送人：{{n.userName}}</span>
                        <time>{{n.beginDate}}</time></p>
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
            <span @click="backTop"><van-icon name="arrow-up" /></span>
            <span @click="$router.push({path:'/menuAll'})"><van-icon name="apps-o" /></span>
        </div>
        
    </div>
</template>

<script>
import top from './top'
export default {
    name:'listPage',
    components:{
        'gwTop':top
    },
    data() {
        return {
            btState:0,              //已处理未处理状态
            zhuangtai:[
                {name:'待办',state:0},
                {name:'已办',state:1}
            ],
            pageIndex:1,
            loading:false,
            isLoading:false,
            isRefresh:false,
            finished:false,
            documentList:[
                { 
                    title:'通知标题通知标题通知标题通知标题通知标题通知标题通知标题',
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
    methods:{
        
        addnew(){
            let me = this;
            me.$router.push({
                name:'gwaddnew'
            })
        },
        changeState(zhuangtai){
            this.btState=zhuangtai;
            this.loadList(true);
        },
        validationScreening(){
            this.loadList();
        },
        onRefresh(){
            let me = this;                   
            me.loading = false;
            me.loadList(true);
        },
        shuaxin(){
            this.loadList();
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
                me.documentList = [];
            }
            let url='/api/Office/inbox';
            let params = { pageSize:me.pageSize, pageIndex:me.pageIndex, State:me.btState};
            me.$api.get(url, params,res=>{
                console.log("收件箱");
                console.log(res);
                let resCount = res.data.length;
                if(isInit == true){
                     me.documentList = res.data;
                     me.setTime();
                }else{
                    me.documentList = me.documentList.concat(res.data);
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
            for(let i=0, len=me.documentList.length;i<len;i++){
                let timen = me.documentList[i].beginDate;
                me.documentList[i].beginDate  = timen.replace(/T/g," ");
            }
        },
        enterDetailed:function(nq){
            let me = this;
            me.$router.push({
                name:'gwdetailed',
                params:{
                    id:nq,
                    type:1
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
