<template>
  <div class="gwaddnew bgMain posA posCenter">
    <div class="addForm">
      <van-cell-group>
        <van-field v-model="gongwen.title" type="text" label="公文标题" @blur="kjiance('公文标题',gongwen.title)" placeholder="请输入公文标题" required/>
        <van-field
          v-model="gongwen.bumfcode"
          type="text"
          label="文件编号"
          placeholder="请输入文件编码"
        />
        <van-field
          v-model="gongwen.bumftop"
          type="text"
          label="内部文号"
          placeholder="请输入内部文号"
          
        />
        <van-field
          v-model="gongwen.contentDetail"
          type="textarea"
          label="公文内容"
          @blur="kjiance('公文内容',gongwen.contentDetail)"
          rows="5"
          placeholder="请输入公文内容"
          autosize
          required
        />
      </van-cell-group>

      <van-cell-group>
        <div class="addBox">
          <em>拟办人</em>
          <div class="rightCon">
            <div class="peolist"><span v-for="(a,index) in zpeoList" @click="dropPeo(index)" :key="index">{{a.userName}}</span></div>
            <p>点击人员名称可删除</p>
            <a class="appendPeo" @click="choPeo">
              <van-icon name="friends"/>添加拟办人
            </a>
            <span class="duanxin">
              手机端短信提醒
              <van-switch v-model="gongwen.bumfMode" size="14px"/>
            </span>
          </div>
        </div>
        <div class="addBox">
          <em>上传附件</em>
          <div class="rightCon">
            <div class="fileAdd">
              <label class="upButton">
                <input @change="readyFile($event)" type="file">
                <van-icon name="send-gift-o"/>选择上传文件
              </label>
              <ul class="fileList">
                <li v-for="(a,index) in zfujian" :key="index">
                  <van-button size="mini" @click="dropFile(index)" round type="danger">
                    <van-icon name="delete"/>
                  </van-button>
                  <span>{{a.fileName}}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="bts">
          <van-button type="primary" @click="release" size="large">提交</van-button>
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
const cityOptions = ["上海", "北京", "广州", "深圳"];
export default {
  name: "gwaddnew",
  data() {
    return {
      activeNames: [],
      searcgValue: "",
      layerShow: false,
      result3: [],
      list: ["a", "b", "c"],
      checkAll: false,
      checkedCities: [],
      cities: cityOptions,
      isIndeterminate: true,
      choPeoList: [],
      zpeoList: [],                 //暂存的人员列表
      zfujian: [],                  //暂存的附件列表
      dzList: [],                   //暂时存放燕来的数据
      gongwen: {
        title: "",
        bumfcode: "",
        bumftop: "",
        content: "",
        contentDetail:"",
        bumfMode: false,
        sendPro: 0,
        fjPath: ""
      }
    };
  },
  mounted(){
    this.getdefaulePeo();
  },
  methods: {
    choPeo() {
      this.layerShow = true;
      this.loadpeo();
      
      // this.loadpeoyuan();
    },
    xzPeo(wIndex,nIndex){
        let me = this;
        me.choPeoList[wIndex-1].userList[nIndex].ched =! me.choPeoList[wIndex-1].userList[nIndex].ched;
        console.log(me.choPeoList[wIndex-1].userList[nIndex].ched);
    },
    // 加载人员
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
    // 默认拟办人
    getdefaulePeo(){
      let peomes = this.$store.state.gwNibanren;
      let obg = new Object();
      let arr = new Array();
      arr = peomes.split(",");
      obg.autoID = arr[0];
      obg.userName = arr[1];
      obg.ched = true;
      this.zpeoList.push(obg);
      console.log(this.zpeoList);
    },
    // 提交选择拟办人
    validationScreening() {
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
          me.$toast("只能选择一个拟办人");
          me.zpeoList=[];
      }else{
          console.log(me.zpeoList);
          me.layerShow = false;
      }
    },
    onSearch() {
      this.$toast(this.searcgValue);
    },
    toggle(index) {
      this.$refs.checkboxes[index].toggle();
    },
    // 删除拟办人员
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
    // 上传图片准备
    readyFile(event) {
      let forms = new FormData();
      let me = this;
      let url = "/api/Upload";
      forms.append("file", event.target.files[0]);
      me.$api.uploadFile(url, forms, res => {
        if (res.code == 200) {
          let filed = {};
          filed.fileName = res.fileName;
          filed.url = res.url;
          me.zfujian.push(filed);
        }
      });
    },
    // 删除附件
    dropFile(suoyin) {
      this.gongwen.fileList.splice(suoyin, 1);
    },
    // 内容验证
    kjiance(timu,mes){
      if(!mes){
        this.$toast(timu+"不能为空");
      }
    },
    // 提交创建公文
    release() {
      let me = this;
      for (let z = 0; z < me.zfujian.length; z++) {
        me.gongwen.fjPath += me.zfujian[z].fileName + ",";
      }
      let obg = JSON.stringify(me.gongwen);
      obg = JSON.parse(obg);
      obg.bumfMode = obg.bumfMode ? 1 : 0;
      obg.sendPro = me.zpeoList[0].autoID;
      console.log(obg);
      if(!obg.title||!obg.contentDetail||!obg.sendPro){
         me.$toast("请完善必填选项");
         return false;
      }else{
      let url = "/api/Office";
      let params = obg;
      me.$api.post(url, params, res => {
      console.log(res);
        if (res.code == 200) {
          me.$router.push({
            name: "gwnoticeListS"
          });
        } else {
          me.$toast(res.msg);
        }
      });
      }
    }
  }
};
</script>

<style lang="scss">
.van-popup {
  box-sizing: border-box;
  padding: 10px;
  &--right {
    width: 80%;
    height: 100%;
    .bts {
      position: absolute;
      left: 0;
      top: auto;
      right: 0;
      bottom: 0;
      text-align: center;
      padding: 10px 0;
    }
  }
}

.van-collapse-item__content {
  padding: 0 10px;
}
</style>
