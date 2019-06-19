<template>
    <div class="detailed" ref="layerPageHeight">
        <!-- {{$route.params.id}} -->
        <div class="detailedContent">
            <div class="synopsis">
                <h3>{{fileDetails.title}}</h3>
                <ul>
                    <li><em>文件编号：</em><div class="rightCon"><p>{{fileDetails.bumfcode}}</p></div></li>
                    <li><em>内部文号：</em><div class="rightCon"><p>{{fileDetails.bumftop}}</p></div></li>
                    <li><em>发送人：</em><div class="rightCon"><p>{{fileDetails.userName}}</p></div></li>
                    <li><em>收文日期：</em><div class="rightCon"><p>{{fileDetails.beginDate|newBeginDate}}</p></div></li>
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
                                    <dt><a :href="fujianURL[index]" target="_blank" :download="fj"><i class="icon iconfont iconxiazai"></i></a></dt>
                                    <dd></dd>
                                </dl>
                            </div>
                        </li>
                        
                    </ul>
                </div>
            </div>
            
            <!-- 送阅意见 -->
            <!-- <div v-if="fileDetails.state==1" class="detailsBox opinionBox"> -->
            <div class="detailsBox opinionBox">
                 <h4><span>送阅意见</span></h4>
                 <ul v-if="fileDetails.state!=1" class="opinionBoxList">
                     <li v-for="(sy,indexs) in songyueList" :key="indexs">
                         <div class="message">
                             <p v-if="sy.feedBackIdea==null||sy.feedBackIdea==''" style="color:#F30">未回复</p>
                             <p v-else>{{sy.feedBackIdea}}</p>
                             
                         </div>
                         <dl>
                             <dt>{{sy.userName}}</dt>
                             <dd v-if="sy.feedBackIdea!=null || sy.feedBackIdea!=''">{{sy.feedtime|newFeedtime}}</dd>
                         </dl>
                     </li>
                 </ul>
                 <div v-if="fileDetails.state==1">
                 <van-cell-group>
                    <van-field v-model="songyuMes" type="textarea" placeholder="请输入回复内容"  rows="5" autosize />
                </van-cell-group>
                <div class="bts">
                    <van-button type="primary" @click="songyuSunmit" style="height:40px; font-size:1.1rem; width:95%; display:block; margin:0 auto;">回复</van-button>
                </div>
                </div>
            </div>
            <!-- 送阅意见结束 -->

            <!-- 领导批示 -->
            <div v-if="fileDetails.state==0||fileDetails.state==2" class="detailsBox opinionBox">
                 <h4><span>领导批示</span></h4>
                 <ul class="opinionBoxList">
                     <li v-for="(n,index) in lingdaopishi" :key="index">
                         <div class="message">
                             <p v-if="n.feedBackIdea==null||n.feedBackIdea==''" style="color:#F30">未回复</p>
                             <p v-else>{{n.feedBackIdea}}</p>
                         </div>
                         <dl>
                             <dt>{{n.userName}}</dt>
                             <dd>{{n.feedtime|newFeedtime}}</dd>
                         </dl>
                     </li>
                 </ul>
                 <div v-if="fileDetails.state==2&&$route.params.zt!=1">
                 <van-cell-group>
                    <van-field v-model="songyuMes1" type="textarea" placeholder="请输入回复内容"  rows="5" autosize />
                </van-cell-group>
                <div class="bts">
                    <van-button type="primary" @click="lingdaoSunmit" style="height:40px; font-size:1.1rem; width:95%; display:block; margin:0 auto;">回复</van-button>
                </div>
                </div>
                 <div v-if="fileDetails.state!=2&&$route.params.zt!=1&&$route.params.type!=1">
                     <van-cell-group>
                        <div class="addBox">
                        <em>选择人员</em>
                        <div class="rightCon">
                            <div class="peolist"><span v-for="(a,index) in zpeoList" @click="dropPeo(index)" :key="index">{{a.userName}}</span></div>
                            <p>点击人员名称可删除</p>
                            <a class="appendPeo" @click="choPeo(1)">
                            <van-icon name="friends"/>选择领导
                            </a>
                            <span class="duanxin">
                            手机端短信提醒
                            <van-switch v-model="bumfMode" size="14px"/>
                            </span>
                        </div>
                        </div>
                        
                    </van-cell-group>
                </div>
            </div>
            <!-- 领导批示结束 -->

            <!-- 处室办理 -->
            <div v-if="fileDetails.state==3||fileDetails.state==0" class="detailsBox department">
                 <h4><span>处室办理</span></h4>
                 <ul class="departmentList">
                     <li v-for="(cs,indexn) in chishibanli" :key="indexn">
                        <span>{{cs.userName}}</span>
                        <span v-if="cs.look==0" style="color:#F30;">未读</span>
                        <span v-else>已读</span>
                        <span>{{cs.feedtime|newBeginDate}}</span>
                     </li>
                 </ul>
                 <div v-if="fileDetails.state==0&&$route.params.zt!=1&&$route.params.type!=1">
                     <van-cell-group>
                        <div class="addBox">
                        <em>选择人员</em>
                        <div class="rightCon">
                            <div class="peolist"><span v-for="(a,index) in zpeoList1" @click="dropPeo(index)" :key="index">{{a.userName}}</span></div>
                            <p>点击人员名称可删除</p>
                            <a class="appendPeo" @click="choPeo(2)">
                            <van-icon name="friends"/>选择处室
                            </a>
                            <span class="duanxin">
                            手机端短信提醒
                            <van-switch v-model="bumfMode1" size="14px"/>
                            </span>
                        </div>
                        </div>
                        
                    </van-cell-group>
                </div>

            </div>
            <!-- 处室办理结束 -->
            <div class="bts" v-if="fileDetails.state!=2&&$route.params.zt!=1&&$route.params.type!=1">
                <div class="selfBt">
                    <a class="doBt" @click="chuli">我已办理</a>
                    <a class="upBt"  @click="release">提交</a>
                </div>
                <!-- <van-button type="primary" @click="release" style="margin:10px auto; display:block; height:40px; line-height:40px; width:95%;">提交</van-button>
                <van-button @click="chuli" type="info" style="margin:10px auto; display:block; height:40px; line-height:40px; width:95%;">我已办理</van-button> -->
            </div>

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


        <van-popup v-model="layerShow" position="right">
      <div class="layerBox">
        <!-- <van-search
          v-model="searcgValue"
          placeholder="请输入搜索关键词"
          show-action
          shape="round"
          @search="onSearch"
        >
          <div slot="action" @click="onSearch">搜索</div>
        </van-search> -->
        <div class="layerBoxScroll">
          <van-collapse v-model="activeNames">
            <van-collapse-item
              :title="peo.deptName"
              :name="index++"
              v-for="(peo,index) in choPeoList"
              :key="index"
            >
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
        <van-button
          @click="validationScreening"
          hairline
          size="small"
          type="info"
          style="width:120px;"
        >确定</van-button>
      </div>
    </van-popup>

    </div>
