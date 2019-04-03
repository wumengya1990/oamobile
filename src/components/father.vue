<template>
    <div class="father">
        <router-link style="display:block;" :to="{path:`/erzi/1`}">声明式导航，向子组件传送ID</router-link>
       <router-link style="display:block;" :to="{path:`/erzi/${id}`}">声明式导航，向子组件传送ID</router-link>
       <span style="display:block;" @click="dqid(id)">编程式路由，向子组件传送ID</span>
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
