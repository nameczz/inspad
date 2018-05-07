<template>
  <div>
    <header class="header">
      <a class="float-left header-left">
        <icon class="logo" src="~svg/open-api.svg"/>
      </a>
      <div v-if="loginStatus==='logged'" class="user-name">
        {{$t('hello')+'，'+(showUsername || $t('user'))}}
        <a class="logout" @click="logout">{{$t('signOut')}}</a>
      </div>
      <el-button v-else-if="loginStatus==='unlogged'"
                 class="login-button float-right"
                 @click="openLoginDialog">{{$t('signIn')}}</el-button>
      <el-dropdown @command="selectLang" class="float-right">
        <span class="el-dropdown-link">
          {{getLang()}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="en">{{getLang('en')}}</el-dropdown-item>
          <el-dropdown-item command="zh-CN">{{getLang('zh-CN')}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
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
import {Dialog, Message, Dropdown, DropdownItem, DropdownMenu} from 'element-ui'
import apiAuth from 'api/auth'
import Cookies from 'js-cookie'
import {setLang} from 'md/lang'
import {cookieToken, cookieRefreshToken, cookieUsername} from '@/const/cookies'
import 'md/validate'
import i18n from 'lang/content'
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
        'en': 'English',
        'zh-CN': '中文',
      }[lang || process.env.LANG]
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
      let result = await this.$validator.validateAll()
      if (result) {
        this.logging = true
        try {
          let res = await apiAuth.login({
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
  created() {
    this.$store.dispatch('checkSession')
  },
  i18n: {
    messages: {
      [process.env.LANG]: i18n,
    },
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
  .el-dropdown{
    color: #ffffff;
    cursor: pointer;
    margin-right: 15px;
    margin-top: ($headerHeight - 20px) / 2;
    height: 20px;
    line-height: 20px;
  }
</style>
