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
            <div class="info-title">GET /compute/trans_abstr_cnen/</div>
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
      /*eslint-disable*/
      inputText: '本发明提供一种电池电源，包括多个电池模组，每个电池模组包括多个电池、位于该电池模组的第一侧且与该电池模组内各个电池电性连接的管理电路、位于该电池模组与该管理电路相背的第二侧且与该电池模组内各个电池热耦合的散热冷源。该管理电路用于管理该电池模组内各个电池的充放电。该散热冷源用于散发该电池模组内各个电池传导过来的热量。该多个电池模组排布成两列，且两列电池模组的第一侧邻近、相对设置。如此设置，可以避免该多个管理电路受该多个散热冷源散发的热量的影响，从而可保证该多个管理电路工作稳定、避免安全隐患。',
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
