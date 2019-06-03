<template>
    <div class="detailed" ref="layerPageHeight">
        <!-- {{$route.params.id}} -->
        <div class="detailedContent">
            <div class="synopsis">
                <h3>{{fileDetails.title}}</h3>
                <ul>
                    <li><em>文件编号：</em><div class="rightCon"><p>{{fileDetails.bumfcode}}</p></div></li>
                    <li><em>内部文号：</em><div class="rightCon"><p>{{fileDetails.bumftop}}</p></div></li>
                    <li><em>发送人：</em><div class="rightCon"><p>{{fileDetails.sendPro}}</p></div></li>
                    <li><em>收文日期：</em><div class="rightCon"><p>{{fileDetails.beginDate}}</p></div></li>
                    <li><em>通知详情：</em>
                        <div class="rightConNoOver">
                            <p>{{fileDetails.contentDetail}}</p>
                        </div>
                    </li>
                    <!-- <li>
                        <div class="detailsState">
                            <van-button type="info" plain hairline size="small" @click="watchShow=true"><van-icon name="eye" />阅读情况100/200</van-button>
                            <van-button type="info" plain hairline size="small" @click="submittedShow=true"><van-icon name="column" />查看报送情况</van-button>
                        </div>
                    </li> -->
                </ul>
            </div>

            <div class="detailsBox attachment" v-if="fujianName.length!=0">
                <h4><span>附件列表</span></h4>
                <div class="attachmentList">
                    <ul>
                        <li v-for="(fj, index) in fujianName" :key="index">
                            <div class="fileImg"><i class="icon iconfont iconfujian"></i></div>
                            <div class="fileMessage">
                                <h5>{{fj}}</h5>
                                <p></p>
                                <dl>
                                    <dt><a :href="fujianURL[index]"><i class="icon iconfont iconxiazai"></i></a></dt>
                                    <dd>200K</dd>
                                </dl>
                            </div>
                        </li>
                        
                    </ul>
                </div>
            </div>
            
            <!-- 送阅意见 -->
            <div v-if="fileDetails.state==1" class="detailsBox opinionBox">
                 <h4><span>送阅意见</span></h4>
                 <ul class="opinionBoxList">
                     <li>
                         <div class="message" placeholder="暂无送阅意见">
                             {{songyueyijian}}
                         </div>
                         <dl>
                             <dt>张洋</dt>
                             <dd>2019-03-22&nbsp;&nbsp;15:00</dd>
                         </dl>
                     </li>
                     <li>
                         <div class="message" placeholder="暂无送阅意见">
                             {{songyueyijian}}
                         </div>
                         <dl>
                             <dt>张洋</dt>
                             <dd>2019-03-22&nbsp;&nbsp;15:00</dd>
                         </dl>
                     </li>
                 </ul>
            </div>
            <!-- 送阅意见结束 -->

            <!-- 领导批示 -->
            <div v-if="fileDetails.state==2" class="detailsBox opinionBox">
                 <h4><span>领导批示</span></h4>
                 <ul class="opinionBoxList">
                     <li v-for="(n,index) in fujiaList" :key="index">
                         <div class="message" placeholder="暂无送阅意见">
                             {{n.feedBackIdea}}
                         </div>
                         <dl>
                             <dt>{{n.userName}}</dt>
                             <dd>{{n.feedtime}}</dd>
                         </dl>
                     </li>
                 </ul>
                 <van-cell-group>
                    <van-field v-model="message" type="textarea" placeholder="请输入回复内容"  rows="5" autosize />
                </van-cell-group>
                <div class="bts">
                    <van-button type="primary" @click="feedback" style="height:40px; font-size:1.1rem; width:95%; display:block; margin:0 auto;">回复</van-button>
                </div>
            </div>
            <!-- 领导批示结束 -->

            <!-- 处室办理 -->
            <div v-if="fileDetails.state==3" class="detailsBox department">
                 <h4><span>处室办理</span></h4>
                 <ul class="departmentList">
                     <li><span>徐州市第一中学</span><span>已阅</span><span>2019-03-22&nbsp;&nbsp;15:00</span></li>
                     <li><span>徐州市第一中学</span><span>已阅</span><span>2019-03-22&nbsp;&nbsp;15:00</span></li>
                     <li><span>徐州市第一中学</span><span>已阅</span><span>2019-03-22&nbsp;&nbsp;15:00</span></li>
                     <li><span>徐州市第一中学</span><span>已阅</span><span>2019-03-22&nbsp;&nbsp;15:00</span></li>
                 </ul>
            </div>
            <!-- 处室办理结束 -->

            <!-- <div class="detailsBox replyBox">
                <h4><span>回复内容</span></h4>
                <div class="replyBoxCon">
                    <ul>
                        <li>
                            <div class="peo">张洋</div>
                            <div class="rightCon">
                                <div class="replyBoxMes">
                                    <div class="replyBoxMes_1">
                                    <p>啊大大大大大大大大大大大大大大大大大</p>
                                    </div>
                                    <div class="fileBar">
                                        <span><i class="icon iconfont iconfujian"></i></span>
                                        <p>文件名称</p>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="peo">张洋</div>
                            <div class="rightCon">
                                <div class="replyBoxMes">
                                    <div class="replyBoxMes_1">
                                    <p>啊大大大大大大大大大大大大大大大大大</p>
                                    </div>
                                    <div class="fileBar">
                                        <span><i class="icon iconfont iconfujian"></i></span>
                                        <p>文件名称</p>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <van-cell-group>
                    <van-field v-model="message" type="textarea" placeholder="请输入回复内容"  rows="5" autosize />
                </van-cell-group>
                <div class="bts">
                    <van-button type="primary" style="height:40px; font-size:1.1rem; width:95%; display:block; margin:0 auto;">回复</van-button>
                </div>
            </div> -->
            

        </div>

    </div>
