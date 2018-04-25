<template>
  <div>
    <div class="trans-header">
      <div class="container">
        单位检测
      </div>
    </div>
    <div class="trans-body">
      <div class="trans-main">
        <div class="container">
          <div class="info">
            <div class="info-desc"></div>
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
      inputText: '本发明公开一种用于钢丝热镀锌的锌基合金，按重量计，锌铝合金的组份及含量如下：铝4.5～5%，镁0.02～0.04%，锶0.003～0.005%，铟0.001～0.002%，余量为锌。采用本发明的锌铝合金一次镀覆合金重量可达到420～450g/m2，镀层致密、均匀，耐腐蚀性能好。',
      outputText: '',
      json: '',
      loading: false,
    }
  },
  methods: {
    async translate() {
      this.loading = true
      try {
        let res = await apiResearch.unitDetectCn({
          data: {text: this.inputText},
        })
        this.json = res
        if(res['error_code'] === 0) {
          this.outputText = res.data.entities.join('<br>')
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
