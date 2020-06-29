<template>
  <div
    id="main"
    ref="wrapper"
    style="overflow: auto; position: absolute; top: 0; bottom: 0; right: 0; left: 0;"
  >
    <van-search
      v-model="value"
      show-action
      placeholder="请输入搜索关键词"
      background="#4fc08d"
      shape="round"
      @search="onSearch"
    >
      <div slot="action" @click="onSearch">搜索</div>
    </van-search>
    <div id="saray">
      <p>行业薪金指数</p>
      <p id="docEngineer"></p>
      <p id="translate"></p>
    </div>
    <van-tabs active="active" @change="onChange">
      <van-tab title="推荐">
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
              <em>{{item.attr1}}</em>
            </div>
            <div slot="thumb">
              <van-image :src="item.imgsrc" width="100" height="100" />
            </div>
            <div slot="footer">{{item.date}}</div>
          </van-card>
        </van-list>
      </van-tab>
      <van-tab title="热点">热点</van-tab>
      <van-tab title="咖谈">咖谈</van-tab>
      <van-tab title="职位">职位</van-tab>
    </van-tabs>
  </div>
</template>
<script>
export default {
  name: "Home",
  data() {
    return {
      value: "",
      imgURL: "https://img.yzcdn.cn/vant/ipad.jpeg",
      article: [],
      nullTip: "空空如也~",
      pageSize: 10, // 每页条数
      pageIndex: 1, // 页码
      loading: false, // 上拉加载
      finished: false, // 上拉加载完毕
      offset: 100, // 滚动条与底部距离小于 offset 时触发load事件
      scroll: 0
    };
  },
  methods: {
    onSearch() {
      if (this.value == null) return;
      this.$axios
        .request({
          method: "get",
          url: "/api/article/search?key=" + this.value
        })
        .then(data => {
          console.log(data);
          this.article = data.data;
        });
    },
    toArticleDetail(article) {
      var scrollTop = this.$refs.wrapper.scrollTop;
      console.log(scrollTop);
      this.scroll =  scrollTop;

      window.localStorage.setItem("article", JSON.stringify(article));
      this.$router.push({
        path: "/toArticleDetail"
      });
    },
    // 上拉加载请求方法
    onLoadList() {
      this.pageIndex++;
      this.getArticleList();
    },
    onChange(name, title) {},
    onDownRefresh() {},
    getArticleList() {
      this.$axios
        .request({
          method: "get",
          url:
            "/api/article/getArticleList?pageSize=" +
            this.pageSize +
            "&pageIndex=" +
            this.pageIndex
        })
        .then(data => {
          this.article = this.article.concat(data.data);
          this.loading = false;
        });
    },
    getJobSaray() {
      this.$axios
        .request({
          method: "get",
          url: "/api/article/saray"
        })
        .then(data => {
          var job = data.data;
          var translateHtml = "翻译：";
          var docHtml = "文档工程师：";
          var increasePercentFlag = "";
          job.forEach(element => {
            if (element.increasePercent > 0)
              increasePercentFlag = "<b style='color:green'>&uarr;";
            else increasePercentFlag = "<b style='color:red'>&darr;";
            if (element.position == "英语翻译") {
              translateHtml =
                translateHtml +
                element.saray +
                "元/月&nbsp&nbsp&nbsp&nbsp" +
                increasePercentFlag +
                "&nbsp" +
                element.increasePercent.toFixed(2) +
                "%</b>";
            }
            if (element.position == "文档工程师") {
              docHtml =
                docHtml +
                element.saray +
                "元/月&nbsp&nbsp&nbsp&nbsp" +
                increasePercentFlag +
                "&nbsp" +
                element.increasePercent.toFixed(2) +
                "%</b>";
            }
          });
          var doc = document.getElementById("docEngineer");
          var translate = document.getElementById("translate");
          doc.innerHTML = docHtml;
          translate.innerHTML = translateHtml;
        });
    }
  },
  components: {},
  mounted() {
    this.getArticleList();
    this.getJobSaray();
  },
  activated() {
    console.log("首页被激活");
    this.$refs.wrapper.scrollTop = this.scroll;
    console.log(this.$refs.wrapper.scrollTop);
  },
  deactivated() {
    console.log("首页被缓存");
  },
  beforeRouteLeave(to, from, next) {
    //设置下一个路由的meta（即首页）
    // 让首页缓存，即不刷新
    next();
  }
};
</script>
<style>
#saray {
  text-align: center;
}
</style>

