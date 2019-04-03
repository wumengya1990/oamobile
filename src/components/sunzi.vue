<template>
<div class="sunzi">
    <div style="border:2px solid #0a7b01; margin:20px 20px 0;">
     <h1>这里是sunzi的内容</h1>
     <h2>传来的内容:{{$route.params.username}}</h2>
      <h2>传来的内容:{{$route.query.username}}</h2>
     </div>
     </div>
</template>

<script>
export default {
    name:'sunzi'
}
</script>

<style>

</style>
