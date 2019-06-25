<template>
    <div class="gwaddnew bgMain posA posCenter">
        <div class="addForm">
        <van-cell-group>
            <van-field v-model="leaves.leave_People" @blur="kjiance('请假人',leaves.leave_People)" type="text" label="请假人" placeholder="请输入请假人" required />
            <van-field v-model="leaves.link_Phone" @blur="wathchTel(leaves.link_Phone)" type="text" label="联系电话" placeholder="请输入联系电话" required />
            <van-field v-model="leaves.dep" type="text" label="所属部门" @blur="kjiance('所属部门',leaves.dep)" placeholder="请输入所属部门" required />
            <van-field v-model="leaves.job" type="text" label="职务" @blur="kjiance('职务',leaves.job)" placeholder="请输入职务" required />
            <van-field v-model="leaves.leave_Time" @focus="choLeaveTime" type="text" @blur="kjiance('离开时间',leaves.leave_Time)" label="离开时间" placeholder="请输入离开时间" required />
            <van-field v-model="leaves.return_Time" @focus="choBackTime" type="text" @blur="kjiance('返回时间',leaves.return_Time)" label="返回时间" placeholder="请输入返回时间" required />
            <van-field v-model="leaves.destination" type="textarea" label="外出地点" @blur="kjiance('外出地点',leaves.destination)" rows="5" placeholder="请输入外出地点" required autosize />
            <van-field v-model="leaves.reason" type="textarea" label="外出事由" @blur="kjiance('外出事由',leaves.reason)" rows="5" placeholder="请输入外出事由" required autosize />
            <van-field v-model="leaves.trip" type="textarea" label="行程安排" @blur="kjiance('行程安排',leaves.trip)" rows="5" placeholder="请输入行程安排" required autosize />
        </van-cell-group>
        <van-cell-group>
            <h2>临时主持工作的负责同志</h2>
            <van-field v-model="leaves.l_Name" type="text" label="姓名" @blur="kjiance('临时负责人员姓名',leaves.l_Name)" placeholder="请输入临时负责人员姓名" required />
            <van-field v-model="leaves.l_Job" type="text" label="职务" @blur="kjiance('临时负责人员职位',leaves.l_Job)" placeholder="请输入临时负责人员职位" required />
            <van-field v-model="leaves.l_Link_Phone" type="text" @blur="wathchTel(leaves.l_Link_Phone)" label="联系电话" placeholder="请输入临时负责人员电话" required />
            <div class="bts">
                <van-button type="primary" @click="applyForLeave" size="large">提交</van-button>
                <van-button type="default" @click="$router.back(-1)" size="large">返回</van-button>
            </div>
        </van-cell-group>

        

        </div>
        <van-popup v-model="leaveTimeShow" position="bottom">
            <van-datetime-picker
                v-model="wleaveTime"
                type="datetime"
                :min-date="minDate"
                @change="leaveChange"
                @confirm="leaveSure"
                @cancel="leaveNo"
            />
        </van-popup>
        <van-popup v-model="backTimeShow" position="bottom">
            <van-datetime-picker
                v-model="wbackTime"
                type="datetime"
                :min-date="minDate"
                @change="backChange"
                @confirm="backSure"
                @cancel="backNo"
            />
        </van-popup>
        
    </div>
</template>

