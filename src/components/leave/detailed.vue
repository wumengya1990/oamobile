<template>
    <div class="detailed" ref="layerPageHeight">
        <div class="leaveDetaileBox">
        <ul>
            <li><em>请假人</em><div class="rightCon">{{leaves.peoName}}</div></li>
            <li><em>联系电话</em><div class="rightCon">{{leaves.telephoneNum}}</div></li>
            <li><em>所属部门</em><div class="rightCon">{{leaves.department}}</div></li>
            <li><em>职务</em><div class="rightCon">{{leaves.duties}}</div></li>
            <li><em>离开时间</em><div class="rightCon">{{leaves.leaveTime}}</div></li>
            <li><em>返回时间</em><div class="rightCon">{{leaves.backTime}}</div></li>
            <li><em>外出地点</em><div class="rightCon">{{leaves.goingLocation}}</div></li>
            <li><em>外出事由</em><div class="rightCon">{{leaves.goingReasons}}</div></li>
            <li><em>行程安排</em><div class="rightCon">{{leaves.arrangement}}</div></li>
            
        </ul>
        </div>
        <div class="leaveDetaileBox">
            <h3>临时主持工作的负责同志</h3>
        <ul>
            <li><em>姓名</em><div class="rightCon">{{leaves.handoverPeo}}</div></li>
            <li><em>职务</em><div class="rightCon">{{leaves.handoverDuties}}</div></li>
            <li><em>联系电话</em><div class="rightCon">{{leaves.handovertelephoneNum}}</div></li>
        </ul>
        </div>

        <div class="leaveDetaileBox">
            <h3>转发分管领导批示</h3>
        <ul>
            <li><em>姓名</em><div class="rightCon">{{leaves.handoverPeo}}</div></li>
        </ul>
        </div>
        <div class="leaveDetaileBox">
            
        </div>
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
            leaves:{
                peoName:'张洋',
                telephoneNum:'12345678998',
                department:'徐州市第一中学',
                duties:'班主任',
                leaveTime:'2019/05/16  08:00',
                backTime:'2019/05/17  08:00',
                goingLocation:'徐州市教育局',
                goingReasons:'市级三好学生，活动展开会议',
                arrangement:'当天去当天回',
                handoverPeo:'张安',
                handoverDuties:'年级主任',
                handovertelephoneNum:'98765432112'
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
