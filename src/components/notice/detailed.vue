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
                <div class="attachment">
                    
                </div>
            </div>

            <div class="detailsBox replyBox">
                <h4><span>回复内容</span></h4>
                <van-cell-group>
                    <van-field v-model="message" type="textarea" placeholder="请输入回复内容"  rows="5" autosize />
                </van-cell-group>
                <div class="bts">
                    <van-button type="primary" style="height:45px; font-size:1.1rem; width:95%; display:block; margin:0 auto;">回复</van-button>
                    </div>
            </div>
        </div>

        <van-popup v-model="watchShow" position="right">
            <van-tabs swipeable>
                <van-tab title="已读">
                    <div class="watchShowBox" :style="{height:neiHeight, background:'#F30'}">
                        
                    </div>
                </van-tab>
                <van-tab title="未读">

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

                </van-tab>
                <van-tab title="请假人员信息">内容 2</van-tab>
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