</template>

<script>
export default {
    name:'gwdetailed',
    data() {
        return {
            message:'',
            watchShow:false,
            submittedShow:false,
            songyueyijian:'cacacacacacacaca',
            neiHeight:'',
            fileDetails:{
                title:'关于召开2019年工作汇报预备体通知',
                fileID:'file20180513',
                fileIDN:'BN20180513',
                publisher:'张洋',
                getTime:'2018-05-13',
                particulars:'文本内容文本内容文本内容文本内容文本内容文本内容文本内容'
            },
            fujiaList:[],               //附件内容送阅意见,领导批示,处室办理
            fujianName:[],              //附件名称
            fujianURL:[],               //附件地址
            readList:{                  //弹层阅读详情内容
                haveRead:[
                    {peoName:'张三',peoID:'u0001'},
                    {peoName:'李四',peoID:'u0002'},
                    {peoName:'王五',peoID:'u0003'}
                ],
                unHaveRead:[
                    {peoName:'赵六',peoID:'u0004'},
                    {peoName:'孙琪',peoID:'u0005'},
                    {peoName:'张弛',peoID:'u0006'}
                ]
            },
            submitted:{                 //参会情况弹层内容
                attendList:[
                    {
                        jigou:'徐州一中',
                        jigouID:'jg001',
                        peoList:[
                            {peoName:'张三',peoID:'u0001',zhiwu:'办公式主任办公式主任办公式主任'},
                            {peoName:'李四',peoID:'u0002',zhiwu:'教研组组长'},
                            {peoName:'王五',peoID:'u0003',zhiwu:'语文组组长'}
                        ]
                    },
                    {
                        jigou:'徐州二中',
                        jigouID:'jg002',
                        peoList:[
                            {peoName:'张三',peoID:'u0001',zhiwu:'办公式主任'},
                            {peoName:'李四',peoID:'u0002',zhiwu:'教研组组长'},
                            {peoName:'王五',peoID:'u0003',zhiwu:'语文组组长'}
                        ]
                    },
                    {
                        jigou:'徐州三中',
                        jigouID:'jg003',
                        peoList:[
                            {peoName:'张三',peoID:'u0001',zhiwu:'办公式主任'},
                            {peoName:'李四',peoID:'u0002',zhiwu:'教研组组长'},
                            {peoName:'王五',peoID:'u0003',zhiwu:'语文组组长'}
                        ]
                    }
                    
                ],
                leaveList:[
                    {peoName:'张三',peoID:'u0001'},
                    {peoName:'李四',peoID:'u0002'},
                    {peoName:'王五',peoID:'u0003'}
                ]
            }
        }
    },
    mounted() {
        console.log(this.$route.params.id);
        console.log(this.$route.params.type);
        this.loadxaingqing();
    },
    methods:{
        // 设置高度
        setHeight(){
            let me = this;
            let layerHeight = window.getComputedStyle(me.$refs.layerHeight).height;
            let nHeight = parseInt(layerHeight)-100+"px";
            me.neiHeight = nHeight;
        },
        //加载详情
        loadxaingqing(){
            let me = this;
            let url = '/api/Office';
            let params = { autoID:me.$route.params.id,type:me.$route.params.type};
            me.$api.get(url,params,res=>{
                console.log(res);
                me.fileDetails = res.data;
                me.fujiaList = res.list;
                //me.replyList = res.replyList;
                let file = res.data.fjPath;
                let fileUrl = res.data.path;
                if(file==""||file==null||file==undefined){
                        me.fujianName=[];
                }else{
                    me.fujianName = file.split(",");
                    me.fujianURL = fileUrl.split(",");
                }
                // console.log(me.fujianName);
            })
        },
        //回复
        feedback(){
            let me = this;
            let url = '/api/Office/reply';
            let params = {};
        }
    }
}
</script>

<style lang="scss">
.van-popup {
    box-sizing: border-box;
    &--right{
        width:100%;
        height:100%;
        .bts{ position:absolute; left: 0; top: auto; right: 0; bottom: 0; text-align:center; padding: 10px 0;}
    }
}
</style>
