<template>
  <div>
    <el-container>
      <el-header class="header">
        <el-row class="container" type="flex" justify="space-between">
          <el-col class=" header-left">
            INSPAD
          </el-col>
          <el-col v-if="loginStatus==='logged'" class="user_name">
            <span>T</span>
            <a class="logout" @click="logout">Logout</a>
          </el-col>
          <el-button v-else-if="loginStatus==='unlogged'" class="login-button" @click="openLoginDialog">Login
          </el-button>
        </el-row>

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

      <el-container>
        <el-aside width="280px">
          <div class="topics_menu">
            <el-menu :default-active="topics[0].id + ''" v-if="topics.length>0">
              <p class="topics_title">主题</p>
              <el-menu-item :index="topic.id + ''" v-for="(topic, index) in topics" :key="index" @click="clickedTopic(topic)">
                <span slot="title">{{topic.title}}</span>
              </el-menu-item>

              <el-button @click="newTopicVisible = true" type="primary" class="new_topic_btn">创建话题</el-button>
            </el-menu>

          </div>
        </el-aside>

        <el-aside width="400px">
          <ul class="idea_menu">
            <div class="topic_wrapper" v-show="choosedTopic.title !== ''">
              <h4>{{choosedTopic.title}}</h4>
              <p>{{choosedTopic.content}}</p>
            </div>
            <li class="single_idea" v-for="(idea,index) in ideas" :key="index">
              <el-row class="inspad_blue username" type="flex" justify="space-between">
                <el-col>{{idea.username}}</el-col>
                <el-col class="time">{{idea.createdTime}}</el-col>
              </el-row>
              <div class="inspad_black idea_content" :ref="`idea${index}`" v-html="idea.content">

              </div>
              <div class="button-wrapper">

                <li @click="vote(idea.id, 'unlike')">
                  <icon :src="require('svg/dislike.svg')" class="likeicon"></icon>
                  <span class="txt"> ({{idea.downCount}})</span>
                </li>

                <li @click="vote(idea.id, 'like')">
                  <icon :src="require('svg/like.svg')" class="likeicon"></icon>
                  <span class="txt"> ({{idea.upCount}})</span>
                </li>

                <li>
                  <icon :src="require('svg/comment.svg')" class="icon"></icon>
                  <span class="txt" @click="showIdeaDetail(idea.id, idea.content)">Comments ({{idea.commentCount}})</span>
                </li>
              </div>
            </li>
            <el-button type="primary" size="small" class="more_ideas_btn" @click="moreIdeas(true)" :loading="moreIdeasLoading" :disabled="moreIdeasStatus">{{moreIdeasTxt}}</el-button>
          </ul>
          <div class="idea_input_wrapper">
            <el-input placeholder="来，头脑风暴吧！" class="idea_input" v-model="ideaContent"></el-input>
            <el-button type="primary" class="idea_post" @click="ideaPost">发布</el-button>
          </div>

        </el-aside>
        <el-main class="inspad_main">
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </el-main>

      </el-container>

    </el-container>

    <el-dialog :title="$t('signIn')" :visible.sync="dialogVisible" width="30%">
      <form @submit.prevent="login">
        <div class="field">
          <el-input class="username" v-model="username" name="username" v-validate="'required|min:3'" :data-vv-as="$t('userName')" :class="{'error':errors.has('username') }" :placeholder="$t('userName')"></el-input>
          <span v-show="errors.has('username')" class="help error">{{ errors.first('username') }}</span>
        </div>
        <div class="field">
          <el-input class="password" type="password" name="password" v-model="password" v-validate="'required|min:3'" :data-vv-as="$t('password')" :class="{'error':errors.has('password') }" :placeholder="$t('password')"></el-input>
          <span v-show="errors.has('password')" class="help error">{{ errors.first('password') }}</span>
        </div>
        <el-button class="login" type="success" native-type="submit" :loading="logging">{{$t('signIn')}}</el-button>
      </form>
    </el-dialog>

    <el-dialog title="新建话题" :visible.sync="newTopicVisible" width="40%">
      <el-form :label-position="labelPosition" label-width="80px" :model="newTopic">
        <el-form-item label="Title">
          <el-input v-model="newTopic.title" :rows="4" placeholder="Topic Title Name"></el-input>
        </el-form-item>
        <el-form-item label="Content">
          <el-input v-model="newTopic.content" type="textarea" :rows="4" placeholder="Topic Description"></el-input>
        </el-form-item>
      </el-form>
      <div class="text-right">
        <el-button type="primary" class="" size="small" @click="NewTopic">Create Topic</el-button>
      </div>
    </el-dialog>

    <!-- <el-dialog title="邀请成员" :visible.sync="inviteMembersVisible" width="30%">
      <el-form label-width="80px" :model="members">
        <el-form-item label="Title" v-for="(item, index) in members" :key="index">
          <el-input v-model="members[index]" placeholder="输入您想邀请的成员邮箱"></el-input>
        </el-form-item>
        <el-button>添加成员</el-button>
      </el-form>
      <div class="text-right">
        <el-button type="primary" class="" size="small" @click="NewTopic">邀请所有成员</el-button>
      </div>
    </el-dialog> -->
  </div>
