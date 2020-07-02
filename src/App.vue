<template>
  <div id="app">
    <keep-alive>
      <router-view v-if='$route.meta.keepAlive'/>
    </keep-alive>
    <router-view  v-if='!$route.meta.keepAlive'/>
    <van-tabbar v-model="active" active-color="#07c160" inactive-color="#000" @change="onChange">
      <van-tabbar-item
        v-for="(item,index) in items"
        :key="index"
        :icon="item.icon"
      >{{item.itemName}}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import MainTabBar from "./components/content/MainTabBar";
export default {
  name: "App",
  data() {
    return {
      items: [
        {
          path: "/home",
          itemName: "首页",
          icon: "home-o",

        },
        {
          path: "/category",
          itemName: "机器翻译",
          icon: "search",

        },
        {
          path: "/cart",
          itemName: "智能写作",
          icon: "friends-o",

        },
        {
          path: "/profile",
          itemName: "加为好友",
          icon: "setting-o",
        }
      ],
      active: 0
    };
  },
  methods: {
    onChange(index) {
      this.active = index;
      this.$router.replace(this.items[index].path);
    }
  },
  components: {
    MainTabBar
  }
  
};
</script>

<style>
@import "assets/css/base.css";
</style>
