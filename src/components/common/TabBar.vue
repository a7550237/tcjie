<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name:'TabBar'
}
</script>
<style scoped>
  #tab-bar{
    display: flex;
    background: #f6f6f6;
    position : fixed;
    margin: 0px;
    padding: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    box-shadow: 0 -2px 1px rgba(100, 100, 100, 0.1);
  }
  
</style>