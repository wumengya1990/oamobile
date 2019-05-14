<template>
    <div class="gwaddnew">
        <van-cell-group>
            <van-field v-model="gongwen.title" type="text" label="公文标题" placeholder="请输入公文标题" required />
            <van-field v-model="gongwen.docNum" type="text" label="文件编码" placeholder="请输入文件编码" required />
            <van-field v-model="gongwen.InternalNum" type="text" label="内部文号" placeholder="请输入内部文号" required />
            <van-field label="选择接收人"><a>添加人员</a></van-field>
            <van-field v-model="gongwen.contentMes" type="textarea" label="公文内容" rows="5" placeholder="请输入公文内容" autosize />
            <van-field v-model="gongwen.fileList" type="file" label="上传附件" placeholder="请输入密码" required />
        </van-cell-group>
        <van-popup v-model="layerShow" position="right">
            <div class="layerBox">
                <div></div>
            </div>
            <div class="bts">
            <van-button @click="layerShow=false" hairline size="small" style="width:120px;">取消</van-button>
            <van-button @click="validationScreening" hairline size="small" style="width:120px;">确定</van-button>
            </div>
        </van-popup>
    </div>
</template>

<script>
export default {
    name:'gwaddnew',
    data() {
        return {
            layerShow:false,
            gongwen:{
                title:'',
                docNum:'',
                InternalNum:'',
                contentMes:'',
                peoList:[],
                fileList:[]
                
            }
        }
    },
    mounted(){
        
        
    },
    methods: {
        validationScreening(){
            
        }
    },
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

</style>
