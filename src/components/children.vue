<template>
    <div class="children">
        <h1>这里是儿子的内容</h1>
        <router-link to="/sunzi" :style="{fontSize:size+'px',color:yanse1,zitiyangshi,display:block}">to显示孙子的内容</router-link>
        <router-link :to="{name:'sunzi'}">:to显示孙子的内容</router-link>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name:'children',
    data() {
        return {
            size:18,
            yanse1:'#F00',
        }
    },
}
</script>

<style>

</style>
