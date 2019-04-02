<template>
    <div class="father">
       <router-link :to="{path:`/erzi/1`}">嵌套内部向儿子跳转</router-link>
       <span style="display:block;" @click="dqid(id)">嵌套内部向儿子跳转2</span>
    </div>
</template>

<script>
export default {
    name:'father',
    data () {
        return {
            message:"你好吗?",
            id:3301
        }
    },
    methods:{
        dqid(nr){
            this.$router.push({
                path: `/erzi/${nr}`,
            })
        }
    }
}
</script>

<style>

</style>
