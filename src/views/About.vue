<template>
  <div>
    <div class="top-padding top">
      推荐歌单
    </div>
    <div class="padding-left">
      <!-- 内容展示区 -->
      <van-row v-for="(item, index) in user" :key="index">
        <van-col span="8" class="imgBox">
          <img :src="item.coverImgUrl" class="imgBox" />
        </van-col>
        <van-col span="16" class="mt">
          <van-row>
            {{ item.name }}
          </van-row>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
  data() {
    return {
      user: []
    }
  },
  components: {},
  created() {
    this.axios.get('http://localhost:3000/top/playlist').then((res) => {
      console.log(res.data.playlists)
      this.user = res.data.playlists
    })
  },
  mounted() {},
  methods: {},
  computed: {}
}
</script>

<style scoped lang="scss">
.top-padding {
  margin: 8px 15px;
  border-left: 3px solid #d24537;
  padding-left: 5px;
}
.padding-left {
  padding: 8px 15px;
}
.imgBox {
  width: 100px;
}
.mt {
  margin: 7px;
}
.top {
  margin-top: 130px;
}
</style>
