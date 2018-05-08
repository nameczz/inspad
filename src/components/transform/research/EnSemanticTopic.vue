<template>
  <div>
    <div class="trans-header">
      <div class="container">
        {{$t('menu.semanticTopicEn')}}
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
                :rows="4"
                :placeholder="$t('enterContentPlaceholder')"
                v-model="inputText"
                name="inputText">
              </el-input>
              <el-button type="success" size="small" class="translate float-left" :loading="loading" @click="translate">
                {{$t('extractText')}}
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
import JsonSchema from '@/components/busi/JsonSchema'
import apiResearch from 'api/research'
import i18n from 'lang/research/en-semantic-topic'
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
        let res = await apiResearch.getEnSimilarWords({
          nterms: this.inputText.length,
          ntopics: 5,
          text: this.inputText,
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
