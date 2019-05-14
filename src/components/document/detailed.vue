<template>
    <div class="detailed" ref="layerPageHeight">
        <!-- {{$route.params.id}} -->
        <div class="detailedContent">
            <div class="synopsis">
                <h3>{{fileDetails.title}}</h3>
                <ul>
                    <li><em>文件编号：</em><div class="rightCon"><p>{{fileDetails.fileID}}</p></div></li>
                    <li><em>内部文号：</em><div class="rightCon"><p>{{fileDetails.fileIDN}}</p></div></li>
                    <li><em>发送人：</em><div class="rightCon"><p>{{fileDetails.publisher}}</p></div></li>
                    <li><em>收文日期：</em><div class="rightCon"><p>{{fileDetails.getTime}}</p></div></li>
                    <li><em>通知详情：</em>
                        <div class="rightConNoOver">
                            <p>{{fileDetails.particulars}}</p>
                        </div>
                    </li>
                    <li>
                        <div class="detailsState">
                            <van-button type="info" plain hairline size="small" @click="watchShow=true"><van-icon name="eye" />阅读情况100/200</van-button>
                            <van-button type="info" plain hairline size="small" @click="submittedShow=true"><van-icon name="column" />查看报送情况</van-button>
                        </div>
                    </li>
                </ul>
            </div>

            <div class="detailsBox attachment">

                <h4><span>附件列表</span></h4>
                <div class="attachmentList">
                    <ul>
                        <li>
                            <div class="fileImg"><i class="icon iconfont iconfujian"></i></div>
                            <div class="fileMessage">
                                <h5>标题标题标题标题标题标题标题标题</h5>
                                <p></p>
                                <dl>
                                    <dt><i class="icon iconfont iconxiazai"></i></dt>
                                    <dd>200K</dd>
                                </dl>
                            </div>
                        </li>
                        <li>
                            <div class="fileImg"><i class="icon iconfont iconfujian"></i></div>
                            <div class="fileMessage">
                                <h5>标题标题标题标题标题标题标题标题</h5>
                                <p></p>
                                <dl>
                                    <dt><i class="icon iconfont iconxiazai"></i></dt>
                                    <dd>200K</dd>
                                </dl>
                            </div>
                        </li>
                        <li>
                            <div class="fileImg"><i class="icon iconfont iconfujian"></i></div>
                            <div class="fileMessage">
                                <h5>标题标题标题标题标题标题标题标题</h5>
                                <p></p>
                                <dl>
                                    <dt><i class="icon iconfont iconxiazai"></i></dt>
                                    <dd>200K</dd>
                                </dl>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="detailsBox replyBox">
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
            </div>
        </div>

        <van-popup v-model="watchShow" position="right">
            <van-tabs swipeable>
                <van-tab title="已读">
                    <div class="layerBox">
                        <div class="watchShowBox">
                            <span v-for="c in readList.haveRead" :key="c.peoID">{{c.peoName}}</span>
                        </div>
                    </div>
                </van-tab>
                <van-tab title="未读">
                    <div class="layerBox">
                    <div class="watchShowBox">
                        <span v-for="d in readList.haveRead" :key="d.peoID">{{d.peoName}}</span>
                    </div>
                    </div>
                </van-tab>
            </van-tabs>

            <div class="bts">
                <van-button @click="watchShow=false" hairline size="small" style="width:120px;">取消</van-button>
                <van-button @click="validationScreening" hairline size="small" style="width:120px;">确定</van-button>
            </div>
        </van-popup>

        <van-popup v-model="submittedShow" position="right">
            <van-tabs swipeable>
                <van-tab title="参会人员信息">
                    <div class="layerBox">
                    <div class="stateBar">
                        <span>已报机构:{{10}}</span>
                        <span>未报机构:{{5}}</span>
                    </div>
                    <table class="tableStyle" style="margin:10px 0 0;" width="100%" cellpadding="0" cellspacing="0">
                        <thead>
                        <tr><th width="35%">所属机构</th><th>姓名</th><th width="35%">职务</th></tr>
                        </thead>
                        <tbody v-for="a in submitted.attendList" :key="a.jigouID">
                            <tr v-for="(b,index) in a.peoList" :key="b.peoID">
                                <td v-if="index==0" :rowspan="a.peoList.length" align="center">{{a.jigou}}</td>
                                <td>{{b.peoName}}</td>
                                <td>{{b.zhiwu}}</td>
                            </tr>
                        <!-- <tr><td rowspan="3">徐州市第一中学</td><td>张洋</td><td>校长</td></tr>
                        <tr><td>王五</td><td>语文组组长</td></tr>
                        <tr><td>张三</td><td>数学组组长</td></tr> -->
                        </tbody>
                    </table>
                    </div>
                </van-tab>
                <van-tab title="请假人员信息">
                     <div class="layerBox">
                         <table class="tableStyle" style="margin:10px 0 0;" width="100%" cellpadding="0" cellspacing="0">
                        <thead>
                        <tr><th width="35%">所属机构</th><th>姓名</th><th width="35%">职务</th></tr>
                        </thead>
                        <tbody v-for="a in submitted.attendList" :key="a.jigouID">
                            <tr v-for="(b,index) in a.peoList" :key="b.peoID">
                                <td v-if="index==0" :rowspan="a.peoList.length" align="center">{{a.jigou}}</td>
                                <td>{{b.peoName}}</td>
                                <td>{{b.zhiwu}}</td>
                            </tr>
                        </tbody>
                    </table>
                     </div>
                </van-tab>
            </van-tabs>
            <div class="bts">
                <van-button @click="submittedShow=false" hairline size="small" style="width:120px;">取消</van-button>
                <van-button @click="validationScreening" hairline size="small" style="width:120px;">确定</van-button>
            </div>
        </van-popup>
        

    </div>
</template>

<script>
export default {
    name:'detailed',
    data() {
        return {
            message:'',
            watchShow:false,
            submittedShow:false,
            neiHeight:'',
            fileDetails:{
                title:'关于召开2019年工作汇报预备体通知',
                fileID:'file20180513',
                fileIDN:'BN20180513',
                publisher:'张洋',
                getTime:'2018-05-13',
                particulars:'文本内容文本内容文本内容文本内容文本内容文本内容文本内容'
            },
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
    },
    methods:{
        setHeight(){
            let me = this;
            let layerHeight = window.getComputedStyle(me.$refs.layerHeight).height;
            let nHeight = parseInt(layerHeight)-100+"px";
            me.neiHeight = nHeight;
        },
        validationScreening(){
            
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
