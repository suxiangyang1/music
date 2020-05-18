<template>
  <div>
    当前播放的MV是
    <van-row>
      <van-col span="6"><button @click="playPause()">播放/暂停</button> </van-col>
      <van-col span="6"><button @click="makeBig()">放大</button></van-col>
      <van-col span="6"><button @click="makeSmall()">缩小</button></van-col>
      <van-col span="6"><button @click="makeNormal()">普通</button></van-col>
    </van-row>
    <video
      ref="video"
      id="video1"
      width="220"
    >
      <source
        src="http://vodkgeyttp8.vod.126.net/cloudmusic/obj/core/656261422/7c4b799188b4eedd1841c46da00a4882.mp4?wsSecret=312fcd6570724416c374b28e2be3b6c1&wsTime=1589761788"
        type="video/mp4"
      />
      <source
        src="mov_bbb.ogg"
        type="video/ogg"
      />
    </video>
  </div>
</template>

<script>
export default {
  name: 'Mv',
  data() {
    return {
      mvId: ''
    }
  },
  components: {},
  created() {},
  mounted() {
    //获得当前MV的Id
    console.log(this.$route.params.id)
    this.getMv(this.$route.params.id)
    this.mvId = this.$route.params.id
    this.axios.get('http://localhost:3000/mv/url?id=' + this.mvId).then((res) => {
      console.log(res.data.data)
    })
  },
  methods: {
    getMv(id) {
      this.axios.get('http://localhost:3000/mv/url?id=' + id).then((res) => {
        console.log(res.data.data)
        console.log(this.$refs.video)
        this.$refs.video = res.data.data.url
      })
    },
    // 播放和暂停
    playPause() {
      let myVideo = document.getElementById('video1')
      console.log(myVideo)
      if (myVideo.paused) {
        myVideo.play()
      } else {
        myVideo.pause()
      }
    },
    makeBig() {
      let myVideo = document.getElementById('video1')
      myVideo.width = 320
    },
    makeSmall() {
      let myVideo = document.getElementById('video1')
      myVideo.width = 150
    }
  },
  computed: {}
}
</script>

<style scoped lang="scss">
.mv {
  width: 90%;
}
</style>
