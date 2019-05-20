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
                <div class="layerBoxScroll">
                <van-collapse v-model="activeNames">
                    <van-collapse-item :title="peo.jigouName" :name="index++" v-for="(peo,index) in choPeoList" :key="index">
                        <div style="margin:10px 0;"></div>
                        <el-checkbox :indeterminate="peo.isIndeterminate" v-model="peo.checkAll" @change="handleCheckAllChange($event,index)">全选</el-checkbox>
                        <div style="margin:10px 0;"></div>
                        <el-checkbox-group v-model="peo.checkedCities" @change="handleCheckedCitiesChange($event,index)">
                            <el-checkbox v-for="(ry) in peo.renyuan" :label="ry" :key="ry">{{ry}}</el-checkbox>
                        </el-checkbox-group>
                    </van-collapse-item>
                </van-collapse>
                </div>
            </div>
            <div class="bts">
            <van-button @click="layerShow=false" hairline size="small" style="width:120px;">取消</van-button>
            <van-button @click="validationScreening" hairline size="small" type="info" style="width:120px;">确定</van-button>
            </div>
        </van-popup>
    </div>
</template>

<script>

const cityOptions = ['上海', '北京', '广州', '深圳'];
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
            checkAll: false,
            checkedCities: ['上海', '北京'],
            cities: cityOptions,
            isIndeterminate: true,
            choPeoList:[
                {
                    jigouName:'徐州市第一中学',
                    checkAll: false,
                    isIndeterminate: false,
                    checkedCities: [],
                    renyuan:["张三","李四","王五","丁三","杨四","钱五","孙六","陈七"]
                },
                {
                    jigouName:'徐州市第二中学',
                    checkAll: false,
                    isIndeterminate: false,
                    checkedCities: [],
                    renyuan:["张三","李四","王五王五","丁三","杨四","钱五","孙六","陈七"]
                },
                {
                    jigouName:'徐州市第三中学',
                    checkAll: false,
                    isIndeterminate: false,
                    checkedCities: [],
                    renyuan:["张三","李四","王五","丁三","杨四","钱五","孙六","陈七"]
                },
                {
                    jigouName:'徐州市第四中学',
                    checkAll: false,
                    isIndeterminate: false,
                    checkedCities: [],
                    renyuan:["张三","李四","王五","丁三","杨四","钱五","孙六","陈七"]
                }
            ],
            gongwen:{
                title:'',
                docNum:'',
                InternalNum:'',
                contentMes:'',
                dxchecked:true,
                peoList:[],
                fileList:[]
            }
        }
    },
    mounted(){
        
        
    },
    methods: {
        validationScreening(){
            let me = this;
            let sd = []
            for(let i=0, peolen=me.choPeoList.length;i<peolen;i++){
                
                for(let j=0, peolenN=me.choPeoList[i].checkedCities.length;j<peolenN;j++){
                    sd.push(me.choPeoList[i].checkedCities[j]);
                }
            }
            let sz = new Set(sd);
            me.gongwen.peoList.push(...sz);
            console.log(me.gongwen.peoList);
            me.layerShow = false;
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
        },
        handleCheckAllChange(event,suoyin) {
            let me = this;
            suoyin = suoyin-1;
            me.choPeoList[suoyin].checkedCities = event ? me.choPeoList[suoyin].renyuan : [];
            me.choPeoList[suoyin].isIndeterminate = false;
      },
      handleCheckedCitiesChange(event,suoyin) {
        let me = this;
        suoyin = suoyin-1;
        let checkedCount = event.length;
        me.choPeoList[suoyin].checkAll = checkedCount ===  me.choPeoList[suoyin].renyuan.length;
        me.choPeoList[suoyin].isIndeterminate = checkedCount > 0 && checkedCount < me.choPeoList[suoyin].renyuan.length;
      }
    }
}
</script>

<style lang="scss">
.van-popup {
    box-sizing: border-box;
    padding: 10px;
    &--right{
        width:80%;
        height:100%;
        .bts{ position:absolute; left: 0; top: auto; right: 0; bottom: 0; text-align:center; padding: 10px 0;}
    }
}

.van-collapse-item__content{ padding: 0 10px;}

</style>
