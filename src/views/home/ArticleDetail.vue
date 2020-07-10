<template>
  <div>
    <sticky>
      <van-nav-bar
        :sticky="true"
        title
        left-text="返回"
        right-text
        left-arrow
        @click-left="onClickLeft"
      >
        <van-button
          icon="star-o"
          @click="onClick"
          round
          style="width:80px;height:30px;font-size: 10px;"
          slot="right"
        >分享</van-button>
      </van-nav-bar>
    </sticky>
    <van-panel>
      <div style="text-align: center;" class="article-title">
        <h1>{{article.title}}</h1>
      </div>
      <div class="article-thumb">
        <van-image width="400" height="200" :src="article.imageUri" />
      </div>
      <div class="article-content" v-html="article.htmlContent"></div>
    </van-panel>
    <van-dialog
        use-slot
        title="分享"
        v-model="show"
        show-cancel-button
        :close-on-click-overlay="true"
      >
      <div style="text-align: center;">
        <img src="../../../src/assets/image/default.jpg" width="150px" height="150px">
        <share :config="config" style="margin-top: 30px;"></share>
      </div>
      
  </van-dialog>
  </div>
</template>
<script>
import sticky from "../../components/Sticky";
export default {
  name: "ArticleDetail",
  components: {
    sticky
  },
  data() {
    return {
      article: {},
      show:false
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    getArticleInfo() {
      this.$axios
        .request({
          method: "get",
          url:
            "/api/front/getArticleById?articleId=" + this.$route.query.articleId
        })
        .then(res => {
          this.article = res.data;
        });
    },
    onClick(){
      this.show = !this.show;
    }
  },
  mounted() {
    this.getArticleInfo();
  },
  computed:{
    config(){
      return {
        url:window.location.href,
        source:"TCJie",
        title:this.article.title,
        image:this.article.imgsrc,
        description:this.article.contentShort,
        sites: ['qzone', 'qq', 'weibo','wechat', 'douban','linkedin'] // 启用的站点
      }
    }
  }
};
</script>
<style>
div.article-thumb {
  text-align: center;
}
div.article-content {
  margin-left: 50px;
  margin-right: 50px;
}
div.article-title {
  margin-left: 20px;
  margin-right: 20px;
}
div.green {
  background: chartreuse;
}
</style>