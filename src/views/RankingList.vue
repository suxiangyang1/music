<template>
  <div>
    <van-row class="top">
      <van-col class="top-padding">
        排行榜单
      </van-col>
    </van-row>
    <!-- 内容区 -->
    <van-col
      v-for="(item, index) in list"
      :key="index"
      class="content-padding"
    >
      <router-link :to="'/ranking/' + item.id">
        <img
          :src="item.coverImgUrl"
          class="imgBox"
          @click="get(item.id)"
        />
        <div class="word">{{ item.updateFrequency }}</div>
      </router-link>
    </van-col>
  </div>
</template>

<script>
export default {
  name: 'RankingList',
  data() {
    return {
      list: []
    }
  },
  components: {},
  created() {
    this.axios.get('http://localhost:3000/toplist/detail').then((res) => {
      console.log(res)
      this.list = res.data.list
      console.log(this.list)
    })
  },
  mounted() {},
  methods: {
    get(id) {
      console.log(id)
      localStorage.setItem('id', id)
    }
  },
  computed: {}
}
</script>

<style scoped lang="scss">
.top {
  margin-top: 130px;
}
.top-padding {
  margin: 8px 15px;
  border-left: 3px solid #d24537;
  padding-left: 5px;
}
.imgBox {
  width: 140px;
}
.content-padding {
  padding: 8px 16px;
  margin-left: 0px;
  position: relative;
}
.word {
  position: absolute;
  bottom: 20px;
  left: 25px;
  font-size: 14px;
  color: white;
}
</style>
