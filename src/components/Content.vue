<template>
  <div>
    <header class="header">
      <div class="container">
        <a class="float-left header-left">
          <icon class="logo" src="~svg/logo.svg"/>
        </a>
        <el-dropdown @command="handleUserCommand" v-if="loginStatus==='logged'" class="user-name">
          <a class="el-dropdown-link">
           {{$t('hi')+','+(showUsername || $t('user'))}}
          </a>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="logout">{{$t('signOut')}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button v-else-if="loginStatus==='unlogged'"
                   class="login-button float-right"
                   @click="openLoginDialog">{{$t('signIn')}}</el-button>
        <el-dropdown @command="selectLang" class="float-right lang">
          <span class="el-dropdown-link">
            {{getLang()}}<i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="en">{{getLang('en')}}</el-dropdown-item>
            <el-dropdown-item command="zh-CN">{{getLang('zh-CN')}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <ul class="nav-list">
          <li><a>{{$t('nav.tutorials')}}</a></li>
          <li><a>{{$t('nav.docs')}}</a></li>
          <li><a>{{$t('nav.support')}}</a></li>
        </ul>
      </div>
    </header>
    <router-view class="content"></router-view>
    <el-dialog
      :title="$t('signIn')"
      :visible.sync="dialogVisible"
      width="30%">
      <form @submit.prevent="login">
        <div class="field">
          <el-input class="username"
                    v-model="username"
                    name="username"
                    v-validate="'required|min:3'"
                    :data-vv-as="$t('userName')"
                    :class="{'error':errors.has('username') }"
                    :placeholder="$t('userName')"></el-input>
          <span v-show="errors.has('username')"
                class="help error">{{ errors.first('username') }}</span>
        </div>
        <div class="field">
          <el-input class="password"
                    type="password"
                    name="password"
                    v-model="password"
                    v-validate="'required|min:3'"
                    :data-vv-as="$t('password')"
                    :class="{'error':errors.has('password') }"
                    :placeholder="$t('password')"></el-input>
          <span v-show="errors.has('password')"
                class="help error">{{ errors.first('password') }}</span>
        </div>
        <el-button class="login" type="success" native-type="submit" :loading="logging">{{$t('signIn')}}</el-button>
      </form>
    </el-dialog>
  </div>
</template>

<script>
import { Dialog, Message, Dropdown, DropdownItem, DropdownMenu } from 'element-ui'
import apiAuth from 'api/auth'
import Cookies from 'js-cookie'
import { setLang } from 'md/lang'
import { cookieToken, cookieRefreshToken, cookieUsername } from '@/const/cookies'
export default {
  components: {
    [Dialog.name]: Dialog,
    [Dropdown.name]: Dropdown,
    [DropdownItem.name]: DropdownItem,
    [DropdownMenu.name]: DropdownMenu,
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
    getLang(lang) {
      return {
        en: 'EN',
        'zh-CN': 'CN',
      }[lang || this.$i18n.locale]
    },
    handleUserCommand(command) {
      this[command]()
    },
    selectLang(lang) {
      setLang(lang)
    },
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
      const result = await this.$validator.validateAll()
      if (result) {
        this.logging = true
        try {
          const res = await apiAuth.login({
            username: this.username,
            password: this.password,
          })
          if (res.errcode) {
            switch (res.errcode) {
              case '30101':
                this.showError(this.$t('error.noUser'))
                break
              case '30103':
                this.showError(this.$t('error.wrongPassword'))
                break
              case '30104':
                this.showError(this.$t('error.logged'))
                break
              case '30107':
                this.showError(this.$t('error.expired'))
                break
              default:
                this.showError(this.$t('error.systemError'))
            }
            this.logging = false
            return
          }
          Cookies.set(cookieRefreshToken, res.refresh_token)
          Cookies.set(cookieToken, res.token)
          Cookies.set(cookieUsername, this.username.trim())
          this.$store.commit('refreshLoggedUser')
          this.dialogVisible = false
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
}
</script>

<style scoped lang="scss">
  @import "~sty/var";
  @import "~sty/mixins";
  .header{
    height: $headerHeight;
    background: #002b33;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 300;
  }
  .header-left{
    >.logo{
      vertical-align: top;
      width: 152px;
      height: 33px;
      margin-top: ($headerHeight - 33px) / 2;
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
    color: #ffffff;
    margin-top: ($headerHeight - 32px) / 2;
    height: 32px;
    float: right;

    >.el-dropdown-link{
      display: block;
      border-radius: 18px;
      background-color: #237483;
      padding: 0 16px;
      font-size: 14px;
      width: 96px;
      height: 32px;
      line-height: 32px;
      @include text-truncate;
    }
  }
  .logout{
    color: $green;
    font-size: 14px;
    margin-left: 12px;
  }
  .el-dropdown.lang{
    color: #237483;
    cursor: pointer;
    margin-right: 18px;
    margin-top: ($headerHeight - 20px) / 2;
    height: 20px;
    line-height: 20px;
    font-size: 16px;
  }
  .nav-list{
    float: right;
    color: #62a9b6;
    white-space: nowrap;
    margin-top: ($headerHeight - 20px) / 2;
    margin-right: 144px;
    >li{
      display: inline-block;
      margin-left: 60px;
      >a{
        line-height: 20px;
        font-size: 18px;
        font-weight: bold;
        color: #62a9b6;
      }
      &:first-child{
        margin-left: 0;
      }
    }
  }
  @media (max-width: 999px){
    .nav-list {
      margin-right: 20px;
    }
  }
</style>
