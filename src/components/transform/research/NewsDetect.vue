<template>
  <div>
    <div class="trans-header">
      <div class="container">
        {{$t('menu.newsEntity')}}
      </div>
    </div>
    <div class="trans-body">
      <div class="trans-main">
        <div class="container">
          <div class="info">
            <div class="info-desc">{{$t('desc')}}</div>
          </div>
          <section>
            <header><icon src="~svg/view.svg"/> {{$t('casePresentation')}}</header>
            <div class="clearfix">
              <el-input
                class="input-text float-left"
                type="textarea"
                resize="none"
                :rows="12"
                :placeholder="$t('enterContentPlaceholder')"
                v-model="inputText"
                name="inputText"
                ref="inputText">
              </el-input>
              <el-button type="success" size="small" class="translate float-left" :loading="loading" @click="translate">
                {{$t('identifyText')}}
              </el-button>
              <div class="out-text float-left" v-html="outputText" ref="outputText" @scroll="scroll">
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
import i18n from 'lang/research/news-detect'
export default {
  components: {
    JsonSchema,
  },
  data() {
    return {
      inputText: this.$t('text'),
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
        let res = await apiResearch.nerNewsCn({
          data: inputText,
        })
        this.json = res
        if(res['error_code'] === 0) {
          let lastEnd = 0
          let outputText = []
          this.tempCompute(inputText, res.data).forEach(({entity, start, end}) => {
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
    tempCompute(text, data) {
      let cur = 0
      data.forEach((item) => {
        item.start = text.indexOf(item.entity) + cur
        item.end = item.start + item.entity.length
        text = text.substr(item.end - cur)
        cur = item.end
      })
      return data
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
  i18n: {
    messages: {
      [process.env.LANG]: i18n,
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
    margin: 0 20px;
    width: 96px;
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