</template>

<script>
export default {
    name:'gwdetailed',
    data() {
        return {
            searcgValue:'',
            message:'',
            songyuMes:'同意',                       //送阅意见
            songyuMes1:'已阅',
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
            songyueList:[],              //送阅意见列表
            lingdaopishi:[],            //领导批示
            chishibanli:[],             //处室办理
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
            },
            activeNames:[],
            layerShow:false,
            mks:1,                       //模块弹层操作选择
            caozuoStep:0,                   //操作步骤
            choPeoList: [],
            zpeoList: [],                 //暂存的人员列表(领导)
            zpeoList1:[],                   //暂存的人员列表(处室)
            bumfMode:false,                 //领导是否发送短信
            bumfMode1:false,                //处室是否发送短信
            zfujian: [],                  //暂存的附件列表
            dzList: []                   //暂时存放燕来的数据
            
        }
    },
    mounted() {
        console.log(this.$route.params.id);
        console.log(this.$route.params.type);
        console.log(this.$route.params.zt);
        this.loadxaingqing();
    },
    filters:{
        newBeginDate:function(mes){
            if(mes){
                let nr = mes.toString();
                let result = nr.replace("T"," ");
                result = result.substring(0,19);
                return result;
            }else{
                return mes;
            }
        },
        newFeedtime:function(mes){
            if(mes){
                let nr = mes.toString();
                let result = nr.replace("T"," ");
                result = result.substring(0,19);
                return result;
            }else{
                return mes;
            }
        }
    },
    methods:{
        // 搜索内容
        onSearch(){

        },
        // 设置高度
        setHeight(){
            let me = this;
            let layerHeight = window.getComputedStyle(me.$refs.layerHeight).height;
            let nHeight = parseInt(layerHeight)-100+"px";
            me.neiHeight = nHeight;
        },
        choPeo(mk) {
            this.layerShow = true;
            this.mks = mk;
            this.loadpeo();
            
            // this.loadpeoyuan();
            },
            xzPeo(wIndex,nIndex){
                let me = this;
                me.choPeoList[wIndex-1].userList[nIndex].ched =! me.choPeoList[wIndex-1].userList[nIndex].ched;
                console.log(me.choPeoList[wIndex-1].userList[nIndex].ched);
            },
            loadpeo() {
            let me = this;
            let url = '/api/user/select';
            let params={};
            me.$api.get(url,params,res=>{
                console.log("加载人员成功");
                console.log(res);
                let jieshou = [];
                jieshou = res.data;
                for(let n =0, lenn = jieshou.length; n<lenn; n++){
                    for(let m=0, lennn=jieshou[n].userList.length;m<lennn;m++){
                        jieshou[n].userList[m].ched=false;
                    }
                }
            me.choPeoList =jieshou;
            // console.log(me.choPeoList);
            });
            },
            validationScreening() {
                let me = this;
                let obg = JSON.stringify(me.choPeoList)
                obg = JSON.parse(obg);
                if(me.mks==1){
                    me.zpeoList=[];
                }else{
                    me.zpeoList1=[];
                }
                for(let i=0, peolen=obg.length;i<peolen;i++){
                    for(let j=0, peolenN=obg[i].userList.length;j<peolenN;j++){
                        if(obg[i].userList[j].ched == true){
                            if(me.mks==1){
                                me.zpeoList.push(obg[i].userList[j]);
                            }else{
                                me.zpeoList1.push(obg[i].userList[j]);
                            }
                        }
                    }
                }
                
                me.layerShow = false;
                },
                dropPeo(suoyin) {
                this.$dialog
                    .confirm({
                    title: "删除提示",
                    message: "您确定要删除已选拟办人" + this.zpeoList[suoyin].userName
                    })
                    .then(() => {
                    this.zpeoList.splice(suoyin, 1);
                    this.$toast.success({
                        duration: 1000,
                        message: "人员已删除"
                    });
                    })
                    .catch(() => {
                    this.$toast.fail({
                        duration: 1000,
                        message: "取消删除人员"
                    });
                    });
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
                me.caozuoStep = res.state

                for(let  p = 0; p < me.fujiaList.length; p++){
                    let fz = me.fujiaList[p].indexs;
                    if(fz==1){
                        me.songyueList.push(me.fujiaList[p]);
                        
                    }else if(fz==2){
                        me.lingdaopishi.push(me.fujiaList[p]);
                    }else{
                        me.chishibanli.push(me.fujiaList[p]);
                    }
                }
                let file = res.data.fjPath;
                let furl = res.pathBase;
                if(file==""||file==null||file==undefined){
                        me.fujianName=[];
                }else{
                    me.fujianName = file.split(",");
                    me.fujianName.splice(me.fujianName.length-1,1);
                    for(let f=0,fl = me.fujianName.length;f<fl;f++){
                            me.fujianURL.push(furl+"/"+me.fujianName[f]);
                    }
                    console.log(me.fujianURL);
                }
            })
        },
        //回复
        feedback(){
            let me = this;
            let url = '/api/Office/reply';
            let params = {};
        },
        // 送阅意见回复
        songyuSunmit(){
            let me = this;
            let url = '/api/Office/reply';
            let params = {autoID:me.$route.params.id,feedBackIdea:me.songyuMes,indexs:1};
            me.$api.post(url,params,res=>{
                console.log(res);
                if(res.code==200){
                    me.$router.push({
                        name: "gwnoticeListS"
                    });
                }else{
                    me.$toast(res.msg);
                }
            })
        },
        // 领导回复提交
        lingdaoSunmit(){
            let me = this;
            let url = '/api/Office/reply';
            let params = {autoID:me.$route.params.id,feedBackIdea:me.songyuMes1,indexs:2};
            
            me.$api.post(url,params,res=>{
                console.log(res);
                if(res.code==200){
                    me.$toast("回复成功");
                    me.$router.push({
                        name: "gwnoticeListS"
                    });
                }else{
                    me.$toast("回复失败");
                    return false;
                }
            })
        },
        // 提交领导和处室处理
        release(){
            let me = this;
            let lingdaoList = "";
            let chushiList = "";
            let lingdaoTel=0;
            let chushiTel=0;
            for(let n = 0 ; n< me.zpeoList.length; n++){
                lingdaoList += me.zpeoList[n].autoID + ",";
            }
            for(let m = 0 ; m< me.zpeoList1.length; m++){
                chushiList += me.zpeoList1[m].autoID + ",";
            }
            lingdaoList = lingdaoList.substring(0,lingdaoList.length-1);
            chushiList = chushiList.substring(0,chushiList.length-1);
            lingdaoTel = me.bumfMode == true ? 1 : 0;
            chushiTel = me.bumfMode1 == true ? 1 : 0;
            let url = '/api/Office/forward';
            let params = {autoID:me.$route.params.id,ldps:lingdaoList,ldpsMobile:lingdaoTel,csbl:chushiList,csblMobile:chushiTel};
            console.log(params);
            me.$api.post(url,params,res=>{
                console.log(res);
                if(res.code==200){
                    me.haveDone();
                    me.$router.push({
                        name: "gwnoticeListF"
                    });
                }else{
                    me.$toast(res.msg);
                }
            })
        },
        // 点击处理红点
        chuli(){
            this.haveDone();
        },
        // 我已处理
        haveDone(){
            let me = this;
            let param = {AutoID:me.$route.params.id};
            let url ='/api/Office/handle?'+me.$qs.stringify(param);
            let params={};
            me.$api.post(url,params,res=>{
                if(res.code==200){
                    me.$toast(res.msg)
                     me.$router.push({
                        name: "gwnoticeListS"
                    });
                }else{
                    me.$toast(res.msg)
                }
            })

        },
        // 下载文件
        downloadfile(files){
            var elemIF = document.createElement('iframe')
            elemIF.src = files;
            elemIF.style.display = 'none';
            document.body.appendChild(elemIF);
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
