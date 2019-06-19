<template>
    <div class="login">
        <div class="loginM">
            <h3>徐州市教育局OA系统</h3>
            <el-form :model="loginForm" status-icon :rules="loginRule" ref="loginForm" label-width="100px" label-position="top" class="demo-ruleForm">
                <el-form-item label="用户名" prop="username">
                    <el-input type="text" v-model="loginForm.username" auto-complete="off" clearable></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="username">
                    <el-input type="password" v-model="loginForm.pwd" auto-complete="off" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm" style="width:100%">登录</el-button>
                </el-form-item>
            </el-form>
            
        </div>
    </div>
</template>

<script>
export default {
name:'login',
data() {
    var validatePass = (rule, value, callback) => {
        if (value === '') {
        callback(new Error('用户名'));
        } else {
        if (this.loginForm.useName !== '') {
            this.$refs.loginForm.validateField('useName');
        }
        callback();
        }
    };
    return {
        
        loginForm:{
            username:'',
            pwd:'',
            uId:this.$route.params.uid
        },
        loginRule:{
            username:[
                {required:true,message:'请输入用户名',trigger:'blur'}
            ],
            pwd:[
                {required:true,message:'请输入密码',trigger:'blur'}
            ]
        }
    }
},
methods: {
    submitForm(){
        let me = this;
        let url='/api/user/login';
        if(!me.loginForm.username||!me.loginForm.pwd){
            me.$toast("请完善登录信息")
            return false;
        }else{
            me.$api.get(url,me.loginForm,res=>{
                console.log(res);
                if(res.code==200){
                    me.$store.commit("saveToken", res.token);      //保存 token
                    me.$store.commit("saveLogin", true);           //保存登录状态
                    me.$store.commit("saveUid", res.data.autoID);
                    me.$store.commit("saveUserName", res.data.userName);
                    me.getAuthority();
                    me.getPeoSet();
                    me.$router.push({
                        name:'menuAll',
                        params:{
                            uid:res.data.autoID
                        }
                    }) 
                }else{
                   me.$toast(res.msg);
                }
            })
        }
        
    },
    getAuthority(){
        let me = this;
        let url='/api/user/author';
        let params="";
        me.$api.get(url,params,res=>{
            // console.log(res);
            if(res.code==200){
                me.$store.commit("saveTZauthority", res.data.bumf_Droit);      //保存 token
                me.$store.commit("saveGWauthority", res.data.bumflz_Droit);           //保存登录状态
                me.$store.commit("saveQJauthority", res.data.leave);
            }
        })
    },
    getPeoSet(){
        let me = this;
        let url='/api/user/config';
        let params=""
        me.$api.get(url,params,res=>{
            if(res.code==200){
                me.$store.commit("saveGWniban", res.data.default_Enlisted_Person);
            }
        })
    }
}
}
</script>

<style>

</style>
