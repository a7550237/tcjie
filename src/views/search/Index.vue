<template>
  <div>
    <div class="search-box">
      <sticky>
        <search-bar ref="searchBar" :onChange="onChange" :onSearch="onSearch" v-model="searchKey">
          <div class="hot-wrapper">
            <div class="tip">热门搜索</div>
            <div class="label-wraper">
              <div
                class="label"
                v-for="(item,index) in hotSearchList"
                :key="index"
                @click="onSearch(item.attr1)"
              >{{item.attr1}}</div>
            </div>
          </div>
        </search-bar>
      </sticky>
    </div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="我是有底线的"
      @load="onLoadList"
      :immediate-check="false"
    >
      <van-card @click="toNewsDetail(item)" v-bind:key="i" v-for="(item,i) in news">
        <div style="margin-left:30px" slot="title">
          <b v-html="item.title"></b>
        </div>
        <div style="margin-left:30px;margin-top:10px" slot="desc">
          <em v-html="item.contentShort"></em>
        </div>
        <div slot="thumb">
          <van-image
            :src="item.imgsrc==null?'https://goss.veer.com/creative/vcg/veer/800water/veer-153835898.jpg':item.imgsrc"
            width="100"
            height="100"
          />
        </div>
        <div slot="footer">{{item.date}}</div>
      </van-card>
    </van-list>
  </div>
</template>
<script>
import sticky from "../../components/Sticky";
export default {
  components:{
    sticky
  },
  data() {
    return {
      searchKey: "",
      news: [],
      pageSize: 10, // 每页条数
      pageIndex: 1, // 页码
      loading: false, // 上拉加载
      finished: false, // 上拉加载完毕
      offset: 100, // 滚动条与底部距离小于 offset 时触发load事件
      scroll: 0,
      hotSearchList: [],
    };
  },
  methods: {
    onChange(value) {
      console.log("change=" + value);
    },
    onSearch(value) {
      this.pageIndex = 1;
      this.news = [];
      this.finished = false;
      this.searchKey = value;
      this.getSearchList();
      this.$refs.searchBar.hideDialog();
    },
    onLoadList() {
      this.pageIndex++;
      this.getSearchList();
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
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          console.log(res);
        });
      this.$router.push({
        path: "/toNewsDetail",
        query: {
          newsId: news.id,
        },
      });
    },
    getSearchList() {
      this.$axios
        .request({
          method: "get",
          url:
            "/api/front/search?key=" +
            this.searchKey +
            "&pageIndex=" +
            this.pageIndex +
            "&pageSize=" +
            this.pageSize,
        })
        .then((data) => {
          if (data.data.length < this.pageSize) {
            this.finished = true;
          }
          this.news = this.news.concat(data.data);
          this.loading = false;
        });
    },
    initHotSeachList() {
      this.$axios
        .request({
          method: "get",
          url: "/api/front/getHotSearchKey",
        })
        .then((res) => {
          this.hotSearchList = res.data;
        });
    },
  },
  mounted() {
    this.$refs.searchBar.showDialog();
    this.initHotSeachList();
  },
};
</script>
<style lang="scss" scoped>
.tab {
  text-align: center;
  padding: 10px;
  margin: 5px 0;
  background-color: #f2f2f2;
  a {
    color: #7e8c8d;
  }
}

.home-container {
  width: 100%;

  .Header {
    background: linear-gradient(90deg, rgb(231, 86, 142), #ff696b);
    padding: 4vw;
    color: #fff;
    text-align: center;
  }
  .item-wrapper {
    display: flex;
    padding: 4vw;
  }
  .item-image {
    width: 25vw;
  }
  .item-right {
    flex: 1;
    margin-left: 3vw;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    padding: 1vw 0;
  }
}

.search-box {
  .hot-wrapper {
    text-align: left;
    .tip {
      padding: 4vw;
      text-align: left;
      font-size: 3vw;
      color: #999999;
    }
    .label-wraper {
      display: flex;
      flex-wrap: wrap;
      padding: 0 4vw;
      border-bottom: 1px solid #e4e4e4;

      .label {
        padding: 0.8vw 2vw;
        border-radius: 1vw;
        background-color: #efefef;
        font-size: 3.4vw;
        margin-bottom: 4vw;
        margin-right: 2vw;
        color: #666;
      }
    }
    .search-list {
      color: #555;
      .list-item {
        display: flex;
        align-items: center;
        padding: 4vw;
        border-bottom: 1px solid #e4e4e4;
        font-size: 3.6vw;
        &:active {
          background-color: #efeff4;
        }
        .list-item {
          display: flex;
          align-items: center;
        }
      }
    }
  }
}
</style>
