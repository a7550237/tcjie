<template>
  <TabBar>
    <TabBarItem avtiveColor='blue' v-for='(item,index) in items' :path='item.path' :key="index">
      <img slot="icon-image" :src="item.imgUrl" alt="">
      <img slot="icon-image-active" :src="item.activeImgUrl" alt="">
      <div slot="item-text">{{item.itemName}}</div>
    </TabBarItem>
  </TabBar>
</template>
<script>
import TabBar from '../common/TabBar'
import TabBarItem from '../common/TabBarItem'
export default {
  name:'MainTabBar',
  props:{
    items:Array
  },
  data(){
    return{

    }
  },
  methods:{
    
  },
  components:{
    TabBar,
    TabBarItem
  }
}
</script>
