<template>
<div class="menuAll">
    <router-link to="/noticeList">通知列表</router-link>
    <router-link to="/gwnoticeList">公文列表</router-link>
    <router-link to="/leaveList">请假列表</router-link>
    
    </div>
</template>

<script>
export default {
    name:'menuAll'
}
</script>

<style lang="scss">
.menuAll{
    a{ display:block; background:#F30; color: #FFF; line-height: 40px; margin: 10px 10px 0; text-align:center;}
}
</style>
