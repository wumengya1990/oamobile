<template>
    <div class="detailed" ref="layerPageHeight">
        <!-- {{$route.params.id}} -->
        <div class="detailedContent">
            <div class="synopsis">
                <h3>{{$route.params.listType==0 ? fileDetails.title : outFileDetails.title}}</h3>
                <ul>
                    <li><em>通知类型：</em><div class="rightCon"><p><span :style="{color:outFileDetails.notice_Type=='会议通知'?'#F30':'#333'}">{{$route.params.listType==0 ? fileDetails.notice_Type : outFileDetails.notice_Type }}</span></p></div></li>
                    <li><em>发送人：</em><div class="rightCon"><p>{{$route.params.listType==0 ? fileDetails.userName : outFileDetails.userName }}</p></div></li>
                    <li><em>发送日期：</em><div class="rightCon"><p>{{$route.params.listType==0 ? fileDetails.beginDate : outFileDetails.beginDate|newBeginDate}}</p></div></li>
                    <li><em>通知详情：</em>
                        <div class="rightConNoOver">
                            <!-- <p>{{fileDetails.particulars}}</p> -->
                            <iframe :src="$route.params.listType==0 ? fileDetails.content : outFileDetails.content" frameborder="0" width="100%" height="100%" scrolling="auto"></iframe>
                        </div>
                    </li>
                    <li>
                        <div class="detailsState">
                            <van-button type="info" plain hairline size="small" v-if="$route.params.listType==1"><van-icon name="eye" />阅读情况{{readNumbeState.total - readNumbeState.unread}}/{{readNumbeState.total}}</van-button>
                            <van-button type="info" plain hairline size="small" v-if="$route.params.listType==1&&$route.params.mesType=='会议通知'" @click="submitDetails"><van-icon name="column" />查看报送情况</van-button>
                            <van-button type="info" plain hairline size="small" v-if="$route.params.listType==0&&$route.params.mesType==1" @click="openSBLayer"><van-icon name="column" />报送</van-button>
                        </div>
                    </li>
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
                                    <!-- <dt><a :href="fujianURL[index]" target="_blank" :download="fj"><i class="icon iconfont iconxiazai"></i></a></dt> -->
                                    <dt><a href="javascript:void(0)" @click="panduanImg(fj,fujianURL[index])"><i class="icon iconfont iconxiazai"></i></a></dt>
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
                    <ul v-if="$route.params.listType==1">
                        <li v-for="hf in replyList" :key="hf.autoID">
                            <div class="peo">{{hf.userName}}</div>
                            <div class="rightCon">
                                <div class="replyBoxMes">
                                    <div class="replyBoxMes_1">
                                    <p>{{hf.feedBackIdea}}</p>
                                    </div>
                                    <div class="fileBar" v-if="hf.path!=''">
                                        <span><i class="icon iconfont iconfujian"></i></span>
                                        <p>{{hf.path}}</p>
                                        <div class="clear"></div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div v-if="$route.params.listType==0">
                <van-cell-group>
                    <van-field v-model="backMessage" type="textarea" @focus="anzhuoSet" @blur="anzhuoSetN" placeholder="请输入回复内容"  rows="5" autosize />
                </van-cell-group>
                <div class="bts">
                    <van-button type="primary" style="height:40px; font-size:1.1rem; width:95%; display:block; margin:0 auto;" @click="huifu">回复</van-button>
                    </div>
                </div>
            </div>
        </div>

        <!-- 阅读查看弹层 -->
        <!-- <van-popup v-model="watchShow" position="right">
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
        </van-popup> -->
        <!-- 阅读查看弹层结束 -->

        <!-- 报送详情弹层 -->
        <van-popup v-model="submittedShow" position="right">
            <van-tabs swipeable>
                <van-tab title="参会人员信息">
                    <div class="layerBox">
                    <div class="stateBar">
                        <span>已报机构:{{submittedNum.leaveNum}}</span>
                        <span>未报机构:{{submittedNum.attendNum}}</span>
                    </div>
                    <div style="margin:10px 0 0; height:90%; overflow-y:auto;">
                    <table class="tableStyle"  width="100%" cellpadding="0" cellspacing="0">
                        <thead>
                        <tr><th width="35%">所属机构</th><th>姓名</th><th width="35%">职务</th></tr>
                        </thead>
                        <tr v-for="(a,index) in  submitted.attendList" :key="index">
                            <td>{{a.school_Guid}}</td>
                            <td>{{a.userName}}</td>
                            <td>{{a.post}}</td>
                        </tr>
                        <!-- <tbody v-for="a in submitted.attendList" :key="a.jigouID">
                            <tr v-for="(b,index) in a.peoList" :key="b.peoID">
                                <td v-if="index==0" :rowspan="a.peoList.length" align="center">{{a.jigou}}</td>
                                <td>{{b.peoName}}</td>
                                <td>{{b.zhiwu}}</td>
                            </tr>
                        </tbody> -->
                    </table>
                    </div>
                    </div>
                </van-tab>
                <van-tab title="请假人员信息">
                     <div class="layerBox">
                         <div style="margin:10px 0 0; height:90%; overflow-y:auto;">
                         <table class="tableStyle" style="margin:10px 0 0" width="100%" cellpadding="0" cellspacing="0">
                        <thead>
                        <tr><th width="35%">所属机构</th><th>姓名</th><th width="35%">职务</th></tr>
                        </thead>
                        <tr v-for="(a,index) in  submitted.leaveList" :key="index">
                            <td>{{a.school_Guid}}</td>
                            <td>{{a.userName}}</td>
                            <td>{{a.post}}</td>
                        </tr>
                        <!-- <tbody v-for="a in submitted.attendList" :key="a.jigouID">
                            <tr v-for="(b,index) in a.peoList" :key="b.peoID">
                                <td v-if="index==0" :rowspan="a.peoList.length" align="center">{{a.jigou}}</td>
                                <td>{{b.peoName}}</td>
                                <td>{{b.zhiwu}}</td>
                            </tr>
                        </tbody> -->
                    </table>
                         </div>
                     </div>
                </van-tab>
            </van-tabs>
            <div class="btss" style="text-align:center;padding:10px 0;">
                <van-button @click="submittedShow=false" hairline size="small" type="info" style="width:120px;">确定</van-button>
            </div>
        </van-popup>
        <!-- 报送详情弹层结束 -->

        <!-- 报送弹层 -->
        <van-popup v-model="shangbaoShow" position="right">
            <div class="remarksBox">
                <p><span style="color:#F30; padding:0 5px 0 0;">备注:</span>报送截止时间为<span style="color:#F30; padding:0 5px">{{fileDetails.sign_Up_EndTime|newsign_Up_EndTime}}</span>,在此时间点前可进行报送修改</p>
            </div>
            <van-collapse style="height:90%; overflow:hidden; overflow-y:auto;" v-model="activeNames">
                <van-collapse-item title="参会人员名单" icon="friends" name="1">
                     <table class="tableStyle" width="100%" cellpadding="0" cellspacing="0">
                         <thead>
                            <tr><th>姓名</th><th>职务</th><th>操作</th></tr>
                            <tr v-for="(p,index) in canhuiPeoList" :key="index">
                                <td>{{p.userName}}</td>
                                <td>{{p.post}}</td>
                                <td width="30%"><van-button size="mini" @click="dropPep(p.autoID,index)" type="danger">删除</van-button></td>
                            </tr>
                        </thead>
                     </table>
                    <van-button plain hairline @click="canhuiShow=true" style="display:block; margin:10px auto; width:90%" size="small" type="info">添加人员</van-button>
                </van-collapse-item>
                <van-collapse-item title="请假人员名单" icon="friends" name="2">
                    <table class="tableStyle" width="100%" cellpadding="0" cellspacing="0">
                         <thead>
                            <tr><th>姓名</th><th>职务</th><th>请假原因</th><th>操作</th></tr>
                            <tr v-for="(p,index) in qingjiaPeoList" :key="index">
                                <td>{{p.userName}}</td>
                                <td>{{p.post}}</td>
                                <td>{{p.reason}}</td>
                                <td width="30%"><van-button size="mini" @click="dropPep(p.autoID,index)" type="danger">删除</van-button></td>
                            </tr>
                        </thead>
                     </table>
                    <van-button plain hairline @click="qingjiaShow=true" style="display:block; margin:10px auto; width:90%" size="small" type="info">添加人员</van-button>
                </van-collapse-item>
            </van-collapse>
            <div class="bts">
                <van-button @click="shangbaoShow=false" hairline size="small" style="width:120px;">取消</van-button>
                <van-button @click="baosongSure" hairline size="small" type='info' style="width:120px;">确定</van-button>
            </div>
        </van-popup>
        <!-- 参会人员输入 -->
        <van-dialog v-model="canhuiShow" title="填写参会人员" :before-close="canhuiAdd" show-cancel-button >
            
            <van-cell-group style="padding:20px 0;">
                <van-field
                    v-model="luruRenyuan.username"
                    required
                    clearable
                    label="姓名"
                    placeholder="请输入参会人员姓名"
                />

                <van-field
                    v-model="luruRenyuan.userjob"
                    label="职务"
                    clearable
                    placeholder="请输入参会人员职务"
                    required
                />
            </van-cell-group>
            
        </van-dialog>
        <!-- 请假人员输入 -->
        <van-dialog v-model="qingjiaShow" title="填写请假人员" :before-close="qingjiaAdd" show-cancel-button >
            <van-cell-group van-cell-group style="padding:20px 0;">
            <van-field
                    v-model="luruRenyuan.username"
                    required
                    clearable
                    label="姓名"
                    placeholder="请输入参会人员姓名"
                />
                <van-field
                    v-model="luruRenyuan.userjob"
                    label="职务"
                    clearable
                    placeholder="请输入参会人员职务"
                    required
                />
                <van-field
                    v-model="luruRenyuan.yuanyin"
                    label="请假原因"
                    clearable
                    placeholder="请输入请假原因"
                    required
                />
            </van-cell-group>
        </van-dialog>
        
        <van-image-preview v-model="imgShow" :images="imgListC"></van-image-preview>

    </div>
