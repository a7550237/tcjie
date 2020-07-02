<template>
  <div>
    <van-nav-bar
      title=""
      left-text="返回"
      right-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <van-panel>
      <div style="text-align: center;" class="news-title">
        <h1>{{news.title}}</h1>
      </div>
      <div class="news-thumb">
        <van-image width="400" height="200" :src="news.imgsrc" />
      </div>
      <div class="news-content" v-html="news.content"></div>
    </van-panel>
  </div>
</template>
<script>
export default {
  name: "NewsDetail",
  data() {
    return {
      news: JSON.parse(window.localStorage.getItem("news"))
    };
  },
  methods: {
    onClickLeft(){
      this.$router.go(-1);
    }
  }
};
</script>
<style >
div.news-thumb {
  text-align: center;
}
div.news-content {
  margin-left: 50px;
  margin-right: 50px;
}
div.news-title {
  margin-left: 20px;
  margin-right: 20px;
}
div.green {
  background: chartreuse;
}
</style>