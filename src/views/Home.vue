<template>
  <div>
    <!-- 导航栏 悬浮 -->
    <div class="top-bj">
      <van-row class="top-padding" type="flex" justify="center" align="center">
        <van-col span="9">
          <van-icon name="user-circle-o" color="#fff" size="28" @click="showPopup" />
        </van-col>
        <van-col span="11" class="word-color">music</van-col>
        <van-col span="">
          <van-icon name="search" color="#fff" size="28" />
        </van-col>
      </van-row>
      <van-tabs v-model="active" background="#D24537" color="white" border="false" type="line" title-active-color="#fff">
        <van-tab title="推荐" replace to="/about"></van-tab>
        <van-tab title="排行榜" replace to="/test"></van-tab>
        <van-tab title="歌手" replace to="/test"></van-tab>
      </van-tabs>
      <!-- 侧边弹出层 -->
      <!-- <van-popup v-model="show" position="left" :style="{ height: '100%', width: '70%' }" /> -->
      <van-popup v-model="show" position="left" :style="{ height: '100%', width: '70%' }">
        <!-- 弹出层里的头像 -->
        <van-image round width="4rem" height="4rem" src="https://img.yzcdn.cn/vant/cat.jpeg" class="avatar-padding" @click="signMessage" />
        <!-- 昵称 -->
        <van-row>
          <van-col span="8" class="align-center">MDr</van-col>
        </van-row>
        <!-- 其他的icon -->
        <van-row type="flex" align="center" class="myIcon">
          <van-col span="3" class="align-center">
            <van-icon name="setting-o" size="20" />
          </van-col>
          <van-col span="8">设置</van-col>
        </van-row>
        <van-row type="flex" align="center" class="myIcon">
          <van-col span="3" class="align-center">
            <van-icon name="envelop-o" size="20" />
          </van-col>
          <van-col span="8">我的信息</van-col>
        </van-row>
        <van-row type="flex" align="center" class="myIcon">
          <van-col span="3" class="align-center">
            <van-icon name="shopping-cart-o" size="20" />
          </van-col>
          <van-col span="8">商城</van-col>
        </van-row>
        <van-row type="flex" align="center" class="myIcon">
          <van-col span="3" class="align-center">
            <van-icon name="user-circle-o" size="20" />
          </van-col>
          <van-col span="8">我的</van-col>
        </van-row>
        <van-row type="flex" align="center" class="myIcon" @click="signOut">
          <van-col span="3" class="align-center">
            <van-icon name="close" size="20" />
          </van-col>
          <van-col span="8">退出</van-col>
        </van-row>
      </van-popup>
    </div>

    <router-view></router-view>
  </div>
  <!-- <div class="bottomBox">
    <van-tabbar route>
      <van-tabbar-item replace to="/about" icon="home-o">
        标签
      </van-tabbar-item>
      <van-tabbar-item replace to="/test" icon="search">
        标签
      </van-tabbar-item>
    </van-tabbar>
    <router-view />
  </div> -->
</template>

<script>
export default {
  name: 'Home',
  data() {
    return { active: 2, show: false, user: [] }
  },
  components: {},
  created() {
    this.axios.get('http://localhost:3000/top/playlist').then((res) => {
      console.log(res.data.playlists)
      this.user = res.data.playlists
    })
  },
  mounted() {},
  methods: {
    showPopup() {
      this.show = true
      console.log(1)
    },
    signMessage() {
      this.$router.push('/mymessage')
    },
    signOut() {
      this.$router.push('/')
    }
  },
  computed: {}
}
</script>

<style scoped lang="scss">
.top-bj {
  background-color: rgb(210, 69, 55);
  background: rgb(210, 69, 55);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
.top-padding {
  padding: 20px 20px;
}
.bottomBox {
  position: sticky;
  top: 0px;
}
.word-color {
  color: white;
}
.avatar-padding {
  padding-left: 10px;
  padding-top: 40px;
}
.align-center {
  text-align: center;
}
.myIcon {
  margin-top: 8px;
}
.padding-left {
  padding: 8px 15px;
}
</style>
