<template>
  <div>
    <van-panel>
      <div style="text-align: center;" class="article-title">
        <h1>{{article.title}}</h1>
      </div>
      <div class="article-thumb">
        <van-image width="400"  height="200"  :src="article.imgsrc" />
      </div>
      <div class="article-content" v-html="article.content"></div>
    </van-panel>
  </div>
</template>
<script>
export default {
  name: "ArticleDetail",
  data() {
    return {
      article: JSON.parse(window.localStorage.getItem("article"))
    };
  },
  methods:{
      
  },
};
</script>
<style >
div.article-thumb {
  text-align: center;
}
div.article-content {
  margin-left: 50px;
  margin-right: 50px;
}
div.article-title{
  margin-left: 20px;
  margin-right: 20px;    
}
div.green{
    background: chartreuse;
}
</style>