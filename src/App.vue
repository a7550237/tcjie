<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
    <van-tabbar v-model="active" active-color="#07c160" inactive-color="#000" @change="onChange">
      <van-tabbar-item
        v-for="(item,index) in items"
        :key="index"
        :icon="item.icon"
      >{{item.menuName}}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import MainTabBar from "./components/content/MainTabBar";
export default {
  name: "App",
  data() {
    return {
      items: [],
      active: 0
    };
  },
  methods: {
    onChange(index) {
      this.active = index;
      this.$router.push({
        path: this.items[index].menuPath,
        query: {
          parentId: this.items[index].id
        }
      });
    },
    initMenuList() {
      this.$axios
        .request({
          method: "get",
          url: "/api/front/getMenuList?parentId="
        })
        .then(res => {
          this.items = res.data;
          console.log(this.items);
          this.$router.push({
            path: this.items[0].menuPath,
            query: {
              parentId: this.items[0].id
            }
          });
        });
    }
  },
  components: {
    MainTabBar
  },
  mounted() {
    this.initMenuList();
  }
};
</script>

<style>
@import "assets/css/base.css";
</style>