<script>
const lt = levTime();
const bt = bcTime();
function levTime(){
    let nd = new Date();
    let a = nd.getFullYear();
    let b = nd.getMonth();
    let c = nd.getDate();
    let d = nd.getHours();
    let e = nd.toTimeString();
    let n = a+"/"+(b+1)+"/"+c+" "+e.substring(0,5);
    return n;
}
function bcTime(){
    let nd = new Date();
    let a = nd.getFullYear();
    let b = nd.getMonth();
    let c = nd.getDate();
    let d = nd.getHours();
    let e = nd.toTimeString();
    let n = a+"/"+(b+1)+"/"+c+" "+e.substring(0,5);
    return n;
}
export default {
    name:'gwaddnew',
    data() {
        return {
            leaveTimeShow:false,
            backTimeShow:false,
            wbackTime:new Date(),
            wleaveTime:new Date(),
            minDate:new Date(),
            timeBg:'',
            timeNd:'',
            leaves:{
                auditStatus:0,
                leave_People:'',
                link_Phone:'',
                dep:'',
                job:'',
                leave_Time:lt,
                return_Time:bt,
                destination:'',
                reason:'',
                trip:'',
                l_Name:'',
                l_Job:'',
                l_Link_Phone:'',
                isArchive:0,
                createUser:0,
            }
        }
    },
    mounted(){
        
        
    },
    computed: {
        
    },
    methods: {
        validationScreening(){
            
        },
        // 提交申请
        applyForLeave(){
            let me = this;
            let yz = /^[1][3,4,5,7,8,9][0-9]{9}$/;
            //debugger;
            for(let key in me.leaves){
                if(me.leaves[key]===''){
                    this.$toast("请完善必填选项");
                    return false;
                }
            }
            if( me.endWathchTel(me.leaves.link_Phone)==false||me.endWathchTel(me.leaves.l_Link_Phone)==false){
                return false;
            }
            let url='/api/Leave';
            let params = me.leaves;
            me.$toast.loading({
                mask: true,
                forbidClick:false,
                duration:0,
                message:'提交中...'
            });
            me.$api.post(url,params,res=>{
                console.log(res);
                if(res.code==200){
                    me.$toast.clear();
                    me.$toast("请假创建成功");
                    me.$router.push({
                        name:'myApplyFor'
                    })
                }
            })

        },
        // 选择离开事件
        choLeaveTime(){
            this.leaveTimeShow =  true;
        },
        // 选择返回事件
        choBackTime(){
            this.backTimeShow = true;
        },
        // 选择离开时间
        leaveChange(e){
             let timeList =[];
             timeList = e.getValues();
             this.leaves.leave_Time = timeList[0]+'\/'+timeList[1]+'\/'+timeList[2]+" "+timeList[3]+':'+timeList[4];
             this.timeBg = timeList[0]+timeList[1]+timeList[2]+timeList[3]+timeList[4];
             let kaishi = parseInt(this.timeBg);
             let jieshu = parseInt(this.timeNd);
            if((jieshu-kaishi)<0){
                this.$toast("不能选择大于结束时间");
            }
            //  console.log(this.leaves.leave_Time );
        },
        // 确定选择离开时间
        leaveSure(){
            this.leaveTimeShow =  false;
        },
        // 取消选择离开时间
        leaveNo(){
            this.leaveTimeShow =  false;
        },
        // 选择返回时间
        backChange(e){
            let timeList =[];
            timeList = e.getValues();
            this.leaves.return_Time = timeList[0]+'\/'+timeList[1]+'\/'+timeList[2]+" "+timeList[3]+':'+timeList[4];
            // console.log(this.leaves.return_Time );
            this.timeNd = timeList[0]+timeList[1]+timeList[2]+timeList[3]+timeList[4];
            let kaishi = parseInt(this.timeBg);
            let jieshu = parseInt(this.timeNd);
            if((jieshu-kaishi)<0){
                this.$toast("不能选择小于开始时间");
            }
        },
        // 内容验证
        kjiance(timu,mes){
        if(!mes){
            this.$toast(timu+"不能为空");
        }
        },
        // 检查手机号
        wathchTel(tel){
            console.log(tel);
            let yz = /^[1][3,4,5,7,8,9][0-9]{9}$/;
            if(!yz.test(tel)||tel==''||!tel){
                this.$toast.fail({
                    duration:3000,
                    message:'请输入正确的电话号码'
                })
            }
        },
        endWathchTel(tel){
            console.log(tel);
            let yz = /^[1][3,4,5,7,8,9][0-9]{9}$/;
            if(!yz.test(tel)||tel==''||!tel){
                this.$toast.fail({
                    duration:3000,
                    message:'请输入正确的电话号码'
                })
                return false;
            }else{
                return true
            }
        },
        backSure(){
                this.backTimeShow =  false;
        },
        backNo(){
            this.backTimeShow =  false;
        },
        toggle(index) {
            this.$refs.checkboxes[index].toggle();
        },
        dropPeo(suoyin){
            this.$dialog.confirm({
                title:"删除提示",
                message:"您确定要删除已选拟办人"+this.leaves.peoList[suoyin]
            }).then(()=>{
                this.leaves.peoList.splice(suoyin,1);
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
                //this.leaves.fileList.push(fileList[i]);
            }
            let sd = new Set(newList);
            this.leaves.fileList.push(...sd);
            console.log(this.leaves.fileList);

        },
        dropFile(suoyin){
            this.leaves.fileList.splice(suoyin,1);
        }
    }
}
</script>

<style lang="scss">
.van-popup {
    box-sizing: border-box;
    padding: 10px;
    &--right{
        width:100%;
        height:100%;
        .bts{ position:absolute; left: 0; top: auto; right: 0; bottom: 0; text-align:center; padding: 10px 0;}
    }
}

</style>
