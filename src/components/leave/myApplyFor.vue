<template>
    
    <div class="listPage">
        <h3 style="text-align:center">我的申请</h3>
                <van-search
                    v-model="value"
                    placeholder="请输入搜索关键词"
                    show-action
                    shape="round"
                    @search="onSearch"
                    >
                <van-button slot="action" type="info" round size="small" @click="onSearch">搜索</van-button>
                </van-search>
                 <div class="List">
                    <dl class="noMessage" v-if="qjUnHaveList.length == 0">
                        <dt>OA</dt>
                        <dd><span>办公管理系统</span></dd>
                        <dd><p>暂无数据内容请刷新重试</p></dd>
                    </dl>
                    <div class="listBox">
                        <ul>
                            <li v-for="(n,index) in qjUnHaveList" :key="index" @click="enterDetailed(n.title)">
                                <van-swipe-cell :right-width="50">
                                <h3>请假人、{{n.leave_People}}</h3>
                                <p>
                                    <span>所属部门：{{n.dep}}</span>
                                    <time>{{n.createAt}}</time></p>
                                <span class="drop" slot="right"><van-icon name="delete"></van-icon></span>
                                </van-swipe-cell>
                            </li>
                        </ul>
                    </div>
                </div>
            
        <div class="xuanfu">
            <span @click="addnew"><van-icon name="add-o" /></span>
            <span @click="backTop"><van-icon name="arrow-up" /></span>
        </div>
        
    </div>
</template>

<script>
import top from './top'
export default {
    name:'listPage',
    components:{
      'qjTop':top  
    },
    data() {
        return {
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
        loadList(){
            let me = this;
            let url = '/api/Leave/applylist';
            let params={pageSize:me.pageSize,pageIndex:me.pageIndex}
            me.$api.get(url,params,res=>{
                console.log(res);
                me.qjUnHaveList = res.data;
            })
        },
        enterDetailed:function(nq){
            let me = this;
            me.$router.push({
                name:'leaveDetailed',
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
