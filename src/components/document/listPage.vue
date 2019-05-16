<template>
    <div class="listPage">
        <van-tabs v-model="active" animated>
            <van-tab title="收件箱">
                <van-tabs v-model="active1" class="nei" animated>
                    <van-tab title="待办">
                        <div class="List">
                            <dl class="noMessage" v-if="noticeMessList.length == 0">
                                <dt>OA</dt>
                                <dd><span>办公管理系统</span></dd>
                                <dd><p>暂无数据内容请刷新重试</p></dd>
                            </dl>
                            <div class="listBox">
                                <ul>
                                    <li v-for="(n,index) in noticeMessList" :key="index" @click="enterDetailed(n.title)">
                                        <van-swipe-cell :right-width="50">
                                        <h3>{{index++}}、{{n.title}}</h3>
                                        <p>
                                            <span>发送人：{{n.sentPeo}}</span>
                                            <span>{{n.noticeTypeName}}</span>
                                            <time>{{n.time}}</time></p>
                                        <span class="drop" slot="right"><van-icon name="delete"></van-icon></span>
                                        </van-swipe-cell>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </van-tab>
                    <van-tab title="已办">
                        <div class="List">
                            <dl class="noMessage" v-if="noticeMessList.length == 0">
                                <dt>OA</dt>
                                <dd><span>办公管理系统</span></dd>
                                <dd><p>暂无数据内容请刷新重试</p></dd>
                            </dl>
                            <div class="listBox">
                                <ul>
                                    <li v-for="(n,index) in noticeMessList" :key="index" @click="enterDetailed(n.title)">
                                        <van-swipe-cell :right-width="50">
                                        <h3>{{index+=2}}、{{n.title}}</h3>
                                        <p>
                                            <span>发送人：{{n.sentPeo}}</span>
                                            <span>{{n.noticeTypeName}}</span>
                                            <time>{{n.time}}</time></p>
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
                                <li v-for="(n,index) in noticeMessList" :key="index" @click="enterDetailed(n.title)">
                                    <van-swipe-cell :right-width="50">
                                    <h3>{{n.title}}</h3>
                                    <p>
                                        <span>发送人：{{n.sentPeo}}</span>
                                        <span>{{n.noticeTypeName}}</span>
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
            <span @click="addnew"><van-icon name="add-o" /></span>
            <span @click="backTop"><van-icon name="arrow-up" /></span>
        </div>
        
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
            noticeMessList:[
                { 
                    title:'通知标题通知标题通知标题通知标题通知标题通知标题通知标题',
                    sentPeo:'张洋',
                    noticeType:1,
                    noticeTypeName:"普通消息",
                    time:'2019-01-22'
                },{ 
                    title:'通知标题通知标题通知标题通知标题通知标题通知标题通知标题',
                    sentPeo:'张洋',
                    noticeType:1,
                    noticeTypeName:"普通消息",
                    time:'2019-01-22'
                },{ 
                    title:'通知标题通知标题通知标题通知标题通知标题通知标题通知标题',
                    sentPeo:'张洋',
                    noticeType:2,
                    noticeTypeName:"会议通知",
                    time:'2019-01-22'
                },{ 
                    title:'通知标题通知标题通知标题通知标题通知标题通知标题通知标题',
                    sentPeo:'张洋',
                    noticeType:1,
                    noticeTypeName:"普通消息",
                    time:'2019-01-22'
                },{ 
                    title:'通知标题通知标题通知标题通知标题通知标题通知标题通知标题',
                    sentPeo:'张洋',
                    time:'2019-01-22'
                },{ 
                    title:'通知标题通知标题通知标题通知标题通知标题通知标题通知标题',
                    sentPeo:'张洋',
                    noticeType:1,
                    noticeTypeName:"普通消息",
                    time:'2019-01-22'
                },{ 
                    title:'通知标题通知标题通知标题通知标题通知标题通知标题通知标题',
                    sentPeo:'张洋',
                    noticeType:1,
                    noticeTypeName:"普通消息",
                    time:'2019-01-22'
                },{ 
                    title:'通知标题通知标题通知标题通知标题通知标题通知标题通知标题',
                    sentPeo:'张洋',
                    noticeType:1,
                    noticeTypeName:"普通消息",
                    time:'2019-01-22'
                },{ 
                    title:'通知标题通知标题通知标题通知标题通知标题通知标题通知标题',
                    sentPeo:'张洋',
                    noticeType:1,
                    noticeTypeName:"普通消息",
                    time:'2019-01-22'
                }
            ]
        }
    },
    methods:{
        onSearch:function(){

        },
        addnew(){
            let me = this;
            me.$router.push({
                name:'gwaddnew'
            })
        },
        validationScreening(){
            this.loadList();
        },
        loadList(){
            let me = this;
            if(me.mrradio!=""||me.mrradio!=null||me.mrradio!=undefined){
                
            }
        },
        enterDetailed:function(nq){
            let me = this;
            me.$router.push({
                name:'gwdetailed',
                params:{
                    id:"321"
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
