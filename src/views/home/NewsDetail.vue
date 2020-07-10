<template>
  <div>
    <sticky>
    <van-nav-bar  title left-text="返回" right-text left-arrow @click-left="onClickLeft">
     <van-button icon="star-o" @click="onClick" round style="width:80px;height:30px;font-size: 10px;" slot="right" >分享</van-button>
    </van-nav-bar></sticky>
    <van-panel>
      <i class="el-icon-share" ></i>
      <div style="text-align: center;" class="news-title">
        <h1>{{news.title}}</h1>
      </div>
      <div class="news-thumb">
        <van-image width="400" height="200" :src="news.imgsrc" />
      </div>
      <div class="news-content" v-html="news.content"></div>
      <div v-if="isMultilingual" class="news-content">
        <h3>{{news.attr1}}</h3>
        <br />
        <div v-html="news.attr2"></div>
      </div>
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
import sticky from "../../components/Sticky"
export default {
  name: "NewsDetail",
  components:{
    sticky
  },
  data() {
    return {
      news: {},
      show: false,
    };
  },
  methods: {
    onClickLeft() {
      console.log(window.history.length);
      
      if(window.history.length>2){
this.$router.go(-1);
      }else{
        this.$router.push("/home/recommend")
      }
      
    },
    isMultilingual() {
      return this.article.host.startsWith("https://multilingual.com");
    },
    imageUrl() {
      if (this.news.imgsrc == null) {
        this.news.imgsrc =
          "https://goss.veer.com/creative/vcg/veer/800water/veer-153835898.jpg";
      }
      if (this.news.attr1 == "nullnull") {
        this.news.attr1 = "";
      }
    },
    onClick(){
      this.show = !this.show
    },
    beforeClose(){

    },
    getNewsInfo(){
      this.$axios.request({
        method:'get',
        url:'/api/front/getNewsById?newsId='+this.$route.query.newsId
      }).then(res=>{
        this.news = res.data;
        this.imageUrl();
      })
    }
  },
  mounted() {
    //this.imageUrl();
    this.getNewsInfo();
  },
  computed:{
    config(){
      return {
        url:"https://www.baidu.com/",
        source:"TCJie",
        title:this.news.title,
        image:this.news.imgsrc,
        description:this.news.contentShort,
        sites: ['qzone', 'qq', 'weibo','wechat', 'douban','linkedin'] // 启用的站点
      }
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
  margin-bottom: 20px;
}
div.news-title {
  margin-left: 20px;
  margin-right: 20px;
}
div.green {
  background: chartreuse;
}
</style>