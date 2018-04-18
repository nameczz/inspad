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
      inputText: '本发明属于锂离子电池技术领域，具体公开了一种锂离子电池负极材料、负极和锂离子电池。所述锂离子电池负极材料包括水溶性粘结剂，所述水溶性粘结剂为接枝改性魔芋葡甘露聚糖。本发明实施例提供的锂离子电池负极材料，粘结剂采用接枝改性魔芋葡甘露聚糖，由于该粘结剂具有优越的柔顺及粘结性能，因此可降低锂离子电池负极材料中粘结剂的使用量，使得负极活性物质在负极材料中所占的比重增大，进而使得锂离子电池能量密度获得提升，提高了锂离子电池性能。',
      outputText: '',
      json: '',
    }
  },
  methods: {
    async translate() {
      let res = await apiResearch.transAbstrCnen({
        data: {text: this.inputText},
      })
      this.json = res
      console.log(res)
      if(res['error_code'] === 0) {
        this.outputText = res.data
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
