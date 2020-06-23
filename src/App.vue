<template>
  <div id="app">
    <router-view />
    <MainTabBar :items="items"></MainTabBar>
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
          imgUrl: require("./assets/image/home.svg"),
          activeImgUrl: require("./assets/image/home_active.svg")
        },
        {
          path: "/category",
          itemName: "种类",
          imgUrl: require("./assets/image/category.svg"),
          activeImgUrl: require("./assets/image/category_active.svg")
        },
        {
          path: "/cart",
          itemName: "购物车",
          imgUrl: require("./assets/image/shopcart.svg"),
          activeImgUrl: require("./assets/image/shopcart_active.svg")
        },
        {
          path: "/profile",
          itemName: "设置",
          imgUrl: require("./assets/image/profile.svg"),
          activeImgUrl: require("./assets/image/profile_active.svg")
        }
      ],
      key:""
    };
  },
  methods: {
    onClick(){
      alert(this.key);
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
