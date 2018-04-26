<template>
  <div>
    <header class="header">
      <a class="float-left header-left">
        <icon class="logo" src="~svg/open-api.svg"/>
      </a>
      <div v-if="loginStatus==='logged'" class="user-name">
        您好，{{clientName || '用户'}}
        <a class="logout" @click="logout">退出登录</a>
      </div>
      <el-button v-else-if="loginStatus==='unlogged'"
                 class="login-button float-right"
                 @click="openLoginDialog">登录</el-button>
    </header>
    <router-view class="content"></router-view>
    <el-dialog
      title="登录"
      :visible.sync="dialogVisible"
      width="30%">
      <form @submit.prevent="login">
        <div class="field">
          <el-input class="username"
                    v-model="username"
                    name="username"
                    v-validate="'required|min:3'"
                    data-vv-as="用户名"
                    :class="{'error':errors.has('username') }"
                    placeholder="用户名"></el-input>
          <span v-show="errors.has('username')"
                class="help error">{{ errors.first('username') }}</span>
        </div>
        <div class="field">
          <el-input class="password"
                    type="password"
                    name="password"
                    v-model="password"
                    v-validate="'required|min:3'"
                    data-vv-as="密码"
                    :class="{'error':errors.has('password') }"
                    placeholder="密码"></el-input>
          <span v-show="errors.has('password')"
                class="help error">{{ errors.first('password') }}</span>
        </div>
        <el-button class="login" type="success" native-type="submit" :loading="logging">登录</el-button>
      </form>
    </el-dialog>
  </div>
</template>

<script>
import {Dialog, Input, Message} from 'element-ui'
import apiAuth from 'api/auth'
import Cookies from 'js-cookie'
import {cookieToken, cookieRefreshToken} from '@/const/cookies'
import 'md/validate'

export default {
  components: {
    [Dialog.name]: Dialog,
    [Input.name]: Input,
  },
  data() {
    return {
      dialogVisible: false,
      username: '',
      password: '',
      logging: false,
    }
  },
  computed: {
    loginStatus() {
      return this.$store.state.user.loginStatus
    },
    clientName() {
      return this.$store.state.user.clientName
    },
  },
  methods: {
    openLoginDialog() {
      this.dialogVisible = true
    },
    showError(err) {
      Message({
        message: err,
        type: 'error',
      })
    },
    async login() {
      let result = await this.$validator.validateAll()
      if (result) {
        this.logging = true
        try {
          let res = await apiAuth.login({
            username: this.username,
            password: this.password,
          })
          if(res.errcode) {
            switch(res.errcode) {
              case '30101':
                this.showError('无该用户')
                break
              case '30103':
                this.showError('密码错误')
                break
              default:
                this.showError('系统错误')
            }
            this.logging = false
            return
          }
          Cookies.set(cookieRefreshToken, res.refresh_token)
          Cookies.set(cookieToken, res.token)
          await this.$store.dispatch('fetchAccessToken')
          this.dialogVisible = false
        } catch (e) {
          if(e.message === 'no client') {
            this.showError('无法获取client id')
          } else {
            throw e
          }
        } finally {
          this.logging = false
        }
      }
    },
    async logout() {
      await apiAuth.logout()
      this.$store.commit('removeLoggedUser')
    },
  },
  created() {
    this.$store.dispatch('checkSession')
  },
}
</script>

<style scoped lang="scss">
  @import "~sty/var";
  .header{
    height: $headerHeight;
    background: #2e3436;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 300;
  }
  .header-left{
    margin-left: 24px;
    >.logo{
      vertical-align: top;
      width: 214px;
      height: 37px;
      margin-top: ($headerHeight - 37px) / 2;
    }
  }
  .login-button{
    margin-right: 66px;
    margin-top: ($headerHeight - 32px) / 2;
    width: 64px;
    height: 32px;
    border-radius: 4px;
    background: transparent;
    padding: 0 8px;
    border: solid 1px #ffffff;
    font-size: 14px;
    color: #ffffff;
  }
  .content {
    position: absolute;
    left: 0;
    top: $headerHeight;
    right: 0;
    bottom: 0;
    color: #333333;
  }
  .login{
    width: 100%;
  }
  .error{
    margin: 5px 0;
    display: block;
  }
  .field{
    margin-bottom: 20px;
  }
  .user-name{
    float: right;
    color: #ffffff;
    margin-right: 20px;
    line-height: 30px;
    margin-top: 15px;
  }
  .logout{
    color: $green;
    font-size: 14px;
    margin-left: 12px;
  }
</style>
