<template>
    <div class="inspad_search">
        <div class="search_box">
            <span style="margin-right: 0.5rem">Search:</span>
            <el-tag 
                class="tag_item"
                color="#52a6d8"
                v-for="(item,index) in dynamicTags"
                closable
                :key="index"
                v-if="dynamicTags.length > 0"
                @close="handleClose(item)"
                >
                {{item}}
            </el-tag>
       
            <el-input
                class="input_new_tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
            >
            </el-input>
            <el-button v-else class="button_new_tag" @click="showInput">+ New Tag</el-button>
        </div>
    </div>
</template>
<script>
import { Row, Col, Card, Tag } from 'element-ui'
import apiData from 'api/data'

export default {
    components: {
        [Row.name]: Row,
        [Col.name]: Col,
        [Card.name]: Card,
        [Tag.name]: Tag
    },
    data() {
        return {
            dynamicTags: [],
            inputVisible: false,
            inputValue: ''
        }
    },
    created() {
        const subjectId = this.$route.params.subjectId
        console.log(subjectId)
        apiData.getNote().then(res => {
            this.content = res.body
            this.dynamicTags = res.tags
        })
    },
    methods: {
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
.inspad_search {
  .search_box {
    line-height: 1.5;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #dcdfe6;
  }

  .tag_item {
    margin: 0 0.5rem 0.5rem 0;
    color: #fff;
  }
  .button_new_tag {
    border: 1px dashed $blue;
    color: $blue !important;
    height: 20px;
    line-height: 20px;
    padding-top: 0;
    padding-bottom: 0;
    color: #3c4e59;
    &:hover {
      background: $blue;
      color: #fff !important;
    }
  }
  .input_new_tag {
    height: 20px;
    width: 90px;
  }
}
</style>


