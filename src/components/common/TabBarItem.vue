<template>
  <div class="tab-bar-item" @click="chageItemPath" >
    <div v-if="!isActive">
      <slot name="icon-image"></slot>
    </div>
    <div v-else>
      <slot name="icon-image-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
    activeColor: {
      default: "red",
      type: String
    }
  },
  data() {
    return {};
  },
  methods: {
    chageItemPath(){
      this.$router.replace(this.path);
    }
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeStyle() {
      return this.isActive ? {color:this.activeColor}:{};
    }
  }
};
</script>
<style scoped>
.tab-bar-item {
  text-align: center;
  flex: 1;
  height: 49px;
  font-size: 14px;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 2px;
}
</style>