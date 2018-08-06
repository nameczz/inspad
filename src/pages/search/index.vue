<template>
    <div class="inspad_search">
        <section class="search_box">
            <span style="margin-right: 0.5rem">搜索:</span>
            <el-tag class="tag_item" color="#52a6d8" v-for="(item,index) in clickedTags" closable :key="index" v-if="clickedTags.length > 0" @close="handleClose(item)">
                {{item}}
            </el-tag>

            <el-input class="input_new_tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
            </el-input>
            <el-button v-else class="button_new_tag" @click="showInput">+ 搜索标签</el-button>
        </section>
        <section class="search_result">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="相关新闻" name="first">
                    <ul>
                        <li class="search_item" v-for="(item,index) in searchResults" :key="index">
                            <h4>
                                <a :href="item.url" target="blank">{{item.title}}</a>
                            </h4>
                            <p v-html="item.content"></p>
                        </li>
                    </ul>

                </el-tab-pane>
                <el-tab-pane label="相关期刊" name="second">
                    <ul>
                        <li class="search_item" v-for="(item,index) in searchResults" :key="index">
                            <h4>
                                <a :href="item.url" target="blank">{{item.title}}</a>
                            </h4>
                            <p v-for="(word,num) in item.content" :key="num" v-html="word"></p>
                        </li>

                    </ul>
                </el-tab-pane>
                <el-tab-pane label="相关专利文献" name="third">
                    <ul>
                        <li class="search_item" v-for="(item,index) in searchResults" :key="index">
                            <h4>
                                {{item.title}}
                            </h4>
                            <p>
                                <span class="pn_num">PN: </span>
                                {{item.pn}}
                            </p>
                            <p v-html="item.content"></p>
                        </li>

                    </ul>
                </el-tab-pane>
            </el-tabs>
        </section>
        <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :current-page.sync="currentPage" :total="pageTotal" v-if="pageTotal>limit" class="pagination">
        </el-pagination>
    </div>
</template>
<script>
import { Row, Col, Card, Tag, TabPane, Tabs, Pagination } from 'element-ui'
import apiData from 'api/data'

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
            activeName: 'first',
            currentPage: 0,
            limit: 10,
            pageTotal: 0,
            searchResults: []
        }
    },
    watch: {
        clickedTags() {
            this.getDifferentResult()
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
        async getPeriodical() {
            const config = {
                offset: this.currentPage * this.limit,
                limit: this.limit,
                queryAll: this.clickedTags
            }
            const result = await apiData.getPeriodical(config)
            if (result.success) {
                const data = result.data.list
                this.pageTotal = result.data.total
                this.searchResults.splice(0, this.searchResults.length)
                data.map(val => {
                    const singleResult = {
                        title: val.title,
                        url: val.url,
                        content: val.content
                    }
                    this.searchResults.push(singleResult)
                    return val
                })
            }
            console.log(result)
        },
        async getNews() {
            const config = {
                offset: this.currentPage * this.limit,
                limit: this.limit,
                queryAll: this.clickedTags.join(' and ')
            }
            const result = await apiData.getNews(config)

            const data = result.value
            this.pageTotal = result.totalEstimatedMatches
            this.searchResults.splice(0, this.searchResults.length)
            data.map(val => {
                const singleResult = {
                    title: val.name,
                    url: val.url,
                    content: val.description
                }
                this.searchResults.push(singleResult)
                return val
            })
        },
        async getPatent() {
            const config = {
                offset: this.currentPage * this.limit,
                limit: this.limit,
                queryAll: this.clickedTags.join(' ')
            }
            const result = await apiData.getPatent(config)
            console.log(result)
            if (result.statusCode === 200) {
                const data = result.results
                this.pageTotal = result.resultCount
                this.searchResults.splice(0, this.searchResults.length)
                data.map(val => {
                    const singleResult = {
                        title: val.title[0].text,
                        pn: val.pn,
                        content: val.abstract[0].text
                    }
                    this.searchResults.push(singleResult)
                    return val
                })
            }
        },
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
        getDifferentResult() {
            if (this.clickedTags.length === 0) {
                return false
            }
            switch (this.activeName) {
                case 'first':
                    this.getNews()
                    break
                case 'second':
                    this.getPeriodical()
                    break
                case 'third':
                    this.getPatent()
                    break
                default:
                    console.error('无匹配类型')
            }
        },
        handleClick(tab, event) {
            this.searchResults.splice(0, this.searchResults.length)
            this.pageTotal = 0
            this.getDifferentResult()
        },
        handleCurrentChange(val) {
            this.getDifferentResult()
        }
    }

}
</script>
<style lang="scss" scoped>
@import "~sty/var";
$black: #3c4e59;
$gray: #828282;
$comment_color: #999;
$gray_border: #bcbcbc;

.inspad_search {
  .search_box {
    line-height: 1.5;
    padding: 10px 0;
    margin-top: 10px;
    border-bottom: 1px solid #dcdfe6;
  }

  .search_result {
    .search_item {
      padding-right: 20px;
      line-height: 1.5;
      padding-bottom: 10px;
      border-bottom: 1px solid $gray_border;
      h4 {
        color: $blue;
        font-size: 18px;
        margin: 10px 0;
      }
      p {
        font-size: 14px;
        color: $black;
      }
      .pn_num {
        color: $blue;
      }
    }
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


