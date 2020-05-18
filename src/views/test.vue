<template>
  <div>
    <div
      class="top"
      type="flex"
    >MV 推荐</div>
    <van-row
      v-for="(item, index) in mvMessage"
      :key="index"
      class="tt"
      justify="center"
      align="center"
    >
      <router-link :to="'/mv/' + item.id">
        <van-col
          span="7"
          @click="playVideo(item.id)"
        ><img
            :src="item.cover"
            class="boxImg"
          /></van-col>
      </router-link>
      <van-col
        span="7"
        class="boxcolor"
      >{{ item.name }}</van-col>
      <van-col
        span="7"
        class="boxcolor"
      >{{ item.artistName }}</van-col>
    </van-row>
    <!-- 悬浮框 -->
    <van-row
      type="flex"
      justify="center"
      class="xufu"
    >
      <van-col
        span="6"
        color="white"
        @click="firstPage"
      >首页</van-col>
      <van-col
        span="6"
        color="white"
        @click="pPage"
      >上一页</van-col>
      <van-col
        span="6"
        color="white"
        @click="nextPage"
      >下一页</van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  name: 'test',
  data() {
    return {
      id: 0,
      mvMessage: [],
      show: false
    }
  },
  components: {},
  created() {
    this.axios.get('http://localhost:3000/top/mv?limit=10&offset=' + this.id * 10).then((res) => {
      console.log(this.id)
      console.log(res.data.data)
      this.mvMessage = res.data.data
    }),
      (window.onscroll = function() {
        //变量scrollTop是滚动条滚动时，距离顶部的距离
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        //变量windowHeight是可视区的高度
        var windowHeight = document.documentElement.clientHeight || document.body.clientHeight
        //变量scrollHeight是滚动条的总高度
        var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
        //滚动条到底部的条件
        if (scrollTop + windowHeight == scrollHeight) {
          //写后台加载数据的函数
          console.log('距顶部' + scrollTop + '可视区高度' + windowHeight + '滚动条总高度' + scrollHeight)
          this.show = true
        }
      })
  },
  mounted() {},
  methods: {
    firstPage() {
      this.id = 0
      console.log(1)
      this.axios.get('http://localhost:3000/top/mv?limit=10&offset=' + this.id * 10).then((res) => {
        console.log(this.id)
        console.log(res.data.data)
        this.mvMessage = res.data.data
      })
    },
    pPage() {
      if (this.id != 0) {
        this.id -= 1
      } else {
        this.id = 0
      }
      console.log(this.id)
      this.axios.get('http://localhost:3000/top/mv?limit=10&offset=' + this.id * 10).then((res) => {
        console.log(this.id)
        console.log(res.data.data)
        this.mvMessage = res.data.data
      })
    },
    nextPage() {
      this.id += 1
      console.log(this.id)
      this.axios.get('http://localhost:3000/top/mv?limit=10&offset=' + this.id * 10).then((res) => {
        console.log(this.id)
        console.log(res.data.data)
        this.mvMessage = res.data.data
      })
    },
    playVideo(Id) {
      console.log(Id)
    }
  },
  computed: {}
}
</script>

<style scoped lang="scss">
.top {
  margin-top: 130px;
  border-left: 3px solid #d24537;
  padding-left: 5px;
  margin-left: 8px;
}
.boxImg {
  width: 340%;
}
.tt {
  margin-top: 8px;
  padding: 0px 30px;
}
.xufu {
  background-color: rgb(194, 50, 50);
}
.boxcolor {
  color: #fff;
}
</style>
