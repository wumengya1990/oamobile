<template>
    <div class="children">
        <div style="display:block;  border:2px solid #F00; margin:20px 20px 0;">
        <h1>children组件的内容</h1>
        <h2>{{$route.params.id}}</h2>
        
        <router-link to="/sunzi" :style="{fontSize:size+'px',color:yanse1}">to显示孙子的内容</router-link>
        <!-- <router-link :to="{path:`/erzi/${userID}/sunzi`}" :style="yangshi">to显示孙子的内容</router-link> -->
        <router-link style="display:block;" :to="{name:'sunzi',params:{username:'张三'}}">:to显示孙子的内容使用name,params传参</router-link>
        <router-link style="display:block;" :to="{path:'/erzi/sunzi/sunzi',query:{username:'张三'}}">:to显示孙子的内容使用path，query传参</router-link>
        </div>
        <router-view></router-view>
        <!-- 嵌套路由 -->
    </div>
</template>

<script>
export default {
    name:'children',
    data() {
        return {
            userID:3321,
            size:18,
            yanse1:'#F00',
            yangshi:{
                display:'block',
                color:'green',
                fontSize:'26px'
            }
        }
    },
}
</script>

<style>

</style>
