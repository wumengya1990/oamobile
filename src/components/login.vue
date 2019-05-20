<template>
    <div class="login">
        <div class="loginM">
            <h3>徐州市教育局OA系统</h3>
            <el-form :model="loginForm" status-icon :rules="loginRule" ref="loginForm" label-width="100px" label-position="top" class="demo-ruleForm">
                <el-form-item label="用户名" prop="useName">
                    <el-input type="text" v-model="loginForm.useName" auto-complete="off" clearable></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="usePwd">
                    <el-input type="password" v-model="loginForm.usePwd" auto-complete="off" clearable></el-input>
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
            useName:'',
            usePwd:'',
            
        },
        loginRule:{
            useName:[
                {required:true,message:'请输入用户名',trigger:'blur'}
            ],
            usePwd:[
                {required:true,message:'请输入密码',trigger:'blur'}
            ]
        }
    }
},
methods: {
    submitForm(){
        let me = this;
        me.$router.push({
            name:'menuAll'
        })
        let url='';
        let prmair={}
        me.$api.get(url,prmair,res=>{
            console.log(res);
        })
    }
}
}
</script>

<style>

</style>
