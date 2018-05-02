<template>
  <div>
    <div class="trans-header">
      <div class="container">
        中文相似词
      </div>
    </div>
    <div class="trans-body">
      <div class="trans-main">
        <div class="container">
          <div class="info">
            <div class="info-desc">用于对提取的关键字进行对应的相似的words/phrases搜索</div>
          </div>
          <section>
            <header><icon src="~svg/view.svg"/> 案例演示</header>
            <div class="clearfix">
              <el-input
                class="input-text float-left"
                type="textarea"
                resize="none"
                :rows="4"
                placeholder="请输入内容"
                v-model="inputText"
                name="inputText"
                v-validate="'required'"
                data-vv-as="文本"
                :class="{'error':errors.has('inputText') }">
              </el-input>
              <el-button type="success" size="small" class="translate float-left" :loading="loading" @click="translate">
                识别
              </el-button>
              <div class="out-text float-left" v-html="outputText" />
            </div>
          </section>
          <json-schema :json="json"></json-schema>
        </div>
      </div>
      <copyright/>
    </div>
  </div>
</template>

<script>
import {Input} from 'element-ui'
import JsonSchema from '@/components/busi/JsonSchema'
import apiResearch from 'api/research'
export default {
  components: {
    [Input.name]: Input,
    JsonSchema,
  },
  data() {
    return {
      inputText: '智慧芽是一家科技公司.',
      outputText: '',
      json: '',
      loading: false,
    }
  },
  methods: {
    async translate() {
      this.loading = true
      try {
        let res = await apiResearch.getCnSimilarWords({
          data: {
            nterms: this.inputText.length,
            ntopics: 5,
            text: this.inputText,
          },
        })
        this.json = res
        if(res['error_code'] === 0) {
          this.outputText = res.data.map(item => {
            return `${item.keyword}： ${item.terms.map(t => t.keyword).join(',')}`
          }).join('<br>')
        }
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped lang="scss">
  @import "~sty/var";
  .input-text{
    width: 366px;
  }
  .translate{
    width: 80px;
    margin: 0 20px;
  }
  .out-text{
    width: 366px;
    height: 96px;
    background: #ffffff;
    border-radius: 4px;
    font-size: 14px;
    line-height: 1.5;
    padding: 6px 16px;
    box-sizing: border-box;
    overflow-y: auto;
  }
</style>
