<template>
  <div>
    <van-row class="top-align-center">
      云音乐登录
    </van-row>
    <van-row>
      <van-form @submit="onSubmit">
        <van-field
          v-model="mobile"
          type="tel"
          @touchstart.native.stop="show = true"
          name="手机号"
          label="手机号"
          placeholder="手机号"
          :rules="[{ required: true, message: '请填写手机号' }]"
        />
        <van-field
          v-model="password"
          type="password"
          @touchstart.native.stop="show = true"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-number-keyboard
          :show="show"
          @blur="show = false"
          @input="onInput"
          @delete="onDelete"
        />
        <div>
          <router-link to="/register">还没有注册,请先注册。</router-link>
        </div>
        <div style="margin: 16px;">
          <van-button
            round
            block
            type="info"
            native-type="submit"
            @click="submit"
          >
            提交
          </van-button>
        </div>
      </van-form>
    </van-row>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return { mobile: '', password: '', show: false }
  },
  components: {},
  created() {},
  mounted() {},
  methods: {
    onSubmit(values) {
      console.log('submit', values)
    },
    submit() {
      this.axios
        .get('http://localhost:3000' + '/login/cellphone?phone=' + this.mobile + '&password=' + this.password)
        .then((res) => {
          console.log(res)
          if (res.data.code == '200') {
            console.log('成功')
          }
          if (res.data.code == '502') {
            console.log('密码错误')
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    onInput(value) {
      this.mobile = (this.mobile + value).slice(0, 11)
    },
    onDelete() {
      console.log(this.value)
      this.mobile = this.mobile.slice(0, this.mobile.length - 1)
    }
  },
  computed: {}
}
</script>

<style scoped lang="scss">
.top-align-center {
  text-align: center;
  font-size: 22px;
  color: aquamarine;
}
</style>
