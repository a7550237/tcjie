<template>
  <div id="wrapper">
    <!-- <iframe
      id="myiframe"
      scrolling="no"
      :src="this.$route.query.contentLink"
      frameborder="0"
      onload="initFrame"
    ></iframe>-->
    <!-- <iframe class="myIframe" scrolling="auto" sandbox="allow-scripts allow-top-navigation allow-same-origin allow-forms" :src="this.$route.query.contentLink" frameborder="0">
    </iframe>-->
    <iframe
      id="show-iframe"
      frameborder="0"
      name="showHere"
      scrolling="auto"
      :src="this.$route.query.contentLink"
    ></iframe>
  </div>
</template>
<script>
export default {
  data() {
    return {
    };
  },
  methods: {
  },
  mounted() {
    const oIframe = document.getElementById("show-iframe");
    const deviceWidth = document.documentElement.clientWidth;
    const deviceHeight = document.documentElement.clientHeight;
    oIframe.style.width = deviceWidth + "px";
    oIframe.style.height = deviceHeight + "px";
  }
};
</script>
<style scoped>

</style>