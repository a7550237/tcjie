<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="我是有底线的"
      @load="onLoadList"
      :immediate-check="false"
    >
      <van-card @click="toArticleDetail(item)" v-bind:key="i" v-for="(item,i) in article">
        <div style="margin-left:30px" slot="title">
          <b>{{item.title}}</b>
        </div>
        <div style="margin-left:30px;margin-top:10px" slot="desc">
          <em>{{item.contentShort}}</em>
        </div>
        <div slot="thumb">
          <van-image :src="item.imageUri" width="100" height="100" />
        </div>
        <div slot="footer">{{item.date}}</div>
      </van-card>
    </van-list>
  </div>
</template>
<script>
export default {
  name: "Talk",
  data() {
    return {
      article: [],
      pageSize: 10, // 每页条数
      pageIndex: 1, // 页码
      loading: false, // 上拉加载
      finished: false, // 上拉加载完毕
      offset: 100, // 滚动条与底部距离小于 offset 时触发load事件
      scroll: 0
    };
  },
  methods: {
    getArticleList() {
      this.$axios
        .request({
          method: "get",
          url:
            "/api/front/getArticleList?current=" +
            this.pageIndex +
            "&size=" +
            this.pageSize
        })
        .then(res => {
          if (res.data.length < this.pageSize) {
            this.finished = true;
          }
          this.article = this.article.concat(res.data);
          this.loading = false;
        });
    },
    onLoadList() {
      this.pageIndex++;
      this.getArticleList();
    },
    toArticleDetail(article) {
      window.localStorage.setItem("article", JSON.stringify(article));
      this.$router.push({
        path: "/toArticleDetail"
      });
    }
  },
  mounted() {
    this.getArticleList();
  }
};
</script>