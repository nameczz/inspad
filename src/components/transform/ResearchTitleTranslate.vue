<template>
  <div>
    <div class="trans-header">
      <div class="container">
        标题翻译
      </div>
    </div>
    <div class="trans-body">
      <div class="trans-main">
        <div class="container">
          <div class="info">
            <div class="info-title">GET /compute/trans_title_cnen/</div>
            <div class="info-desc">
              基于最先进的神经网络算法，PatSnap 专利翻译 API 可以快速地将中文专利标题翻译成英文，BLEU score 高达 56.21，远超其他通用机器翻译引擎。
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
              <el-button type="success" size="small" class="translate float-left" @click="translate">
                提取
              </el-button>
              <div class="out-text float-left" v-html="outputText">
              </div>
            </div>
          </section>
          <section>
            <header><icon src="~svg/code.svg"/> Json Schema</header>
            <highlight :json="json"></highlight>
          </section>
        </div>
      </div>
      <copyright/>
    </div>
  </div>
</template>

<script>
import {Input} from 'element-ui'
import Highlight from 'md/highlight/Highlight'
import apiResearch from 'api/research'
export default {
  components: {
    [Input.name]: Input,
    Highlight,
  },
  data() {
    return {
      inputText: '具有应用可变电阻值主动固态电解质材料的内存胞元的内存组件及其制造方法',
      outputText: '',
      json: '',
    }
  },
  methods: {
    async translate() {
      let res = await apiResearch.transTitleCnEn({
        data: {text: this.inputText},
      })
      this.json = res
      console.log(res)
      if(res['error_code'] === 0) {
        this.outputText = res.data.text
      }
    },
  },
}
</script>

<style scoped lang="scss">
  @import "~sty/var";
  @import "~sty/components/transform";
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
