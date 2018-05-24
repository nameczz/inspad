<template>
  <div>
    <el-container>
      <el-header class="header">
        <a class="float-left header-left">
          INSPAD
        </a>
        <div v-if="loginStatus==='logged'" class="user-name">
          <span>T</span>
          <a class="logout" @click="logout">logout</a>
        </div>
        <el-button v-else-if="loginStatus==='unlogged'"
                  class="login-button float-right"
                  @click="openLoginDialog">Login
        </el-button>
      </el-header>
      <!-- <el-header class="header">
        <el-row :gutter="20" class="container" style="margin: 0 auto">
          <el-col :span="4">
            <div class="grid-content bg-purple">INSPAD</div>
          </el-col>
          <el-col :span="6">
            <router-link :to="{name: 'note'}" class="header-nav"></router-link>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple"></div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple"></div>
          </el-col>
        </el-row>
      </el-header> -->

      <el-container class="container">
        <!-- <el-aside width="200px">
          <div class="inspad-menu">
            <el-menu default-active="2" :router='true'>
              <el-menu-item index="/note">
                <i class="el-icon-menu"></i>
                <span slot="title">Notepad</span>
              </el-menu-item>
              
              <el-menu-item index="/tags">
                <i class="el-icon-menu"></i>
                <span slot="title">Tags</span>
              </el-menu-item>
              <el-menu-item index="/note/123">
                <i class="el-icon-setting"></i>
                <span slot="title">Smart Graph</span>
              </el-menu-item>
            </el-menu>
          </div>

        </el-aside> -->
        <el-main class="inspad-main">
          <transition name="fade" mode="out-in">
            <router-view class="container"></router-view>
          </transition>
        </el-main>

      </el-container>

    </el-container>

  </div>
</template>

<script>
import { Header, Message, Container, Aside, Footer, Main, Row, Col, Menu, MenuItem, Card } from 'element-ui'
import apiAuth from 'api/auth'
import Cookies from 'js-cookie'
import { cookieToken, cookieRefreshToken, cookieUsername, cookieUserId } from '@/const/cookies'
import 'md/validate'
const jwtDecode = require('jwt-decode')

export default {
  components: {
    [Header.name]: Header,
    [Aside.name]: Aside,
    [Footer.name]: Footer,
    [Container.name]: Container,
    [Main.name]: Main,
    [Row.name]: Row,
    [Col.name]: Col,
    [Menu.name]: Menu,
    [MenuItem.name]: MenuItem,
    [Card.name]: Card,
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
    showUsername() {
      return this.$store.state.user.username
    },
  },
  methods: {
    showError(err) {
      Message({
        message: err,
        type: 'error',
      })
    },
    async login() {
      const result = await this.$validator.validateAll()
      if (result) {
        this.logging = true
        try {
          const res = await apiAuth.login({
            username: this.username,
            password: this.password,
          })
          const info = jwtDecode(res.token)
          if (res.errcode) {
            this.showError('Login Error')

            this.logging = false
            return
          }
          Cookies.set(cookieUserId, info.sub)
          Cookies.set(cookieRefreshToken, res.refresh_token)
          Cookies.set(cookieToken, res.token)
          Cookies.set(cookieUsername, this.username.trim())
          this.$store.commit('refreshLoggedUser')
        } finally {
          this.logging = false
        }
      }
    },
    async logout() {
      await apiAuth.logout()
      this.$store.commit('removeLoggedUser')
    },
  }
}
</script>

<style scoped lang="scss">
@import "~sty/var";

.header {
  padding-top: 14px;
  background: #fff;
  box-shadow: 0 1px 0 0 rgba(32, 76, 101, 0.3);
}
.header {
  height: $headerHeight;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 300;
}
.header-left {
  margin-left: 24px;
  > .logo {
    vertical-align: top;
    width: 214px;
    height: 37px;
    margin-top: ($headerHeight - 37px) / 2;
  }
}
.login-button {
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
.login {
  width: 100%;
}
.error {
  margin: 5px 0;
  display: block;
}
.field {
  margin-bottom: 20px;
}
.user-name {
  float: right;
  color: #ffffff;
  margin-right: 20px;
  line-height: 30px;
  margin-top: 15px;
}
.logout {
  color: $green;
  font-size: 14px;
  margin-left: 12px;
}
.header-nav {
  color: $blue;
}
.inspad-menu {
  background: #fff;
  box-shadow: 1px 1px 4px 1px rgba(32, 76, 101, 0.3);
}
.inspad-main {
  padding: 0;
  min-height: $min-height;
  overflow: hidden;
}
.el-menu {
  .is-active {
    background: #e8f0f5;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(30px);
}
</style>
