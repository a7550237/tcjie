<template>
  <div id="app">
    <router-link to="/home">首页</router-link>
    <button @click="toAbout">关于</button>
    <router-link :to="'/user'+userId">用户</router-link>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      userId: "/zhangsan"
    };
  },
  methods: {
    return: {
      toAbout() {
        this.$router.push("/about");
      }
    }
  },
  components: {}
};
</script>

<style>
@import "assets/css/base.css";
</style>
