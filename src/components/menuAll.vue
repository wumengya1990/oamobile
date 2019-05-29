<template>
<div class="menuAll">
    <!-- <router-link v-if="$store.state.tzAuthority==1" to="/noticeList">
    <em><i class="icon iconfont icontongzhi1"></i></em>
    <span>通知列表</span>
    </router-link> -->
    <router-link v-if="$store.state.tzAuthority==1" to="/tzMain">
    <em><i class="icon iconfont icontongzhi1"></i></em>
    <span>通知列表</span>
    </router-link>
    <router-link v-if="$store.state.gwAuthority==1" to="/gwMain">
    <em><i class="icon iconfont iconai-briefcase"></i></em>
    <span>公文列表</span>
    </router-link>
    <router-link v-if="$store.state.qjAuthority==1" to="/leaveList">
    <em><i class="icon iconfont iconZ"></i></em>
    <span>请假列表</span>
    </router-link>
    </div>
</template>

<script>
export default {
    name:'menuAll',
    mounted() {
    },
    methods: {
        
    },
}
</script>

<style lang="scss">
.menuAll{
    display: flex; flex-wrap: wrap; width:100%;
    a{ 
        flex: 1; width:25%; max-width: 25%; min-width: 25%; text-align:center; text-decoration: none; 
        em{ 
            padding:5px 0; display: block;
            i{display: block; font-size:40px; color:#1f8bff;}
        }
        span{ font-size: 12px;}
    }
}
</style>
