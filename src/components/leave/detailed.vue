<template>
    <div class="detailed" ref="layerPageHeight">
        <div class="leaveDetaileBox">
        <ul>
            <li><em>请假人</em><div class="rightCon">{{leaves.leave_People}}</div></li>
            <li><em>联系电话</em><div class="rightCon">{{leaves.link_Phone}}</div></li>
            <li><em>所属部门</em><div class="rightCon">{{leaves.dep}}</div></li>
            <li><em>职务</em><div class="rightCon">{{leaves.job}}</div></li>
            <li><em>离开时间</em><div class="rightCon">{{leaves.leave_Time|newleave_Time}}</div></li>
            <li><em>返回时间</em><div class="rightCon">{{leaves.return_Time|newreturn_Time}}</div></li>
            <li><em>外出地点</em><div class="rightCon">{{leaves.destination}}</div></li>
            <li><em>外出事由</em><div class="rightCon">{{leaves.reason}}</div></li>
            <li><em>行程安排</em><div class="rightCon">{{leaves.trip}}</div></li>
            
        </ul>
        </div>
        <div class="leaveDetaileBox">
            <h3>临时主持工作的负责同志</h3>
        <ul>
            <li><em>姓名</em><div class="rightCon">{{leaves.l_Name}}</div></li>
            <li><em>职务</em><div class="rightCon">{{leaves.l_Job}}</div></li>
            <li><em>联系电话</em><div class="rightCon">{{leaves.l_Link_Phone}}</div></li>
        </ul>
        </div>

        <!-- 领导审核 -->
        <div v-if="peoRole==1&&$route.params.listType!=1" class="leaveDetaileBox">
            <h3>领导审批</h3>
            <div class="ApprovalBox">
                <div>
                <van-radio-group v-model="opinion.isArchive">
                    <van-radio name="1">同意</van-radio>
                    <van-radio name="2">不同意</van-radio>
                </van-radio-group>
                <div class="clear"></div>
                </div>
                <div>
                    <van-cell-group>
                    <van-field
                        v-model="opinion.remarks"
                        label="审批意见"
                        type="textarea"
                        placeholder="请输入审批意见"
                        rows="1"
                        autosize
                    />
                    </van-cell-group>
                </div>
            </div>
        </div>
        <!-- 领导审核结束 -->

        <!-- 转发分管领导 -->
        <div v-if="peoRole==2" class="leaveDetaileBox">
            <h3>转发分管领导批示</h3>
        <ul class="addBox">
            <li><em>姓名</em><div class="rightCon">
                    <div class="choPeoList">
                    <div class="peolist"><span v-for="(a,index) in zpeoList" @click="dropPeo(index)" :key="index">{{a.userName}}</span></div>
                    <p>点击人员名称可删除</p>
                    <a class="appendPeo" @click="choPeo"><van-icon name="friends" />添加拟办人</a>
                    <span class="duanxin">手机端短信提醒<van-switch v-model="bumfMode" size="14px" /></span>
                    </div>
                </div>
            </li>
        </ul>
        </div>
        <!-- 转发分管领导结束 -->


        
        <div class="leaveDetaileBox">
            <h3>审批流程</h3>
            <div class="flowBox" v-for="(n,index) in liuchengList" :key="index">
                <p><span>{{n.name}}</span></p>
                <p>
                    <span v-if="n.state=='已转发'||n.state=='同意'" style="color:#1ac138">{{n.state}}</span>
                    <span v-else-if="n.state=='待审核'||n.state=='待转发'" style="color:#e4ab04">{{n.state}}</span>
                    <span v-else>{{n.state}}</span>
                </p>
                <p><span>{{n.time}}</span></p>
            </div>
        </div>

        <div class="bts">
            <van-button type="primary" @click="submit" style="height:40px; font-size:1.1rem; width:95%; display:block; margin:0 auto;">提交</van-button>
        </div>

        <!-- 人员选择 -->
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
                    <van-collapse-item :title="peo.deptName" :name="index++" v-for="(peo,index) in choPeoList" :key="index">
                        <ul class="peoList">
                            <li :class="{on:peoN.ched}" @click="xzPeo(index,indexn)" v-for="(peoN,indexn) in peo.userList" :key="indexn">
                                {{peoN.userName}}<van-icon name="checked" />
                            </li>
                        </ul>
                    </van-collapse-item>
                </van-collapse>
                </div>
            </div>
            <div class="bts">
            <van-button @click="layerShow=false" hairline size="small" style="width:120px;">取消</van-button>
            <van-button @click="validationScreening" hairline size="small" type="info" style="width:120px;">确定</van-button>
            </div>
        </van-popup>
        <!-- 人员选择结束 -->

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
            peoRole:0,                       //角色权限
            opinion:{
                autoID:this.$route.params.autoID,
                state:0,
                isArchive:'1',            //领导意见
                remarks:''
            },
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
            liuchengList:[],
            layerShow:false,            //人员弹层
            choPeoList:[],              //人员列表
            activeNames:[],             //选择的人员
            searcgValue:'',             //搜索人员框
            zpeoList:[],
            bumfMode:false,

            
        }
    },
    mounted() {
        console.log(this.$route.params.autoID);
        this.loadDetailed();
    },
    filters:{
        newleave_Time:function(mes){
            if(mes){
                let nr = mes.toString();
                let result = nr.replace("T"," ");
                return result;
            }else{
                return mes;
            }
        },
        newreturn_Time:function(mes){
            if(mes){
                let nr = mes.toString();
                let result = nr.replace("T"," ");
                return result;
            }else{
                return mes;
            }
        }
    },
    methods:{
        xzPeo(wIndex,nIndex){
            let me = this;
            me.choPeoList[wIndex-1].userList[nIndex].ched =! me.choPeoList[wIndex-1].userList[nIndex].ched;
            console.log(me.choPeoList[wIndex-1].userList[nIndex].ched);
        },
        setHeight(){
            let me = this;
            let layerHeight = window.getComputedStyle(me.$refs.layerHeight).height;
            let nHeight = parseInt(layerHeight)-100+"px";
            me.neiHeight = nHeight;
        },
        // 提交选择的人员
        validationScreening(){
            let me = this;
            let obg = JSON.stringify(me.choPeoList)
            obg = JSON.parse(obg);
            me.zpeoList=[];
            for(let i=0, peolen=obg.length;i<peolen;i++){
                for(let j=0, peolenN=obg[i].userList.length;j<peolenN;j++){
                    if(obg[i].userList[j].ched == true){
                        me.zpeoList.push(obg[i].userList[j]);
                    }
                }
            }
            if(me.zpeoList.length>1){
                me.$toast("只能选择一人");
                me.zpeoList=[];
            }else{
                console.log(me.zpeoList);
                me.layerShow = false;
            }
            
        },
        // 加载详情
        loadDetailed(){
            let me = this;
            let url = '/api/Leave';
            let params={autoID:me.$route.params.autoID};
            me.$api.get(url,params,res=>{
                console.log("加载详情成功");
                console.log(res);
                me.leaves = res.data;
                me.liuchengList = res.flowList;
                me.peoRole = res.state;
                // console.log(me.leaves);
                // console.log(me.liuchengList);

            })
        },
        choPeo(){
            this.layerShow = true;
            this.loadPeo();
        },
        // 搜索人员
        onSearch(){
            
        },
        // 加载人员
        loadPeo(){
            let me = this;
            let url = '/api/user/select';
            let params={};
            me.$api.get(url,params,res=>{
                console.log(res);
                let jieshou = [];
                jieshou = res.data;
                for(let n =0, lenn = jieshou.length; n<lenn; n++){
                //     jieshou[n].checkAll = false;
                //     jieshou[n].isIndeterminate = false;
                //     jieshou[n].checkedCities=[];
                    for(let m=0, lennn=jieshou[n].userList.length;m<lennn;m++){
                        jieshou[n].userList[m].ched=false;
                    }
                }
                me.choPeoList =jieshou;
                console.log(me.choPeoList);
            })
        },
        dropPeo(suoyin){
            this.zpeoList.splice(suoyin,1)
        },
        // 提交返回
        submit(){
            let me = this;
            if(me.peoRole==1){
                let url ='/api/Leave/audititng';
                let obg = JSON.stringify(me.opinion);
                obg = JSON.parse(obg);
                obg.bumfMode =="1" ? 1 : 0;
                obg.state = me.peoRole;
                let params = obg
                me.$api.post(url,params,res=>{
                    console.log(res);
                })
            }else if(me.peoRole==2){
                let url ='/api/Leave/forward';
                let obg = new Object();
                obg.autoID = me.$route.params.autoID;
                obg.isArchive = me.bumfMode == true? 1:0;
                obg.auditor = me.zpeoList[0].autoID;
                let params = obg;
                me.$api.post(url,params,res=>{
                    console.log(res);
                })
                
            }else if(me.peoRole==3){
                let param = {AutoID:me.$route.params.autoID};
                let url ='/api/Leave/file?'+me.$qs.stringify(param);
                let params ={};
                me.$api.post(url,params,res=>{
                    console.log(res);
                })
            }else{
                return false;
            }
            
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
