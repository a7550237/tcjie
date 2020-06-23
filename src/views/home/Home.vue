<template>
  <div>
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
    <van-card desc="item.title" title="item.title" :thumb="imgURL"  v-bind:key="i"   v-for="(item,i)in article"></van-card>
  </div>
</template>
<script>
export default {
  name: "Home",
  data() {
    return {
      value: "",
      imgURL:"https://img.yzcdn.cn/vant/ipad.jpeg",
      article:Array
    };
  },
  methods: {
    onSearch() {
      console.log(this.value);
    },
    
  },
  components: {

  },
  mounted(){
    this.$axios.request({
      method:"get",
      url:"/api/article/getArticleList"
    }).then(data=>{
      this.article = data;
    })
    
  }
};
</script>
<style scoped>
</style>

