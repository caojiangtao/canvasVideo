<template>
  <div>
    <div id="wdc-video"></div>
    <!-- <button @click="getcrrent" type="button">获得当前时间的位置</button> -->
  </div>
</template>

<script>
import canvasVideo from "./canvasVideo.js";
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  mounted() {
    // 实例化 Canvas 对象并播放，该操作会自动创建一个 Canvas 标签放到 video 标签同级并隐鲹原有的 video 标签
    let data = {
      width: 440,
      height: 340,
      border: 6,
      src: "https://platform-vod.wdcloudnet.com/customerTrans/928e23e5005956f70e333d6b586f6f88/5615e7dd-183efade735-0005-cd1a-d1c-c3eb7.mp4",
    };
    canvasVideo.init(data);
    // document.addEventListener("click", function () {
    //   console.log("ok");
    //   _canvasVideo.play();
    // });
  },
  methods: {
    // getcrrent() {
    //   let vid = document.querySelector("video");
    //   console.log("vid====>", vid);
    //   let time = vid.currentTime;
    //   console.log("111");
    //   console.log(time);
    //   alert(time);
    // },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* #wdc-video {
  border: 4px solid #000;
} */
</style>