</template>

<script>
import { Header, Message, Container, Aside, Footer, Main, Row, Col, Menu, MenuItem, Card, Dialog, Input, Form, FormItem, Notification } from 'element-ui'
import apiAuth from 'api/auth'
import apiData from 'api/data'
import Cookies from 'js-cookie'
import { cookieToken, cookieRefreshToken, cookieUsername, cookieIdea, cookieUserId } from '@/const/cookies'
import 'md/validate'
let time = new Date().getTime()

export default {
  components: {
    [Input.name]: Input,
    [Dialog.name]: Dialog,
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
    [Form.name]: Form,
    [FormItem.name]: FormItem
  },
  data() {
    return {
      dialogVisible: false,
      newTopicVisible: false,
      inviteMembersVisible: false,
      moreIdeasLoading: false,
      moreIdeasStatus: false,
      moreIdeasTxt: '加载更多',
      username: '',
      password: '',
      logging: false,
      labelPosition: 'right',
      newTopic: {
        title: '',
        content: ''
      },
      topics: [],
      choosedTopic: { title: '', content: '', id: '' },
      ideas: [],
      ideaContent: '',
      page: 0,
      limits: 5,
      members: []
    }
  },
  mounted() {
    this.getTopics()

    // this.getNewComment()
  },
  computed: {
    loginStatus() {
      return this.$store.state.user.loginStatus
    },
    showUsername() {
      return this.$store.state.user.username
    },
    clickedTags() {
      return this.$store.state.tags.tags
    }
  },
  methods: {
    showError(err) {
      Message({
        message: err,
        type: 'error',
      })
    },
    addTag() {
      const highlights = document.getElementsByClassName('highlight')
      const self = this
      console.log(highlights.length)
      console.log(highlights[0])
      for (let i = 0; i < highlights.length; i++) {
        highlights[i].addEventListener('click', function () {
          const tag = this.innerText
          console.log(tag)
          self.$store.commit('pushTag', tag)
          self.$router.push({ name: 'topicsSearch' })
        }, false)
      }
    },
    showIdeaDetail(id, content) {
      this.$store.commit('setIdea', content)
      Cookies.set(cookieIdea, content)
      this.$router.push({
        name: 'ideaDetail',
        params: { ideaId: id }
      })
    },
    clickContent(refId) {
      const content = this.$refs[refId]
      console.log(content)
    },
    async clickedTopic(topic) {
      this.page = 0
      this.moreIdeasTxt = '加载更多！'
      this.moreIdeasStatus = false
      this.choosedTopic.id = topic.id
      this.choosedTopic.title = topic.title
      this.choosedTopic.content = topic.content
      this.$store.commit('setTopic', topic.title)
      this.moreIdeas(false)
    },
    async NewTopic() {
      const userId = Cookies.get(cookieUserId)
      const data = this.newTopic
      data.uid = userId
      const result = await apiData.postTopic(data)
      this.topics.push(result)
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
            this.showError('Login Error')

            this.logging = false
            return
          }

          Cookies.set(cookieRefreshToken, res.refresh_token)
          Cookies.set(cookieToken, res.token)
          Cookies.set(cookieUsername, this.username.trim())
          const userInfo = await apiData.getUserInfo({
            username: this.username
          })
          Cookies.set(cookieUserId, userInfo.id)
          await this.getTopics()
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
    async getTopics() {
      const userId = Cookies.get(cookieUserId)
      const res = await apiData.getTopics({ uid: userId })
      this.topics.slice(0, this.topics.length)
      this.topics = res
      this.clickedTopic(res[0])
      return res
    },
    async moreIdeas(isLoading) {
      const userId = Cookies.get(cookieUserId)
      this.moreIdeasLoading = isLoading
      const config = {
        offset: this.limits * this.page,
        limit: this.limits,
        topicId: this.choosedTopic.id,
        uid: userId
      }
      try {
        const ideas = await apiData.getIdeasById(config)
        if (this.page === 0) {
          this.ideas.splice(0, this.ideas.length)
        }
        if (ideas.length === 0) {
          this.moreIdeasTxt = '已加载全部Ideas!'
          this.moreIdeasStatus = true
          return
        }
        ideas.map(val => {
          const keywords = ['区块链', '节点']
          keywords.map(key => {
            const regx = new RegExp(key, 'g')
            const highlight = `<span class="highlight">${key}</span>`
            val.content = val.content.replace(regx, highlight)
            return false
          })
          val.createdTime = this.$moment(val.createdTime).format('YYYY-MM-DD HH:mm:ss')
          this.ideas.push(val)
          return val
        })
        this.page++
      } finally {
        this.moreIdeasLoading = false
        this.$nextTick(() => {
          this.addTag()
        })
      }
    },
    async ideaPost() {
      if (this.ideaContent.trim().length === 0) {
        this.showError('请填写您的头脑风暴！')
      }
      const userId = Cookies.get(cookieUserId)
      const username = Cookies.get(cookieUsername)
      const config = {
        uid: userId,
        relatedId: this.choosedTopic.id,
        content: this.ideaContent
      }
      const result = await apiData.postIdea(config)
      console.log(result)
      result.username = username.split('@')[0]
      result.createdTime = this.$moment(result.createdTime).format('YYYY-MM-DD HH:mm:ss')
      this.ideas.push(result)
    },
    async vote(id, type) {
      const userId = Cookies.get(cookieUserId)
      const config = {
        uid: userId,
        ideaId: id
      }
      if (type === 'like') {
        apiData.postIdeaUp(config)
      } else {
        const result = await apiData.postIdeaDown(config)
        console.log(result)
      }
    },
    async getNewComment() {
      const config = {
        uid: 0,
        createdTime: time,
        topicId: this.choosedTopic.id
      }

      config.topicId = this.choosedTopic.id
      const result = await apiData.getNewComment(config)
      if (result.length > 0) {
        Notification({
          title: '有新增评论',
          dangerouslyUseHTMLString: true,
          message: `<a href="#/topics/topic/idea/${result[0].relatedId}">${result[0].content}</a>`,
          duration: 0
        })
        console.log(result)
        time = new Date().getTime()
      }
      this.getNewComment()
    },
    openLoginDialog() {
      this.dialogVisible = true
    }
  }
}
</script>

