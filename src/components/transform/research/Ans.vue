<template>
  <div>
    <div class="trans-header">
      <div class="container">
        ans检测
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
              <div class="float-left input-texts">
                <el-input-number v-model="num" ></el-input-number>
                <el-input
                  placeholder="请输入内容"
                  v-for="(text,i) in inputTexts"
                  :key="i"
                  v-model="text.value">
                </el-input>
              </div>
              <el-button type="success" size="small" class="translate float-left" :loading="loading" @click="translate">
                识别
              </el-button>
              <div class="out-text float-left" v-html="outputText" >
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
import {Input, InputNumber} from 'element-ui'
import JsonSchema from '@/components/busi/JsonSchema'
import apiResearch from 'api/research'
export default {
  components: {
    [Input.name]: Input,
    [InputNumber.name]: InputNumber,
    JsonSchema,
  },
  data() {
    return {
      inputTexts: [{value: 'apple'}, {value: 'Apple'}, {value: 'google'}, {value: 'I cannot be matched'}],
      outputText: '',
      json: '',
      loading: false,
    }
  },
  created() {
  },
  computed: {
    num: {
      get() {
        return this.inputTexts.length
      },
      set(newValue) {
        if(this.inputTexts.length >= newValue) {
          this.inputTexts.splice(newValue, this.inputTexts.length - newValue)
        } else {
          let addNum = newValue - this.inputTexts.length
          for(let i = 0; i < addNum; i++) {
            this.inputTexts.push({value: ''})
          }
        }
      },
    },
  },
  methods: {
    async translate() {
      this.loading = true
      try {
        let input = this.inputTexts.map(t => t.value)
        let res = await apiResearch.getAnsInfo({
          data: input,
        })
        this.json = res
        if(res['error_code'] === 0) {
          this.outputText = input.map(name => ('<b>' + name + '</b>: ' + (res.data[name] || '~'))).join('<br>')
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
  .input-texts{
    width: 366px;
    >.el-input-number,>.el-input{
      margin-bottom: 5px;
    }
  }
  .translate{
    width: 80px;
    margin: 0 20px;
  }
  $rowNum: 12;
  .out-text{
    width: 366px;
    height: $rowNum * 21px + 12px;
    background: #ffffff;
    border-radius: 4px;
    font-size: 14px;
    line-height: 1.5;
    padding: 6px 16px;
    box-sizing: border-box;
    overflow-y: auto;
  }
</style>
