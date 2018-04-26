<template>
  <div>
   <div class="trans-header">
     <div class="container">
       化学实体识别
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
               :rows="12"
               placeholder="请输入内容"
               v-model="inputText"
               name="inputText"
               v-validate="'required'"
               ref="inputText"
               data-vv-as="文本"
               :class="{'error':errors.has('inputText') }">
             </el-input>
             <el-button type="success" size="small" class="translate float-left" :loading="loading" @click="translate">
               识别
             </el-button>
             <div class="out-text float-left" v-html="outputText" ref="outputText" @scroll="scroll">
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
import inputText from '@/const/input/chem-detect'
export default {
  components: {
    [Input.name]: Input,
    Highlight,
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
        let inputText = this.inputText
        let res = await apiResearch.nerChem({
          data: {
            text: inputText,
          },
          session: 'string',
        })
        this.json = res
        if(res['error_code'] === 0) {
          let lastEnd = 0
          let outputText = []
          res.data.result.forEach(({entity, start, end}) => {
            if(start < 0 || end < 0) {
              return
            }
            outputText.push(inputText.substring(lastEnd, start))
            outputText.push('<i style="background: #a0ff00;">' + inputText.substring(start, end) + '</i>')
            lastEnd = end
          })
          outputText.push(inputText.substring(lastEnd, inputText.length))
          this.outputText = outputText.join('')
          this.outputEl.scrollTop = this.inputEl.scrollTop = 0
        }
      } finally {
        this.loading = false
      }
    },
    scroll(e) {
      let src = e.target
      let dest = src === this.inputEl ? this.outputEl : this.inputEl
      dest.scrollTop = src.scrollTop
    },
  },
  mounted() {
    this.inputEl = this.$refs.inputText.$refs.textarea
    this.outputEl = this.$refs.outputText
    this.$refs.inputText.$refs.textarea.addEventListener('scroll', this.scroll, false)
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
