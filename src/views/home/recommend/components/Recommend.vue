<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="我是有底线的"
      @load="onLoadList"
      :immediate-check="false"
    >
      <van-card @click="toNewsDetail(item)" v-bind:key="i" v-for="(item,i) in news">
        <div style="margin-left:30px" slot="title">
          <b>{{item.title}}</b>
        </div>
        <div style="margin-left:30px;margin-top:10px" slot="desc">
          <em>{{item.contentShort}}</em>
        </div>
        <div slot="thumb">
          <van-image :src="item.imgsrc==null?'https://goss.veer.com/creative/vcg/veer/800water/veer-153835898.jpg':item.imgsrc" width="100" height="100" />
        </div>
        <div slot="footer">{{item.date}}</div>
      </van-card>
    </van-list>
  </div>
</template>
<script>
export default {
  name: "Recommend",
  data() {
    return {
      news: [],
      pageSize: 10, // 每页条数
      pageIndex: 1, // 页码
      loading: false, // 上拉加载
      finished: false, // 上拉加载完毕
      offset: 100, // 滚动条与底部距离小于 offset 时触发load事件
      scroll: 0
    };
  },
  props: {
    searchResult: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    getNewsList() {
      this.$axios
        .request({
          method: "get",
          url:
            "/api/front/getNewsList?pageSize=" +
            this.pageSize +
            "&pageIndex=" +
            this.pageIndex
        })
        .then(data => {
          if (data.data.length < this.pageSize) {
            this.finished = true;
          }
          this.news = this.news.concat(data.data);
          this.loading = false;
        });
    },
    onLoadList() {
      this.pageIndex++;
      this.getNewsList();
    },
    toNewsDetail(news) {
      //window.localStorage.setItem("news", JSON.stringify(news));
      //this.$store.commit("setNewsHot",{id:news.id})
      news.attr1 = "推荐";
      this.$axios
        .request({
          method: "put",
          url: "/api/front/updateNewsHot",
          data: JSON.stringify(news),
          headers: { "Content-Type": "application/json" }
        })
        .then(res => {
          console.log(res);
        });
      this.$router.push({
        path: "/toNewsDetail",
        query:{
          newsId:news.id
        }
      });
    }
  },
  mounted() {
    this.getNewsList();
  },
  computed: {},
  watch: {
    //监听搜索值变化
    searchResult: {
      handler(newVal, oldVal) {
        this.news = this.searchResult;
      },
      deep: false
    }
  }
};
</script>