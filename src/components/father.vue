<template>
    <div class="father">
       <button @click="chuangshuju(message)">向子组件传递信息</button>
    </div>
</template>

<script>
export default {
    name:'father',
    data () {
        return {
            message:"你好吗?"
        }
    },
    methods:{
        chuangshuju:function(cdxx){
             this.$router.push({
                name: 'children',
                params: {
                    cdxx:cdxx
                }
                })
        }
    }
}
</script>

<style>

</style>
