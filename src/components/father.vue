<template>
    <div class="father">
       <router-link to="/erzi">嵌套内部向儿子跳转</router-link>
      
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
