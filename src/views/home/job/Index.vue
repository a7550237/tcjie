<template>
  <div>
    <iframe
      id="show-iframe"
      frameborder="0"
      name="showHere"
      scrolling="auto"
      :src="this.src"
    ></iframe>
  </div>
</template>
<script>
export default {
  data() {
    return {
        src:"https://search.51job.com/list/010000%252C020000%252C030200%252C040000,000000,0000,00,9,99,%25E6%2596%2587%25E6%25A1%25A3%25E5%25B7%25A5%25E7%25A8%258B%25E5%25B8%2588,2,1.html?lang=c&stype=&postchannel=0000&workyear=99&cotype=99&degreefrom=99&jobterm=99&companysize=99&providesalary=99&lonlat=0%2C0&radius=-1&ord_field=0&confirmdate=9&fromType=&dibiaoid=0&address=&line=&specialarea=00&from=&welfare="
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