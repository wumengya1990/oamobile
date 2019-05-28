<template>
    <div class="gwMian">
        <!-- <gwTop v-on:jieshouHeight="fromChildHeight"></gwTop>
        <div class="gwBody" :style="{top:bodyHeight}"> -->
        <router-view></router-view>
        <!-- </div> -->
    </div>
</template>

<script>
// import top from './top'
export default {
    name:'gwMian',
    // components:{
    //     'gwTop':top
    // },
    data() {
        return {
            // bodyHeight:''
        }
    },
    methods: {
        // 获取从TOP子组件传过来的高度
        // fromChildHeight(data){
        //     this.bodyHeight=data+'px';
        // }
    },
}
</script>

<style>
/* .gwBody{ position: absolute; left: 0; top: 0; right: 0; bottom:0; margin: auto;} */
</style>
