<template>
    <div class="listPage">
        <van-tabs v-model="active" animated>
            <van-tab title="收件箱">
                <van-tabs v-model="active1" class="nei" animated>
                    <van-tab title="未读">
                        <div class="List">
                            <dl class="noMessage" v-if="noticeMessList.length == 0">
                                <dt>OA</dt>
                                <dd><span>办公管理系统</span></dd>
                                <dd><p>暂无数据内容请刷新重试</p></dd>
                            </dl>
                            <div class="listBox">
                                <van-list
                                    v-model="loading"
                                    :finished="finished"
                                    finished-text="没有更多了"
                                ></van-list>
                                <ul>
                                    <li v-for="(n,index) in noticeMessList" :key="index" @click="enterDetailed(n.autoID)">
                                        <van-swipe-cell :right-width="50">
                                        <h3>{{++index}}、{{n.title}}</h3>
                                        <p>
                                            <span>发送人：{{n.senduserName}}</span>
                                            <span>{{n.notice_Type}}</span>
                                            <time>{{n.beginDate.replace(/T/g,' ')}}</time></p>
                                        <span class="drop" slot="right"><van-icon name="delete"></van-icon></span>
                                        </van-swipe-cell>
                                    </li>
                                </ul>
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
                                <ul>
                                    <li v-for="(n,index) in noticeMessList" :key="index" @click="enterDetailed(n.autoID)">
                                        <van-swipe-cell :right-width="50">
                                        <h3>{{index+=2}}、{{n.title}}</h3>
                                        <p>
                                            <span>发送人：{{n.sentPeo}}</span>
                                            <span>{{n.notice_Type}}</span>
                                            <time>{{n.beginDate.replace(/T/g,' ')}}</time></p>
                                        <span class="drop" slot="right"><van-icon name="delete"></van-icon></span>
                                        </van-swipe-cell>
                                    </li>
                                </ul>
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
                            <van-search
                                v-model="value"
                                placeholder="请输入搜索关键词"
                                show-action
                                shape="round"
                                @search="onSearch"
                                >
                            <van-button slot="action" type="info" round size="small" @click="onSearch">搜索</van-button>
                            </van-search>
                            <ul>
                                <li v-for="(n,index) in noticeMessList" :key="index" @click="enterDetailed(n.autoID)">
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
                        </div>
                 </div>
                 
            </van-tab>
        </van-tabs>
        <div class="xuanfu">
            <!-- <span @click="screen"><van-icon name="filter-o" /></span> -->
            <span @click="backTop"><van-icon name="arrow-up" /></span>
        </div>
        <!-- <van-popup v-model="layerShow" position="right">
            <van-radio-group v-model="mrradio">
                <van-cell-group>
                    <van-cell title="已读" clickable @click="mrradio = '1'">
                    <van-radio name="1" />
                    </van-cell>
                    <van-cell title="未读" clickable @click="mrradio = '2'">
                    <van-radio name="2" />
                    </van-cell>
                </van-cell-group>
            </van-radio-group>
            <div class="bts">
            <van-button @click="layerShow=false" hairline size="small" style="width:120px;">取消</van-button>
            <van-button @click="validationScreening" hairline size="small" style="width:120px;">确定</van-button>
            </div>
        </van-popup> -->
    </div>
</template>

<script>
export default {
    name:'listPage',
    data() {
        return {
            active:0,
            active1:0,
            value:'',
            layerShow:false,
            mrradio:'',
            loading: false,
            finished: false,
            pageIndex:1,
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
        this.loadList(true);
    },
    methods:{
        onSearch:function(){

        },
        screen(){
            this.layerShow = true;
        },
        validationScreening(){
            this.loadList();
        },
        loadList(isInit){
            let me = this;
            if(me.loading == false){
                me.loading = true;
            }else{
                return false
            }
            if (isInit == true) {
                me.finished = false;
                me.pageIndex = 1;
                me.noticeMessList = [];
            }

            let url = '/api/Notic/inbox';
            let params = { pageSize:10, pageIndex:me.pageIndex, State:0};
            me.$api.get(url, params,res=>{
                console.log(res);
                let resCount = res.length;
                if(isInit == true){
                     me.noticeMessList = res.data;
                }else{
                    me.noticeMessList = me.noticeMessList.concat(res.data)
                }
                me.loading = false;
                me.pageIndex++;
                if (resCount < 10) {
                    me.finished = true;
                }
            })
            
            
            
        },
        enterDetailed:function(tzid){
            let me = this;
            me.$router.push({
                name:'detailed',
                params:{
                    tzid:tzid
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
        xx(v){

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
