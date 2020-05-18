<template>
  <div id="appfooter">
    <van-row
      justify="center"
      align="center"
      @click="playMusic"
    >
      <van-col span="9">
        <van-image
          src="user.al.picUrl"
          class="boxImg"
        />
      </van-col>
      <van-col span="9">
        <van-icon
          name="play-circle-o"
          size="30"
          style="top:16px"
        />
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  name: 'appfooter',
  components: {},
  data() {
    return {
      user: this.$store.state.user
    }
  },
  methods: {
    playMusic() {
      this.axios.get('http://localhost:3000/song/url?id=' + sessionStorage.getItem('current')).then((res) => {
        this.$store.state.src = res.data.data[0].url
        console.log(res.data.data[0].url)
        // let songs = this.songid.split(',')
        // console.log('"' + id + '"')
        // console.log(songs[1])
        // let index = songs.indexOf('"' + id + '"')
        // console.log(this.index)
        // let user = songs[index]
        // localStorage.setItem('user', JSON.stringify(user))
      })
      console.log(sessionStorage.getItem('current'))
      console.log(sessionStorage.getItem('song'))
      this.playaudio(sessionStorage.getItem('current'), sessionStorage.getItem('song'))
    }
  },
  inject: ['playaudio'],
  computed: {},
  mounted() {},
  created() {
    console.log(localStorage.getItem('user'))
  }
}
</script>
<style scoped>
#appfooter {
  width: 100%;
  height: 60px;
  position: fixed;
  bottom: 0;
  z-index: 10000;
  background: rgb(210, 69, 55);
}
.boxImg {
  width: 40px;
  height: 40px;
  top: 10px;
  left: 10px;
}
</style>
