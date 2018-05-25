<template>
  <el-row :gutter="20" class="edit-note">
    <el-col :span="10">
      <div>
        <div class="editor-content">
          <div>
            <h4 class="time">Today</h4>
            <el-card shadow="never" class="edit_item" :body-style="{ padding: '0px'}">
              {{content.substring(0,80) + '...'}}
            </el-card>
            <span class="timeNow">{{timeNow}}</span>
          </div>
        </div>
      </div>
      <div>
        <h4 class="time">Tags:</h4>
        <el-tag class="tag-item" color="#52a6d8" v-for="(item,index) in dynamicTags" closable :key="index" v-if="dynamicTags.length > 0" @close="handleClose(item)">
          {{item}}
        </el-tag>
      </div>
      <div>
        <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
        </el-input>
        <el-button v-else class="button_new_tag" @click="showInput">+ New Tag</el-button>
      </div>
    </el-col>
    <el-col :span="14">
      <div>
        <summernote ref="content" id="content" :content="content"></summernote>
        <el-button class="submit" @click="postNote">Save</el-button>
      </div>
    </el-col>
  </el-row>

</template>
<script>

// import apiData from 'api/data'
import { Row, Col, Card, Tag } from 'element-ui'
import summernote from 'md/summernote/'
import moment from 'moment'

export default {
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Card.name]: Card,
    [Tag.name]: Tag,
    summernote
  },
  data() {
    return {
      content: '',
      config: {
        selector: 'textarea',
        height: 500,
        theme: 'modern',
        plugins: 'image link ',
        image_advtab: true,
        images_upload_url: 'postAcceptor.php',
        images_upload_base_path: '/some/basepath',
        images_upload_credentials: true
      },
      timeNow: moment().format('H:MM:SS'),
      dynamicTags: [],
      inputVisible: false,
      inputValue: ''
    }
  },
  created() {

  },
  watch: {
    content(val) {
      console.log(val)
    }
  },

  methods: {
    postNote() {
      const note = this.$refs.content.getCode()
      const html = this.$refs.content.getCodeWithoutTag()
      console.log(note)
      console.log(html)
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm() {
      const inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~sty/var";
@import "~sty/mixins";

.edit-note {
  .time {
    font-size: 16px;
    margin-bottom: 1rem;
    color: #3c4e59;
  }
  .timeNow {
    font-size: 14px;
    vertical-align: top;
  }
  @include card-item(#7592a4, 160px);
  .edit_item {
    cursor: auto;
  }
  .tag-item {
    margin-right: 0.5rem;
    color: #fff;
  }
  .submit {
    border: 1px solid $blue;
    color: $blue;
    margin-top: 1rem;
    float: right;
    &:hover {
      background: $blue;
      color: #fff;
    }
  }
  .button_new_tag {
    border: 1px dashed $blue;
    color: $blue !important;
    margin-top: 1rem;
    color: #3c4e59;
    &:hover {
      background: $blue;
      color: #fff !important;
    }
  }

  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    margin-top: 1rem;
    width: 90px;
    vertical-align: bottom;
  }
}
</style>


