<template>
  <div>user
    <p>{{userId}}</p>
    <p>{{$route.params.aaa}}</p>
  </div>
</template>

<script>
export default {
  name:'User',
  computed:{
    userId(){
      return this.$route.params.aaa;
    }
  }
}
</script>
<style scoped>

</style>