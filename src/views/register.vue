<template>
  <div>
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        type="text"
        name="昵称"
        label="昵称"
        placeholder="昵称"
        :rules="[{ required: true, message: '请填写昵称' }]"
      />
      <van-field
        v-model="mobile"
        @click="locking1"
        @touchstart.native.stop="show = true"
        type="tel"
        name="手机号"
        label="手机号"
        placeholder="手机号"
        :rules="[{ required: true, message: '请填写手机号' }]"
      />
      <van-field
        v-model="password"
        @touchstart.native.stop="show = true"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-row>
        <van-col span="18">
          <van-field
            v-model="vuetifyCode"
            @click="locking2"
            @touchstart.native.stop="show = true"
            type="digit"
            name="验证码"
            label="验证码"
            placeholder="验证码"
            :rules="[{ required: true, message: '请填写验证码' }]"
          />
        </van-col>
        <van-col
          span="6"
          @click="vertify"
        >发送验证码</van-col>
      </van-row>
      <van-number-keyboard
        :show="show"
        @touchstart.native.stop="show = true"
        @blur="show = false"
        @input="onInput"
        @delete="onDelete"
      />
      <div style="margin: 16px;">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          @click="submit"
        >
          注册
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { Dialog } from 'vant'
export default {
  name: 'register',
  data() {
    return {
      show: false,
      mobile: '',
      password: '',
      vuetifyCode: '',
      username: '',
      number: ''
    }
  },
  components: {},
  created() {},
  mounted() {},
  methods: {
    locking1() {
      this.number = 1
      console.log(this.number)
    },
    locking2() {
      this.number = 2
      console.log(this.number)
    },
    onInput(value) {
      if (this.number == 1) {
        this.mobile = (this.mobile + value).slice(0, 11)
      }
      if (this.number == 2) {
        this.vuetifyCode = (this.vuetifyCode + value).slice(0, 4)
      }
    },
    onDelete() {
      console.log(this.value)
      if (this.number == 1) {
        console.log(this.number)
        this.mobile = this.mobile.slice(0, this.mobile.length - 1)
      }
      if (this.number == 2) {
        this.vuetifyCode = this.vuetifyCode.slice(0, this.vuetifyCode.length - 1)
      }
    },
    submit() {
      this.axios.get('http://localhost:3000/captcha/verify?phone=' + this.mobile + '&captcha=' + this.vuetifyCode).then((res) => {
        console.log(res.date)
        this.axios.get('http://localhost:3000/register/cellphone?phone=' + this.mobile + '&password=' + this.password + '&captcha=' + this.vuetifyCode + '&nickname=' + this.username).then((result) => {
          console.log(result.date)
          Dialog.alert({
            title: 'success',
            message: '注册成功'
          }).then(() => {
            this.$router.push('/')
          })
        })
      })
    },
    onSubmit(values) {
      console.log('submit', values)
    },
    vertify() {
      this.axios.get('http://localhost:3000/captcha/sent?phone=' + this.mobile)
    }
  },
  computed: {}
}
</script>

<style scoped lang="scss"></style>
