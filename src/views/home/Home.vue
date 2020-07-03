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
    <van-tabs v-model="active" @change="onChange">
      <van-tab :title="item.menuName" v-for="(item,index) in menus"  :key="index">
        <div v-if="active == index">
          <router-view/>
        </div>
      </van-tab>
      <!-- <van-tab title="推荐">
        <Recommend :searchResult="news"></Recommend>
      </van-tab>
      <van-tab title="热点">热点</van-tab>
      <van-tab title="咖谈">
        <Talk></Talk>
      </van-tab>
      <van-tab title="职位">职位</van-tab> -->
    </van-tabs>
  </div>
</template>
<script>
//import Recommend from './recommend/Recommend'
//import Talk from './talk/Talk'
export default {
  name: "Home",
  components: {
    //Recommend,
    //Talk
  },
  data() {
    return {
      value: "",
      imgURL: "https://img.yzcdn.cn/vant/ipad.jpeg",
      news: [],
      nullTip: "空空如也~",
      pageSize: 10, // 每页条数
      pageIndex: 1, // 页码
      loading: false, // 上拉加载
      finished: false, // 上拉加载完毕
      offset: 100, // 滚动条与底部距离小于 offset 时触发load事件
      scroll: 0,
      parentId:this.$route.query.parentId,
      menus:[],
      active:0
    };
  },
  methods: {
    onSearch() {
      if (this.value == null) return;
      this.$axios
        .request({
          method: "get",
          url: "/api/front/search?key=" + this.value
        })
        .then(data => {
          this.$store.commit('setSearchResult',{
            value: data.data
          });
          console.log(data);
          
        });
    },
    onChange(index, title) {
      console.log(index+"=="+this.active);
      
      console.log(this.menus[index].menuPath);
      this.$router.push({
        path:this.menus[index].menuPath
      })
    },
    onDownRefresh() {},
    getJobSaray() {
      this.$axios
        .request({
          method: "get",
          url: "/api/front/saray"
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
    },
    getMenuItem(){
      console.log(this.$route);
      this.$axios.request({
        method:'get',
        url:'/api/front/getMenuList?parentId='+this.parentId
      }).then(res=>{
        this.menus = res.data
        this.$router.push({
          path:this.menus[0].menuPath,
        })
      })
    }
  },
  mounted() {
    //this.getArticleList();
    this.getJobSaray();
    this.getMenuItem();
  },
  activated() {
    console.log("首页被激活");
    //获取滑动坐标
    this.$refs.wrapper.scrollTop = this.scroll;
  },
  deactivated() {
    console.log("首页被缓存");
  },
  beforeRouteLeave(to, from, next) {
    //缓存滑动坐标
    this.scroll = this.$refs.wrapper.scrollTop;
    next();
  }
};
</script>
<style>
#saray {
  text-align: center;
}
</style>

