<template>
  <el-row class="subject_detail">
    <el-col :span="10" class="subject_ideas">
      <h2 class="title">有哪些旅行神器值得推荐？</h2>
      <ul class="ideas">
        <li class="single_idea" v-for="(idea,index) in ideas" :key="index">
          <p class="inspad_blue">
            <span>{{idea.username}}</span>
            <span class="time">{{idea.createdTime}}</span>
          </p>
          <div class="inspad_black idea_content" v-html="idea.content">

          </div>
          <div class="button-wrapper">
            <li>
              <icon :src="voteIcon" class="icon"></icon>
              <span class="txt">Like ({{idea.likeCount}})</span>
            </li>

            <li class="fetch-font-14 fetch-226892">
              <icon :src="require('svg/comment.svg')" class="icon"></icon>
              <span class="txt">Comments ({{idea.commentsCount}})</span>
            </li>
          </div>
        </li>

      </ul>
    </el-col>
    <el-col :span="13" class="subject_content">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </el-col>
  </el-row>
</template>

<script>
import { Row, Col, Card } from 'element-ui'
export default {
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Card.name]: Card
  },
  data() {
    return {
      voteIcon: require('svg/vote.svg'),
      ideas: [
        {
          username: '马蜂窝问答君',
          createdTime: '2018-5-23 12:00:00',
          content: `顺德，牛展煲仔饭。就是这个《寻味顺德》中骑摩托<span class="highlight">不戴头盔</span>（手动艾特@顺德交警）的男人的店。
              纪录片中他给我的印象是一个爱生活有个性的神奇老板，当时我是满心期待想和老板来个合影的~！毕竟片中的他，实在可爱。可是做攻略的时候网友们的评价却一致的差差差，...`,
          likeCount: 100,
          commentsCount: 10
        },
        {
          username: '马蜂窝问答君2',
          createdTime: '2018-5-23 13:00:00',
          content: `日本的美食，不分是不是樱花季得啦~不过我前年也是在樱花盛开的时候去的，超级美推荐几个我觉得特别好吃的！1.鸟贵族：鸟贵族是吃鸟烧地方，新宿的鸟贵族店很多，而且机会都要排队，毕竟像这种又好吃又便宜还营业到很晚的店这边很少。人均280円！ 我们去的店地址...`,
          likeCount: 10,
          commentsCount: 11
        },
        {
          username: '马蜂窝问答君3',
          createdTime: '2018-5-23 14:00:00',
          content: `你好  来青海湖第一站是西宁  西宁的莫家街是必须要去的  还有马步芳公馆   东关青真大寺     来青海湖有两条比较热门的路线  也是两条很成熟的路线  甘青七天大环线和环青海湖四天小环线第一条  甘青七天大环线 &...`,
          likeCount: 102,
          commentsCount: 100
        },
        {
          username: '马蜂窝问答君',
          createdTime: '2018-5-23 12:00:00',
          content: `顺德，牛展煲仔饭。就是这个《寻味顺德》中骑摩托不戴头盔（手动艾特@顺德交警）的男人的店。
              纪录片中他给我的印象是一个爱生活有个性的神奇老板，当时我是满心期待想和老板来个合影的~！毕竟片中的他，实在可爱。可是做攻略的时候网友们的评价却一致的差差差，...`,
          likeCount: 100,
          commentsCount: 10
        },
        {
          username: '马蜂窝问答君2',
          createdTime: '2018-5-23 13:00:00',
          content: `日本的美食，不分是不是樱花季得啦~不过我前年也是在樱花盛开的时候去的，超级美推荐几个我觉得特别好吃的！1.鸟贵族：鸟贵族是吃鸟烧地方，新宿的鸟贵族店很多，而且机会都要排队，毕竟像这种又好吃又便宜还营业到很晚的店这边很少。人均280円！ 我们去的店地址...`,
          likeCount: 10,
          commentsCount: 11
        },
        {
          username: '马蜂窝问答君3',
          createdTime: '2018-5-23 14:00:00',
          content: `你好  来青海湖第一站是西宁  西宁的莫家街是必须要去的  还有马步芳公馆   东关青真大寺     来青海湖有两条比较热门的路线  也是两条很成熟的路线  甘青七天大环线和环青海湖四天小环线第一条  甘青七天大环线 &...`,
          likeCount: 102,
          commentsCount: 100
        }
      ]

    }
  }
}
</script>
<style lang="scss" scoped>
@import "~sty/var";
@import "~sty/mixins";
$black: #3c4e59;
.subject_detail {
  padding: 10px;
  .subject_ideas,
  .subject_content {
    height: calc(100vh - 120px);
    font-size: 14px;
    padding: 10px;
    background: #fff;
    box-shadow: 1px 1px 4px 1px rgba(32, 76, 101, 0.3);
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .subject_ideas {
    margin-right: 1rem;
  }

  .single_idea {
    padding: 10px 0;
    border-bottom: 1px solid #e5e5e5;
    .time {
      margin-left: 1rem;
      font-size: 12px;
    }

    .idea_content {
      font-size: 12px;
    }
    .button-wrapper {
      text-align: right;
      li {
        display: inline-block;
        font-size: 12px;
        margin-left: 1rem;
        color: $blue;
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
  .inspad_blue {
    color: $blue;
  }
  .inspad_black {
    color: $black;
  }
  .highlight {
    color: #226892 !important;
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