</template>

<script>
// import{ImagePreview} from "vant";
export default {
    name:'detailed',
    // components:{ImagePreview},
    data() {
        return {
            imgShow:false,
            imgListC:[],
            canhuiShow:false,                   //参会人员弹层开关
            qingjiaShow:false,                  //请假人员弹层开关
            luruRenyuan:{                       //弹层添加人员输入内容
                username:'',
                userjob:'',
                yuanyin:''
            },
            readNumbeState:{
                total:0,
                unread:0
            },
            canhuiPeoList:[],                   //参会人员列表
            qingjiaPeoList:[],
            backMessage:'同意',                     //回复内容
            filePath:'',
            watchShow:false,                    //人员查看弹层
            submittedShow:false,                //提交情况弹层
            shangbaoShow:false,                 //上报弹层
            activeNames:["1","2"],                  //折叠层展开内容
            neiHeight:'',
            fileDetails:{},
            outFileDetails:{},
            fujianName:[],
            fujianURL:[],
            replyList:[],
            // readList:{                          //弹层阅读详情内容
            //     haveRead:[
            //         {peoName:'张三',peoID:'u0001'},
            //         {peoName:'李四',peoID:'u0002'},
            //         {peoName:'王五',peoID:'u0003'}
            //     ],
            //     unHaveRead:[
            //         {peoName:'赵六',peoID:'u0004'},
            //         {peoName:'孙琪',peoID:'u0005'},
            //         {peoName:'张弛',peoID:'u0006'}
            //     ]
            // },
            submittedNum:{              //查看报送详情已报机构和未报机构的数量
                attendNum:0,
                leaveNum:0,
            },
            submitted:{                 //参会情况弹层内容
                attendList:[],
                leaveList:[]
            }
        }
    },
    mounted() {
        console.log(this.$route.params.tzid);
        console.log(this.$route.params.listType);
        console.log(this.$route.params.mesType);
        this.setReadState();
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
        newsign_Up_EndTime:function(mes){
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
        setHeight(){
            let me = this;
            let layerHeight = window.getComputedStyle(me.$refs.layerHeight).height;
            let nHeight = parseInt(layerHeight)-100+"px";
            me.neiHeight = nHeight;
        },
        validationScreening(){
        },
        // 报送确定
        baosongSure(){
            let me = this;
            let param = { autoID:me.$route.params.tzid};
            let url = '/api/Notic/submit?'+me.$qs.stringify(param);
            let params = {};
            me.$api.post(url,params,res=>{
                console.log(res);
                if(res.code==200){
                    this.$toast("人员报送成功")
                    me.shangbaoShow=false;
                }
            })
        },
        // 设置阅读状态
        setReadState(){
            let me = this;
            let param = { autoid:me.$route.params.tzid};
            let url = '/api/Notic?'+me.$qs.stringify(param);
            let params={}
            me.$api.post(url,params,res=>{
                console.log(res);
            })
        },
        // 获取详情内容
        loadxaingqing(){
            let me = this;
            if(me.$route.params.listType==0){
                let url = '/api/Notic/indetail';
                let params = { autoid:me.$route.params.tzid};
                me.$api.get(url,params,res=>{
                    console.log(res);
                    me.fileDetails = res.data;
                    me.readNumbeState.total = res.count;
                    me.readNumbeState.unread = res.unread;
                    //me.replyList = res.replyList;
                    let file = res.data.fjPath;
                    let furl = res.data.pathBase;
                    if(file==""||file==null||file==undefined){
                         me.fujianName=[];
                    }else{
                        me.fujianName = file.split(",");
                        for(let f=0,fl = me.fujianName.length;f<fl;f++){
                            me.fujianURL.push(furl+"/"+me.fujianName[f]);
                        }
                        console.log(me.fujianURL);
                    }
                    // console.log(me.fujianName);
                })
            }else{
                let url = '/api/Notic/outdetial';
                let params = { autoid:me.$route.params.tzid};
                me.$api.get(url,params,res=>{
                    console.log(res);
                    me.outFileDetails = res.data;
                    me.replyList = res.replyList;
                    me.readNumbeState.total = res.count;
                    me.readNumbeState.unread = res.unread;
                    //me.replyList = res.replyList;
                    let file = me.outFileDetails.fjPath;
                    let furl = res.data.pathBase;
                    if(file==""||file==null||file==undefined){
                         me.fujianName=[];
                    }else{
                        me.fujianName = file.split(",");
                        for(let f=0,fl = me.fujianName.length;f<fl;f++){
                             me.fujianURL.push(furl+"/"+me.fujianName[f]);
                        }
                        console.log(me.fujianURL);

                    }
                    // console.log(me.fujianName);
                })
            }
        },
        //详情回复内容
        huifu(){
            let me = this;
            let url = '/api/Notic/reply';
            let params = {autoID:me.$route.params.tzid,path:me.filePath,feedBackIdea:me.backMessage};
            
            me.$api.post(url,params,res=>{
                console.log(res);
                me.backMessage="同意";
                if(res.code==200){
                    me.$toast(res.msg);
                    me.$router.push({
                        name:'tzMain'
                    })
                }else{
                    me.$toast(res.msg)
                }
            })
        },
        // 上报详情查看
        submitDetails(){
            this.submittedShow=true;
            this.loadSubmitDetails();
        },
        // 加载上报详情查看
        loadSubmitDetails(){
            let me = this;
            let url = '/api/Notic/reportview';
            let params = {autoID:me.$route.params.tzid};
            me.submitted.attendList=[];
            me.submitted.leaveList=[];
            me.$api.get(url,params,res=>{
                console.log("加载上报详情查看");
                console.log(res);
                me.submittedNum.attendNum = res.data.leLen;
                me.submittedNum.leaveNum = res.data.upLen;
                let xqList = new Array();
                xqList = res.data.list;
                for(let x=0,xqlen = xqList.length;x<xqlen;x++){
                    if(xqList[x].s_Type==0||xqList[x].s_Type==null){
                        me.submitted.attendList.push(xqList[x]);
                    }else{
                        me.submitted.leaveList.push(xqList[x]);
                    }
                }
                console.log(me.submitted);
            })
        },
        zhenghe(){
            let Crenyuan = new Array();
            let Arenyuan = new Array();
        },
        // 打开上报人员弹层加载上报详情
        openSBLayer(){
            this.shangbaoShow = true;
            this.loadPeo();
        },
        //加载上报人员列表
        loadPeo(){
            let me = this;
            let url = '/api/Notic/upsign';
            let params = {autoID:me.$route.params.tzid};
            me.qingjiaPeoList=[];
            me.canhuiPeoList=[];
            me.$api.get(url,params,res=>{
                let renyuanList = res.data;
                console.log(renyuanList);
                for( let i=0,lenp=renyuanList.length;i<lenp;i++){
                    if(renyuanList[i].s_Type == 1){
                        me.qingjiaPeoList.push(renyuanList[i]);
                    }else{
                        me.canhuiPeoList.push(renyuanList[i]);
                    }
                }
                // me.canhuiPeoList=res.data.list;
            })
        },
        // 删除参与人员 
        dropPep(uid,suoyin){
            let me = this;
            let pm = {autoID:uid};
            let canshu = me.$qs.stringify(pm)
            let url = '/api/Notic/reportdel?'+canshu;
            let params = '';
            me.$api.post(url,params,res=>{
                console.log(res);
                if(res.code==200){
                    me.loadPeo();
                }
            })
        },
        //添加参会人员
        canhuiAdd(action,done){
            let me = this;
            if( action === 'confirm'){
                if(!me.luruRenyuan.username||!me.luruRenyuan.userjob){
                    me.$toast("请输入姓名,职务,请假原因")
                    done(false);
                }else{
                    let url='/api/Notic/report';
                    let params = {pAutoID:me.$route.params.tzid,userName:me.luruRenyuan.username,post:me.luruRenyuan.userjob,s_Type:0};
                    me.$api.post(url,params,res=>{
                        console.log(res);
                        if(res.code==200){
                            me.$toast("添加参会人员成功!");
                            me.loadPeo();
                            // let newobg = {}
                            // newobg.username = me.luruRenyuan.username;
                            // newobg.userjob = me.luruRenyuan.userjob;
                            // newobg.autoID = res.autoID;
                            // me.qingjiaPeoList.push(newobg);
                            me.luruRenyuan.username='';
                            me.luruRenyuan.userjob='';
                            // console.log(me.canhuiPeoList);
                            done(true);
                        }else{
                             me.$toast(res.msg);
                             me.luruRenyuan.username="";
                             me.luruRenyuan.userjob="";
                             done(false);
                        }
                    })
                }
            }else{
                done(true);
            }
        },
        // 添加请假人员
        qingjiaAdd(action,done){
            let me = this;
            if( action === 'confirm'){
                if(!me.luruRenyuan.username||!me.luruRenyuan.userjob||!me.luruRenyuan.yuanyin){
                    me.$toast("请输入姓名,职务,请假原因")
                    done(false);
                }else{
                    let url='/api/Notic/report';
                    let params = {pAutoID:me.$route.params.tzid,userName:me.luruRenyuan.username,post:me.luruRenyuan.userjob,s_Type:1,reason:me.luruRenyuan.yuanyin};
                    me.$api.post(url,params,res=>{
                        console.log(res);
                        if(res.code==200){
                            me.$toast("添加请假人员成功!")
                            me.loadPeo();
                            // let newobg = {}
                            // newobg.username = me.luruRenyuan.username;
                            // newobg.userjob = me.luruRenyuan.userjob;
                            // newobg.autoID = res.autoID;
                            // newobg.yuanyin = me.luruRenyuan.yuanyin;
                            // me.qingjiaPeoList.push(newobg);
                            me.luruRenyuan.username='';
                            me.luruRenyuan.userjob='';
                            me.luruRenyuan.yuanyin='';
                            console.log(me.canhuiPeoList);
                            done(true);
                        }else{
                             me.$toast(res.msg)
                             me.luruRenyuan.username="";
                             me.luruRenyuan.userjob="";
                             me.luruRenyuan.yuanyin="";
                             done(false);
                        }
                    })
                }
            }else{
                done(true);
            }
        },
        // 下载文件
        downloadfile(files){
            var elemIF = document.createElement('iframe')
            elemIF.src = files;
            elemIF.style.display = 'none';
            document.body.appendChild(elemIF);
        },
        //输入框怎么的
        anzhuoSet(){
            var u = navigator.userAgent;
            if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {//安卓手机
                let resBox =  document.getElementsByClassName("replyBox")[0];
                let zhanwei = document.createElement('div');
                zhanwei.className = "zhanweibox";
                zhanwei.style.height = 400+"px";
                resBox.appendChild(zhanwei);
            }     
        },
        anzhuoSetN(){
            var u = navigator.userAgent;
             if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
                let resBox =  document.getElementsByClassName("replyBox")[0];
                let zhanwei = document.getElementsByClassName('zhanweibox')[0];
                resBox.removeChild(zhanwei);
             }
           
        },
        //判断图片
        panduanImg(imgName,imgUrl){
            let iml = new Array();
            iml.push(imgUrl)
            let extStart = imgName.lastIndexOf(".");
            let ext = imgName.substring(extStart,imgName.length).toUpperCase();
            if(ext==".BMP"||ext==".PNG"||ext==".GIF"||ext==".JPG"||ext==".JPEG"){
                // ImagePreview(iml);
                this.imgShow = true;
                this.imgListC=iml;
            }else{
                window.open(imgUrl,"_blank");
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
.van-collapse-item__content{
    padding:0;
}
</style>
