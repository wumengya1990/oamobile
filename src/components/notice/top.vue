<template>
    <div class="gwTop">
        <router-link active-class="on" :to="{name:'tznoticeListS'}">收件箱</router-link>
        <router-link v-if="$store.state.tzAuthority==1" active-class="on" :to="{name:'tznoticeListF'}">发件箱</router-link>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
