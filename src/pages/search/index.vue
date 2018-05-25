<template>
    <div class="inspad_search">
        <section class="search_box">
            <span style="margin-right: 0.5rem">Search:</span>
            <el-tag class="tag_item" color="#52a6d8" v-for="(item,index) in clickedTags" closable :key="index" v-if="clickedTags.length > 0" @close="handleClose(item)">
                {{item}}
            </el-tag>

            <el-input class="input_new_tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
            </el-input>
            <el-button v-else class="button_new_tag" @click="showInput">+ New Tag</el-button>
        </section>
        <section>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="相关新闻搜索" name="first">
                    <ul>
                        <li></li>
                    </ul>
                    <el-pagination layout="prev, pager, next" :total="1000">
                    </el-pagination>
                </el-tab-pane>
                <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
                <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
                <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
            </el-tabs>
        </section>
    </div>
</template>
<script>
import { Row, Col, Card, Tag, TabPane, Tabs, Pagination } from 'element-ui'

// import apiSearch from 'api/research'

export default {
    components: {
        [Tabs.name]: Tabs,
        [Pagination.name]: Pagination,
        [TabPane.name]: TabPane,
        [Row.name]: Row,
        [Col.name]: Col,
        [Card.name]: Card,
        [Tag.name]: Tag
    },
    data() {
        return {
            inputVisible: false,
            inputValue: '',
            activeName: 'first'
        }
    },
    created() {

        // const config = {
        //     query_all_logic_op: 'and',
        //     query_all: 'apple'
        // }
        // apiSearch.searchNews(config).then(res => {
        //     console.log(res)
        // })
    },
    computed: {
        clickedTags() {
            return this.$store.state.tags.tags
        }
    },
    methods: {
        handleClose(tag) {
            this.$store.commit('deleteTag', tag)
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
                this.$store.commit('pushTag', inputValue)
            }
            this.inputVisible = false
            this.inputValue = ''
        },
        handleClick(tab, event) {
            console.log(tab, event)
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
    padding: 0.5rem;
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