<style scoped lang="scss">
@import "~sty/var";
$black: #3c4e59;
$gray: #828282;

.header {
  padding-top: 14px;
  background: #fff;
  box-shadow: 0 1px 0 0 rgba(32, 76, 101, 0.3);
}

.login-button {
  margin-right: 66px;
  width: 64px;
  height: 32px;
  border-radius: 4px;
  background: transparent;
  padding: 0 8px;
  border: solid 1px $blue;
  font-size: 14px;
  color: $blue;
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
.user_name {
  padding-right: 40px;
  text-align: right;
  color: $blue;
  line-height: 30px;
  span {
    display: inline-block;
    width: 30px;
    height: 30px;
    border: 1px solid #226892;
    border-radius: 50%;
    text-align: center;
  }
}
.logout {
  color: $blue;
  font-size: 16px;
  margin-left: 12px;
}
.header-nav {
  color: $blue;
}
.topics_menu {
  background: #fff;
  .el-menu {
    height: calc(100vh - 160px);
    border: none;
    overflow: auto;
    .el-menu-item {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .new_topic_btn {
      position: absolute;
      bottom: 0;
      width: 100%;
      border-radius: 0;
    }
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .topics_title {
    padding: 1rem 0 1rem 20px;
    border-bottom: 1px solid #eee;
    font-size: 18px;
    color: $blue;
  }
}

.topic_wrapper {
  background: #f1f1f1;
  padding: 0 10px;
  h4 {
    font-size: 18px;
    color: $blue;
    height: 58px;
    line-height: 58px;
  }
  p {
    height: 56px;
    line-height: 1.5;
    font-size: 14px;
    color: $gray;
    border-bottom: 1px solid #bcbcbc;
  }
}

.inspad_main,
.idea_menu {
  background: #fff;
  height: calc(100vh - 160px);
  box-sizing: border-box;
  padding: 0;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
}

.idea_menu {
  background: #f1f1f1 !important;
  padding: 0 0.8rem;
  padding-bottom: 2rem;
  .el-menu {
    background: #f1f1f1;
  }
}
.idea_input_wrapper {
  position: relative;
  top: -28px;
  .idea_input {
    width: calc(100% - 57px);
  }
  .idea_post {
    position: absolute;
    right: 0;
    top: 0;
  }
}

.inspad_main {
  padding: 0 10px 10px 10px;
}

.el-menu {
  .is-active {
    background: #e8f0f5;
  }
}

.single_idea {
  padding: 10px 0;
  border-bottom: 1px solid #e5e5e5;
  .time {
    text-align: right;
    font-size: 12px;
  }
  .username {
    font-size: 14px;
  }
  .idea_content {
    position: relative;
    margin-top: 6px;
    font-size: 12px;
    border: 1px solid #fff;
    padding: 6px;
    border-radius: 6px;
    background: #fff;
    box-shadow: 0 1px 4px 0 rgba(32, 76, 101, 0.3);
    cursor: pointer;
    &:after {
      position: absolute;
      content: " ";
      top: -20px;
      border: 10px solid transparent;
      border-left: 10px solid #fff;
      transform: rotate(-90deg);
      left: 20px;
    }
  }
  .button-wrapper {
    text-align: right;
    li {
      display: inline-block;
      font-size: 12px;
      margin-left: 1rem;
      color: $blue;
      cursor: pointer;
      .txt {
        display: inline-block;
        vertical-align: middle;
      }
      .icon {
        width: 14px;
        height: 14px;
      }
    }
  }
}
.title {
  text-align: center;
  font-size: 18px;
}

.more_ideas_btn {
  width: 100%;
  margin-top: 1rem;
}

.inspad_blue {
  color: $blue;
}
.inspad_black {
  color: $black;
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
