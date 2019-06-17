<template>
    <div class="gwTop">
        <router-link active-class="on" :to="{name:'gwnoticeListS'}">收件箱</router-link>
        <router-link v-if="$store.state.gwAuthority==1" active-class="on" :to="{name:'gwnoticeListF'}">发件箱</router-link>
    </div>
</template>

<script>
export default {
    name:'gwTop',
    mounted() {
        // this.setheight();
    },
    methods: {
        // setheight(){
        //     let me = this;
        //     let topHeight = window.getComputedStyle(me.$refs.topheight).height;
        //     let nHeight = parseInt(topHeight);
        //     console.log(nHeight)
        //     this.$emit("jieshouHeight",nHeight)
        // }  
        
        
    }
}
</script>

<style>
</style>
