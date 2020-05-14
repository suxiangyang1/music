<template>
  <div>
    <van-row class="top-padding" type="flex" align="center">
      <van-icon name="arrow-left" />
      <van-col span="7" @click="back">返回</van-col>
      <van-col span="9" class="align-center">个人信息</van-col>
      <van-col span="8" class="align-right" @click="backHome">首页</van-col>
    </van-row>
    <van-row class="top-padding">
      收藏的歌单
    </van-row>
    <van-row class="top-padding">
      <van-col>
        <van-image span="8" width="100" height="100" src="https://img.yzcdn.cn/vant/cat.jpeg" />
      </van-col>
      <van-col class="ml">
        <van-row>真的爱你</van-row>
        <van-row>播放：2 次</van-row>
        <van-row>创建者: 也许还在惬意</van-row>
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  name: 'MyMessage',
  data() {
    return {}
  },
  components: {},
  created() {},
  mounted() {},
  methods: {
    backHome() {
      this.$router.push('/home')
    },
    //返回到上一级
    back() {
      this.$router.go(-1)
    }
  },
  computed: {}
}
</script>

<style scoped lang="scss">
.top-padding {
  padding: 10px 8px;
}
.align-center {
  text-align: center;
}
.align-right {
  text-align: right;
}
.ml {
  margin-left: 5px;
}
.top {
  margin-top: 130px;
}
</style>
