<template>
    <div class="enterDetailed">
        处理中
    </div>
</template>

<script>
export default {
    name:'enterDetailed',
    data() {
        return {
            
        }
    },
    mounted() {
        
    },
    methods: {
        //是否请求用户登录
        getQueryString: function(name) {
            let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            let r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        }
    }
}
</script>

<style>

</style>
