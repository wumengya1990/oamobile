<template>
    <div class="gwaddnew bgMain posA posCenter">
        <div class="addForm">
        <van-cell-group>
            <van-field v-model="gongwen.title" type="text" label="公文标题" placeholder="请输入公文标题" required />
            <van-field v-model="gongwen.docNum" type="text" label="文件编码" placeholder="请输入文件编码" required />
            <van-field v-model="gongwen.InternalNum" type="text" label="内部文号" placeholder="请输入内部文号" required />
            <van-field v-model="gongwen.contentMes" type="textarea" label="公文内容" rows="5" placeholder="请输入公文内容" autosize />
        </van-cell-group>

        <van-cell-group>
            <div class="addBox">
                <em>拟办人</em>
                <div class="rightCon">
                    <div class="peolist"><span v-for="(a,index) in gongwen.peoList" @click="dropPeo(index)" :key="index">{{a}}</span></div>
                    <p>点击人员名称可删除</p>
                    <a class="appendPeo" @click="layerShow = true"><van-icon name="friends" />添加拟办人</a>
                    <span class="duanxin">手机端短信提醒<van-switch v-model="gongwen.dxchecked" size="14px" /></span>
                </div>
            </div>
            <div class="addBox">
                <em>上传附件</em>
                <div class="rightCon">
                    <div class="fileAdd">
                        <label class="upButton"><input @change="readyFile($event)" type="file" multiple /><van-icon name="send-gift-o" />选择上传文件</label>
                        <ul class="fileList">
                            <li v-for="(a,index) in gongwen.fileList" :key="index"><van-button size="mini" @click="dropFile(index)" round type="danger"><van-icon name="delete" /></van-button><span>{{a.name}}</span></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="bts">
                <van-button type="primary" size="large">提交</van-button>
            </div>
        </van-cell-group>

        </div>

        <van-popup v-model="layerShow" position="right">
            <div class="layerBox">
                <van-search
                v-model="searcgValue"
                placeholder="请输入搜索关键词"
                show-action
                shape="round"
                @search="onSearch"
                >
                <div slot="action" @click="onSearch">搜索</div>
                </van-search>
                <van-collapse v-model="activeNames">
                    <van-collapse-item title="有赞微商城" name="1">
                        <van-checkbox-group v-model="result3">
                            <van-cell-group>
                            <van-cell
                                v-for="(item, index) in list"
                                clickable
                                :key="index"
                                :title="`复选框${item}`"
                                @click="toggle(index)"
                            >
                                <van-checkbox
                                ref="checkboxes"
                                :name="item"
                                />
                            </van-cell>
                            </van-cell-group>
                        </van-checkbox-group>
                    </van-collapse-item>
                    <van-collapse-item title="有赞零售" name="2">
                        网店吸粉获客、会员分层营销、一机多种收款，告别经营低效和客户流失
                    </van-collapse-item>
                    <van-collapse-item title="有赞美业" name="3">
                        线上拓客，随时预约，贴心顺手的开单收银
                    </van-collapse-item>
                </van-collapse>
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
            activeNames:[],
            searcgValue:'',
            layerShow:false,
            result3: [],
            list: [
                'a',
                'b',
                'c'
            ],
            gongwen:{
                title:'',
                docNum:'',
                InternalNum:'',
                contentMes:'',
                dxchecked:true,
                peoList:["张洋","张洋","张洋","张洋","张洋","张洋","张洋"],
                fileList:[]
            }
        }
    },
    mounted(){
        
        
    },
    methods: {
        validationScreening(){
            
        },
        onSearch(){
             this.$toast(this.searcgValue);
        },
        toggle(index) {
            this.$refs.checkboxes[index].toggle();
        },
        dropPeo(suoyin){
            this.$dialog.confirm({
                title:"删除提示",
                message:"您确定要删除已选拟办人"+this.gongwen.peoList[suoyin]
            }).then(()=>{
                this.gongwen.peoList.splice(suoyin,1);
                this.$toast.success({
                    duration:1000,
                    message:'人员已删除'
                });
            }).catch(()=>{
                this.$toast.fail({
                    duration:1000,
                    message:'取消删除人员'
                });
            })
        },
        // 上传图片准备
        readyFile(event){
            let fileList= event.target.files;
            let newList=[];
            for(let i=0;i<fileList.length;i++){
                newList.push(fileList[i]);
                //this.gongwen.fileList.push(fileList[i]);
            }
            let sd = new Set(newList);
            this.gongwen.fileList.push(...sd);
            console.log(this.gongwen.fileList);

        },
        dropFile(suoyin){
            this.gongwen.fileList.splice(suoyin,1);
        }
    }
}
</script>

<style lang="scss">
.van-popup {
    box-sizing: border-box;
    padding: 10px;
    &--right{
        width:70%;
        height:100%;
        .bts{ position:absolute; left: 0; top: auto; right: 0; bottom: 0; text-align:center; padding: 10px 0;}
    }
}

</style>
