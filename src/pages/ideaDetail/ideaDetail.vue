<template>
    <div class="inspad_comment">
        <section class="idea_wrapper">
            <h4>{{topicTitle}}</h4>
            <p class="desc" v-html="ideaContent"></p>
            <ul class="button_wrapper" @click="showCommentDia('IDEA')">
                <li>
                    <icon :src="require('svg/comment.svg')" class="icon"></icon>
                    <span class="vote">回复</span>
                </li>
            </ul>
        </section>
        <section class="comment_wrapper">
            <ul>
                <li v-for="(ideaComment,index) in ideaComments" :key="index">
                    <span class="username">{{ideaComment.username}}:</span>
                    <span class="comment">{{ideaComment.content}}</span>
                    <div class="sub_comment" v-for="(comment,num) in ideaComment.children" :key="num">
                        <span>{{comment.username}}:</span>
                        <span>{{comment.content}}</span>
                    </div>
                    <el-row class="button_bottom" type="flex" justify="space-between">
                        <el-col>{{ideaComment.createdTime}}</el-col>
                        <el-col class="comment" @click.native="showCommentDia('COMMENT',ideaComment.id,index)">回复</el-col>
                    </el-row>
                </li>
            </ul>
        </section>

        <el-dialog title="评论" :visible.sync="newCommentVisible" width="30%">
            <el-form label-width="80px" :model="newComment">
                <el-form-item label="内容">
                    <el-input v-model="newComment.content" placeholder="请输入您的回复"></el-input>
                </el-form-item>
            </el-form>
            <div class="text-right">
                <el-button type="primary" class="" size="small" @click="uplodComment" :loading="commentLoading">回复</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import apiData from 'api/data'
import { Row, Col, Dialog, FormItem, Form } from 'element-ui'
import Cookies from 'js-cookie'
import { cookieUserId, cookieUsername, cookieIdea } from '@/const/cookies'

export default {
    components: {
        [Row.name]: Row,
        [Col.name]: Col,
        [Dialog.name]: Dialog,
        [FormItem.name]: FormItem,
        [Form.name]: Form
    },
    data() {
        return {
            ideaComments: [],
            newCommentVisible: false,
            newComment: {
                type: 'IDEA',
                relatedId: '',
                uid: '',
                content: '',
                index: -1
            },
            commentLoading: false
        }
    },
    created() {
        this.getIdeaComments()
    },
    watch: {
        $route(to, from) {
            this.getIdeaComments()
        }
    },
    computed: {
        topicTitle() {
            return this.$store.state.idea.topic
        },
        ideaContent() {
            return this.$store.state.idea.idea === '' ? Cookies.get(cookieIdea) : this.$store.state.idea.idea
        }
    },
    methods: {
        async getIdeaComments() {
            const ideaId = this.$route.params.ideaId
            const config = {
                relatedId: ideaId,
                type: 'IDEA'
            }
            const result = await apiData.getComments(config)
            result.map(val => {
                val.username = val.username.split('@')[0]
                val.createdTime = this.$moment(val.createdTime).format('YYYY-MM-DD HH:mm:ss')
                return val
            })
            this.ideaComments.splice(0, this.ideaComments.length)
            this.ideaComments = result
            console.log(result)
        },
        showCommentDia(type, commentId, index) {
            console.log(commentId)
            const userId = Cookies.get(cookieUserId)
            const username = Cookies.get(cookieUsername)
            this.newCommentVisible = true
            this.newComment.uid = userId
            this.newComment.username = username
            if (type === 'IDEA') {
                this.newComment.type = 'IDEA'
                this.newComment.relatedId = this.$route.params.ideaId
            } else {
                this.newComment.type = 'COMMENT'
                this.newComment.relatedId = commentId
                this.newComment.index = index
            }
        },
        async uplodComment() {
            this.commentLoading = true
            const result = await apiData.postComment(this.newComment)
            result.children = []
            result.createdTime = this.$moment(result.createdTime).format('YYYY-MM-DD HH:mm:ss')
            if (this.newComment.type === 'IDEA') {
                this.ideaComments.push(result)
            } else if (this.newComment.index > -1) {
                this.getIdeaComments()
            }
            this.commentLoading = false
            this.newCommentVisible = false
        }
    }
}
</script>

<style scoped lang="scss">
@import "~sty/var";
$gray: #828282;
$comment_color: #999;
$gray_border: #bcbcbc;
.idea_wrapper {
  margin: 0;
  padding-bottom: 18px;
  border-bottom: 1px solid $gray_border;
  h4 {
    font-size: 18px;
    color: $blue;
    height: 58px;
    line-height: 58px;
  }
  .desc {
    line-height: 1.5;
    font-size: 14px;
    color: #828282;
  }
  .button_wrapper {
    text-align: right;
    font-size: 14px;
    li {
      cursor: pointer;
    }
  }
}
.comment_wrapper {
  margin-top: 10px;
  font-size: 14px;
  .username {
    color: $blue;
  }
  .comment {
    font-size: 12px;
    color: $gray;
  }
  li {
    line-height: 1.3;
    padding: 10px 0;
    border-bottom: 1px solid $gray_border;
  }
  .sub_comment {
    padding: 8px;
    background: #f6f6f6;
    border-radius: 8px;
    font-size: 12px;
    margin-top: 8px;
    color: $comment_color;
  }
  .button_bottom {
    margin-top: 8px;
    font-size: 12px;
    color: $comment_color;
    .comment {
      text-align: right;
      cursor: pointer;
    }
  }
}
</style>
