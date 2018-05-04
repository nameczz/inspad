<template>
  <div>
    <div class="trans-header">
      <div class="container">
        摘要翻译
      </div>
    </div>
    <div class="trans-body">
      <div class="trans-main">
        <div class="container">
          <div class="info">
            <div class="info-desc">
              基于最先进的神经网络算法，PatSnap 专利翻译 API 可以快速地将中文专利摘要翻译成英文，BLEU score 高达 49.23，远超其他通用机器翻译引擎。
            </div>
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
                提取
              </el-button>
              <div class="out-text float-left" v-html="outputText">
              </div>
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
import JsonSchema from '@/components/busi/JsonSchema'
import apiResearch from 'api/research'
import inputText from '@/const/input/abstract-translate'
export default {
  components: {
    JsonSchema,
  },
  data() {
    return {
      inputText: inputText,
      outputText: '',
      json: '',
      loading: false,
    }
  },
  methods: {
    async translate() {
      this.loading = true
      try {
        let res = await apiResearch.transAbstrCnen({
          data: {text: this.inputText},
        })
        this.json = res
        if(res['error_code'] === 0) {
          this.outputText = res.data
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
