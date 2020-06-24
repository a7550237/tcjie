<template>
  <div id="main" style="overflow: auto; position: absolute; top: 0; bottom: 0; right: 0; left: 0;">
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
  </div>
</template>
<script>
export default {
  name: "Home",
  data() {
    return {
      value: "",
      imgURL: "https://img.yzcdn.cn/vant/ipad.jpeg",
      article: Array
    };
  },
  methods: {
    onSearch() {
      console.log(this.value);
    },
    toArticleDetail(article) {
      window.localStorage.setItem("article", JSON.stringify(article));
      this.$router.push({
        path: "/toArticleDetail",
        params: {
          myarticle: article
        }
      });
    }
  },
  components: {},
  mounted() {
    this.$axios
      .request({
        method: "get",
        url: "/api/article/getArticleList"
      })
      .then(data => {
        this.article = data.data;
      });
    document.getElementById("main").addEventListener("scroll",e=>{
        console.log(document.body.scrollTop);
        
      
    })

  },
  beforeRouteLeave(to, from, next) {
    let position = document.getElementById("main").scrollTop();
    console.log(position);
    
    localStorage.setItem("position", position);
    next();
  },
  updated() {
    this.$nextTick(function() {
      let position = localStorage.getItem("position"); //返回页面取出来
      window.scroll(0, position);
    });
  }
};
</script>
<style scoped>
</style>

