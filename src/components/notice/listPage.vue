<template>
    <div class="listPage">
        <van-tabs v-model="shoufaBox" @click="shoufaClick" animated>
            <van-tab title="收件箱">
                <van-tabs v-model="readState" @click="readStateClick" class="nei" animated>
                    <van-tab title="未读">
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
                                    <li v-for="(n,index) in noticeMessList" :key="index" @click="enterDetailed(n.autoID,shoufaBox,n.notice_Type)">
                                        <van-swipe-cell :right-width="50">
                                        <h3><span class="" :style="{color:n.typebf=='紧急'? '#F30' : '#333'}">[{{n.typebf}}]</span>{{n.title}}</h3>
                                        <p>
                                            <span>发送人：{{n.senduserName}}</span>
                                            <span v-if="n.notice_Type==0">普通通知</span>
                                            <span style="color:#F30;" v-else>会议通知</span>
                                            <time>{{ n.beginDate}}</time></p>
                                        <span class="drop" slot="right"><van-icon name="delete"></van-icon></span>
                                        </van-swipe-cell>
                                    </li>
                                </ul>
                                </van-list>
                                </van-pull-refresh>
                            </div>
                        </div>
                    </van-tab>
                    <van-tab title="已读">
                        <div class="List">
                            <dl class="noMessage" v-if="noticeMessList.length == 0">
                                <dt>OA</dt>
                                <dd><span>办公管理系统</span></dd>
                                <dd><p>暂无数据内容请刷新重试</p></dd>
                            </dl>
                            <div class="listBox">
                                <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
                                <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="shuaxin" :offset="100">
                                <ul>
                                    <li v-for="(n,index) in noticeMessList" :key="index" @click="enterDetailed(n.autoID,shoufaBox,n.notice_Type)">
                                        <van-swipe-cell :right-width="50">
                                        <h3>{{index+=2}}、{{n.title}}</h3>
                                        <p>
                                            <span>发送人：{{n.sentPeo}}</span>
                                            <span>{{n.notice_Type}}</span>
                                            <time>{{n.beginDate}}</time></p>
                                        <span class="drop" slot="right"><van-icon name="delete"></van-icon></span>
                                        </van-swipe-cell>
                                    </li>
                                </ul>
                                </van-list>
                                </van-pull-refresh>
                            </div>
                        </div>
                    </van-tab>
                </van-tabs>
                  

            
            </van-tab>
            <van-tab title="发件箱">
                 <div class="List">
                     <dl class="noMessage" v-if="noticeMessList.length == 0">
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
                                <li v-for="(n,index) in outboxList" :key="index" @click="enterDetailed(n.autoID,shoufaBox,n.notice_Type)">
                                    <van-swipe-cell :right-width="50">
                                    <h3>{{n.title}}</h3>
                                    <p>
                                        <span>发送人：{{n.sentPeo}}</span>
                                        <span>{{n.notice_Type}}</span>
                                        <time>{{n.time}}</time>
                                    </p>
                                    <span class="drop" slot="right"><van-icon name="delete"></van-icon></span>
                                    </van-swipe-cell>
                                </li>
                            </ul>
                                </van-list>
                            </van-pull-refresh>
                        </div>
                 </div>
                 
            </van-tab>
        </van-tabs>
        <div class="xuanfu">
            <span @click="backTop"><van-icon name="arrow-up" /></span>
        </div>
        
    </div>
</template>

<script>
export default {
    name:'listPage',
    data() {
        return {
            shoufaBox:0,            //收件箱发件箱切换
            readState:0,            //收件箱已读未读切换
            pageIndex:1,            //默认分页页数
            pageSize:10,            //默认分页条数
            value:'',               
            layerShow:false,
            mrradio:'',
            loading: false,
            finished: false,
            isLoading:false,
            isRefresh: false, //正在刷新数据
            noticeMessList:[
                { 
                    title:'通知标题通知标题通知标题通知标题通知标题通知标题通知标题',
                    sentPeo:'张洋',
                    noticeType:1,
                    noticeTypeName:"普通消息",
                    time:'2019-01-22'
                }
            ],
            outboxList:[]
        }
    },
    
    mounted() {
        this.loadReadList(true);
    },
    methods:{
        shoufaClick(index,title){
            let me =  this;
            if(index==0){
                me.loadReadList(true);
            }else{
                me.loadOutboxList(true);
            }
        },
        readStateClick(index,title){
            this.loadReadList(true);
        },
        onSearch:function(){

        },
        screen(){
            this.layerShow = true;
        },
        validationScreening(){
            this.loadReadList();
        },
         //下拉重新加载
        onRefresh(){
            let me = this;                   
            me.loading = false;
            if(me.shoufaBox==0){
                me.loadReadList(true);
            }else{
                me.loadOutboxList(true);
            }
        },
         //上滑刷新
         shuaxin(){
             let me = this;
             if(me.shoufaBox==0){
                me.loadReadList();
            }else{
                me.loadOutboxList();
            }
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
            let params = { pageSize:me.pageSize, pageIndex:me.pageIndex, State:me.readState};
            me.$api.get(url, params,res=>{
                console.log("收件箱");
                console.log(res);
                let resCount = res.data.length;
                if(isInit == true){
                     me.noticeMessList = res.data;
                     me.setTime();
                }else{
                    me.noticeMessList = me.noticeMessList.concat(res.data);
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
            for(let i=0, len=me.noticeMessList.length;i<len;i++){
                let timen = me.noticeMessList[i].beginDate;
                me.noticeMessList[i].beginDate  = timen.replace(/T/g," ");
            }
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
                let resCount = res.length;
                if(isInit == true){
                     me.outboxList = res.data;
                }else{
                    me.outboxList = me.outboxList.concat(res.data)
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
                name:'detailed',
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
    },
    filters:{
        shijianZ:function(value){
        // let qd = new RegExp('T');
        // let jieguo = value.replace(qd," ")
        return value;
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
