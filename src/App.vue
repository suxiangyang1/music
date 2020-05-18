<template>
  <div id="app">
    <audio
      class="audio"
      ref="audio"
      @timeupdate="onTimeupdate"
      @loadedmetadata="onLoadedmetadata"
    >
      <p>你的浏览器不支持HTML5音频，你可以<a href="">下载</a>这个音频文件。</p>
    </audio>
    <router-view />
    <appfooter v-show="showfooter"></appfooter>
  </div>
</template>
<script>
import appfooter from './components/Footer'
import { Toast } from 'vant'
export default {
  name: 'app',
  // 提供可注入子组件属性
  data() {
    return {
      isShow: true,
      showfooter: false
    }
  },
  provide() {
    return {
      playaudio: this.playaudio,
      footer: false
    }
  },
  components: { appfooter },
  comments: {},
  methods: {
    // 记录播放时间(currentTime属性值发生变化的时候会触发timeupdate事件。)
    onTimeupdate(res) {
      this.$store.state.audio.currentTime = res.target.currentTime
      this.$store.state.playtime = parseInt((this.$store.state.audio.currentTime / this.$store.state.audio.maxTime) * 100)
      // console.log(this.$store.state.playtime)
      // 顺序播放
      //判断歌曲是否播放结束,结束候,按照从上向下的顺序进行播放
      if (this.$store.state.audio.currentTime >= this.$store.state.audio.maxTime) {
        //获取当前播放的url
        let nowid = JSON.parse(sessionStorage.getItem('current'))
        //获取当前播放url的索引
        let number = this.$store.state.songid.indexOf(nowid)
        //存储索引放在sessionStorage
        sessionStorage.setItem('number', number)
        //获取所有歌曲信息
        let song = JSON.parse(sessionStorage.getItem('song'))
        //顺序播放
        if (number == song.length - 1) {
          number = 0
        } else {
          number = number + 1
        }
        let id = Number(this.$store.state.songid[number])
        setTimeout(() => {
          this.playaudio(id, song)
          setTimeout(() => {}, 600)
        }, 1000)
      }
    },
    // 获取歌曲总时长(最先执行)
    onLoadedmetadata(res) {
      console.log(res)
      this.$store.state.audio.maxTime = parseInt(res.target.duration)
    },
    playaudio(id, song) {
      setTimeout(() => {
        let audio = document.getElementsByClassName('audio')[0]
        // let playicon = document.getElementById('playicon')
        // 同一次点击时,根据状态是否播放
        if (audio.src == this.$store.state.src) {
          //未播放或者暂停播放
          this.showfooter = this.$store.state.showfooter
          if (audio.paused) {
            audio.play()
            // playicon.innerHTML = '&#xe68e;'
            Toast.success('开始播放')
            console.log(1)
          } else {
            audio.pause()
            console.log(3)
            // playicon.innerHTML = '&#xe612;'
            Toast.fail('暂停播放')
          }
        } else {
          console.log(2)
          audio.src = this.$store.state.src
          if (audio !== null) {
            if (audio.paused) {
              Toast.success('开始播放')
              this.showfooter = this.$store.state.showfooter
              console.log(this.showfooter)
              if (audio.play()) {
                audio.play().then((myMessage) => {
                  setTimeout(() => {
                    //开始播放音乐的时候,出现底部播放栏
                    if (this.showfooter === true) {
                      // playicon.innerHTML = '&#xe68e;'
                      console.log(myMessage)
                    }
                  }, 2000)
                })
              }
              // 数字变成字符串
              let gid = id.toString()
              //每次点击播放都去除当前播放列表
              sessionStorage.removeItem('songid')
              this.$store.state.songid = []
              // 把当前播放的歌单存入到vuex 显示到播放列表
              sessionStorage.setItem('song', JSON.stringify(song))
              // 根据歌单列表找出所有id
              let songlist = song.map((item) => {
                return item.id.toString()
              })
              // eslint-disable-next-line no-unused-vars
              let list = songlist.map((item) => {
                this.$store.state.songid.push(item)
              })
              let songid = JSON.stringify(this.$store.state.songid)
              localStorage.setItem('songid', songid)
              console.log(songid)

              // 保存播放的id
              this.$store.state.current = gid
              let current = this.$store.state.current
              sessionStorage.setItem('current', current)
              if (this.$store.state.showfooter === true) {
                console.log('当前没有audio.src的测试')
              }
            } else {
              audio.pause()
              // playicon.innerHTML = '&#xe612;'
              Toast.fail('暂停播放')
            }
          }
        }
      }, 1000)
    }
  }
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
