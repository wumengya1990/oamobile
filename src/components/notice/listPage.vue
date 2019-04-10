<template>
    <div class="listPage">
        <van-tabs v-model="active" animated swipeable>
            <van-tab title="收件箱">
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
                            <div slot="action" @click="onSearch">搜索</div>
                            </van-search>
                            <ul>
                                <li v-for="(n,index) in noticeMessList" :key="index" @click="enterDetailed(n.title)">
                                    <h3>{{n.title}}</h3>
                                    <p><span>发送人：{{n.sentPeo}}</span><time>{{n.time}}</time></p>
                                </li>
                            </ul>
                        </div>
                    </div>

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
                            <div slot="action" @click="onSearch">搜索</div>
                            </van-search>
                            <ul>
                                <li v-for="(n,index) in noticeMessList" :key="index" @click="enterDetailed(n.title)">
                                    <h3>{{n.title}}</h3>
                                    <p><span>发送人：{{n.sentPeo}}</span><time>{{n.time}}</time></p>
                                </li>
                            </ul>
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
            active:2,
            value:'',
            noticeMessList:[
                { 
                    title:'1通知标题通知标题通知标题通知标题通知标题通知标题通知标题',
                    sentPeo:'张洋',
                    time:'2019-01-22'
                },{ 
                    title:'2通知标题通知标题通知标题通知标题通知标题通知标题通知标题',
                    sentPeo:'张洋',
                    time:'2019-01-22'
                },{ 
                    title:'3通知标题通知标题通知标题通知标题通知标题通知标题通知标题',
                    sentPeo:'张洋',
                    time:'2019-01-22'
                },{ 
                    title:'4通知标题通知标题通知标题通知标题通知标题通知标题通知标题',
                    sentPeo:'张洋',
                    time:'2019-01-22'
                },{ 
                    title:'5通知标题通知标题通知标题通知标题通知标题通知标题通知标题',
                    sentPeo:'张洋',
                    time:'2019-01-22'
                },{ 
                    title:'6通知标题通知标题通知标题通知标题通知标题通知标题通知标题',
                    sentPeo:'张洋',
                    time:'2019-01-22'
                },{ 
                    title:'6通知标题通知标题通知标题通知标题通知标题通知标题通知标题',
                    sentPeo:'张洋',
                    time:'2019-01-22'
                },{ 
                    title:'6通知标题通知标题通知标题通知标题通知标题通知标题通知标题',
                    sentPeo:'张洋',
                    time:'2019-01-22'
                },{ 
                    title:'6通知标题通知标题通知标题通知标题通知标题通知标题通知标题',
                    sentPeo:'张洋',
                    time:'2019-01-22'
                }
            ]
        }
    },
    methods:{
        onSearch:function(){

        },
        enterDetailed:function(nq){
            let me = this;
            me.$router.push({
                name:'detailed',
                params:{
                    id:nq
                }
            })
        },
        backTop:function(){
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        }
    }
}
</script>

<style>

</style>
