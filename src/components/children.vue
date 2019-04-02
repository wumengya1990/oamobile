<template>
    <div class="children">
        <h1>这里是另外一个组件的内容</h1>
        <h2>{{$route.params.id}}</h2>
        <router-link to="/sunzi" :style="{fontSize:size+'px',color:yanse1,zitiyangshi,display:block}">to显示孙子的内容</router-link>
        <router-link to="/erzi/sunzi" :style="yangshi">to显示孙子的内容</router-link>
        <router-link :to="{name:'sunzi'}">:to显示孙子的内容</router-link>
        <router-view></router-view>
        <!-- 嵌套路由 -->
    </div>
</template>

<script>
export default {
    name:'children',
    data() {
        return {
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
