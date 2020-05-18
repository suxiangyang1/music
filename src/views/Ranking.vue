<template>
  <div>
    <!-- 背景图片 -->
    <div>
      <img
        :src="details.coverImgUrl"
        class="boxImg"
      />
      <div
        class="logo"
        justify="center"
        align="center"
        @click="back"
      >
        <van-icon
          name="arrow-left"
          color="#d24537"
        />
        <span> 返回</span>
      </div>

      <div class="son">
        <van-row>
          {{ details.name }}
        </van-row>
        <van-row class="mtp">
          <van-col>
            <van-icon
              name="service-o"
              color="#fff"
            />
            <span> 播放量：{{ details.playCount }}</span>
          </van-col>
        </van-row>
      </div>
    </div>

    <!-- 歌曲信息展示部分 -->

    <!-- 歌曲 -->
    <div class="song">
      <van-row
        type="flex"
        justify="space-between"
      >
        <van-col span="18">
          <div class="play">
            <span>播放全部</span>
            <span>(共{{ details.trackCount }}首)</span>
          </div>
        </van-col>
        <van-col span="6"></van-col>
      </van-row>
      <transition-group
        enter-active-class="animated rubberBand"
        leave-active-class="animated rotateIn"
      >
        <div
          class="list"
          v-for="(item, index) in song"
          :key="index"
          @click="get(index)"
        >
          <div class="id">{{ index + 1 }}</div>
          <div
            class="dansong"
            @click="play(item.id, song)"
          >
            <div class="name">{{ item.name }}</div>
            <div class="songer">{{ item.ar[0].name }}--{{ item.al.name }}</div>
          </div>
          <div>
            <van-icon
              name="video-o"
              size="26"
            />
          </div>
          <div class="meun">
            <van-icon
              name="ellipsis"
              class="ellipsis"
            />
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
// import Footer from '../components/Footer'
export default {
  name: 'Ranking',
  data() {
    return {
      details: [],
      song: [],
      isloading: true,
      index: -1,
      Id: localStorage.getItem('id'),
      show: false,
      idx: this.$store.state.current,
      songid: localStorage.getItem('songid')
    }
  },
  props: ['title'],
  inject: ['playaudio'],
  components: {},
  created() {
    console.log(1)
    this.axios.get('http://localhost:3000/playlist/detail?id=' + this.Id).then((res) => {
      this.details = res.data.playlist
      console.log(this.details)
      this.song = res.data.playlist.tracks
    })
  },
  mounted() {},
  methods: {
    //歌单详情
    getdetails() {
      console.log(this.Id)
    },
    back() {
      this.$router.go(-1)
    },
    // 获取音乐url(音频链接)
    getsongurl(id) {
      this.axios.get('http://localhost:3000/song/url?id=' + id).then((res) => {
        this.$store.state.src = res.data.data[0].url
        console.log(res)
        console.log(this.songid)
        // let songs = this.songid.split(',')
        // console.log('"' + id + '"')
        // console.log(songs[1])
        // let index = songs.indexOf('"' + id + '"')
        // console.log(this.index)
        // let user = songs[index]
        // localStorage.setItem('user', JSON.stringify(user))
      })
    },
    //开始播放歌曲
    play(id, song) {
      console.log(id)
      console.log(song)
      this.getsongurl(id)
      this.playaudio(id, song)
    },
    //获得索引
    get(index) {
      console.log(index)
      let user = this.song[index]
      console.log(user.al.picUrl)
      localStorage.setItem('user', JSON.stringify(user))
      this.$store.state.user = user
    }
  },
  computed: {}
}
</script>

<style scoped lang="scss">
.boxImg {
  width: 100%;
  position: relative;
}
.logo {
  position: fixed;
  top: 10px;
  left: 16px;
  color: #d24537;
  z-index: 100;
}
.son {
  position: absolute;
  top: 320px;
  left: 16px;
  color: white;
}
.mt {
  padding: 5px 16px;
}
.music-padding {
  padding: 30px 16px;
}
.mtp {
  position: sticky;
  top: 5px;
}

/* 歌曲 */
.song {
  width: 100%;
  margin-top: 6px;
  background: #ffffff;
  border-radius: 1rem;
  opacity: 0.9;
}
.play {
  font-size: 1rem;
  text-indent: 1rem;
  margin-top: 1rem;
  color: #000;
  font-weight: 700;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
.play span {
  color: #000;
}
.van-icon-bar-chart-o {
  font-size: 1.2rem;
  margin-left: 2rem;
}
.list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 3rem;
  margin-top: 2rem;
  border-radius: 5px;
  border-bottom: 2px solid #ccc;
}
.list:hover {
  background: linear-gradient(45deg, #f40, skyblue);
}
.van-icon {
  color: #000;
  flex: 2;
}
.id {
  flex: 1;
  font-size: 0.6rem;
  color: #000;
  margin-left: 1rem;
}
.list .audio {
  flex: 6;
}
.dansong {
  font-size: 0.1rem;
  flex: 6;
}
.dansong .name {
  font-size: 0.8rem;
  font-weight: 700;
  color: #000;
}
.songer {
  color: #555;
  opacity: 0.8;
  margin-top: 0.4rem;
}
.ellipsis {
  margin-left: 1rem;
  font-size: 1.2rem;
}
.meun {
  width: 3rem;
  height: 3rem;
}
.bottom-div {
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
  z-index: 1000;
}
</style>
