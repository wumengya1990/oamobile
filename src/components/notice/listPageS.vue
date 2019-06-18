<template>
    <div class="listPage">
        <tzTop></tzTop>
        <div class="topBts">
            <a v-for="b in zhuangtai" :class="{on:btState==b.state}" @click="changeState(b.state)" :key="b.state">{{b.name}}</a>
        </div>     
        <div class="List">
            <!-- 没有内容提示 -->
            <dl class="noMessage" v-if="noticeMessList.length == 0">
                <dt>OA</dt>
                <dd><span>办公管理系统</span></dd>
                <dd><p>暂无数据内容请刷新重试</p></dd>
            </dl>
            <!-- 没有内容提示 -->
            <div class="listBox">
                <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
                <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="shuaxin" :offset="100">
                <ul>
                    <li v-for="(n,index) in noticeMessList" :key="index" @click="enterDetailed(n.autoID,0,n.notice_Type)">
                        <!-- <van-swipe-cell :right-width="50"> -->
                        <h3>
                            <span v-if="n.typebf=='重要'" style="color:#f3a30e;"><i class="icon iconfont iconjingshigantanhao2"></i></span>
                            <span v-if="n.typebf=='保密'" style="color:#6daf18;"><i class="icon iconfont iconmima"></i></span>
                            <span v-if="n.typebf=='紧急'" style="color:#F30;"><i class="icon iconfont iconyingjiguangbo"></i></span>
                            <!-- <span class="" :style="{color:n.typebf=='紧急'? '#F30' : '#333'}">[{{n.typebf}}]</span> -->
                            {{n.title}}</h3>
                        <p>
                            <span>发送人：{{n.senduserName}}</span>
                            <span v-if="n.notice_Type==0">普通通知</span>
                            <span style="color:#F30;" v-else>会议通知</span>
                            <time>{{ n.beginDate | newBeginDate}}</time></p>
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
                {name:'未读',state:0},
                {name:'已读',state:1}
            ],
            pageIndex:1,
            pageSize:10,
            loading:false,
            isLoading:false,
            isRefresh:false,
            finished:false,
            noticeMessList:[
                { 
                    title:'通知标题通知标题通知标题通知标题通知标题通知标题通知标题',
                    sentPeo:'张洋',
                    noticeType:1,
                    noticeTypeName:"普通消息",
                    time:'2019-01-22'
                }
            ]
        }
    },
    
    mounted() {
        this.loadReadList(true);
        //监听滚动条事件
        // let zhumain = document.getElementsByClassName("listPage")[0];
        // zhumain.addEventListener('scroll', this.handleScroll);
    },
    filters:{
        newBeginDate:function(mes){
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
        // 向下滑动显示隐藏返回顶部按钮
        // handleScroll(){
        //     let z = document.getElementsByClassName("listPage")[0];
        //     var t = z.scrollTop;
        //     if(t>200){
        //         this.backTopShow = true;
        //     }else{
        //         this.backTopShow = false;
        //     }
        // },
        // 已读未读修改
        changeState(zhuangtai){
            this.btState = zhuangtai;
            this.loadReadList(true);
        },
         //下拉重新加载
        onRefresh(){
            let me = this;                   
            me.loading = false;
            me.loadReadList(true);
            
        },
         //上滑刷新
         shuaxin(){
            let me = this;
            me.loadReadList();
         },        
        // 获取收件箱内容
        loadReadList(isInit){
            let me = this;
            if(me.isLoading == false){            //判断列表是否处于加载状态
                me.isLoading = true;
            }else{
                return false
            }
            if (isInit == true) {               //是否需要清空当前列表
                me.finished = false;
                me.pageIndex = 1;
                me.noticeMessList = [];
            }
            let url = '/api/Notic/inbox';
            let params = { pageSize:me.pageSize, pageIndex:me.pageIndex, State:me.btState};
            me.$api.get(url, params,res=>{
                console.log("收件箱");
                console.log(res);
                let resCount = res.data.length;
                if(isInit == true){
                     me.noticeMessList = res.data;
                }else{
                    me.noticeMessList = me.noticeMessList.concat(res.data);
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
