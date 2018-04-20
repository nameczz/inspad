<template>
  <div>
    <div class="trans-header">
      <div class="container">
        新闻实体识别
      </div>
    </div>
    <div class="trans-body">
      <div class="trans-main">
        <div class="container">
          <div class="info">
            <div class="info-desc">基于最先进的机器学习算法 ，PatSnap 中文实体识别 API 可以识别人名，机构以及地理位置，整体准确度高达 90%。</div>
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
              <el-button type="success" size="small" class="translate float-left" @click="translate">
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
export default {
  components: {
    [Input.name]: Input,
    Highlight,
  },
  data() {
    return {
      /*eslint-disable*/
      inputText: '齐鲁网威海3月21日讯（通讯员 张建军 许斌 谭晓晖）文登中小企业局紧紧围绕创新驱动转型升级战略，以提高中小微企业发展质量和效益为中心，以融资瓶颈破解为突破口，全力促进中小微企业持续健康发展。 由文登中小企业局组织举办的邮政储蓄银行“税贷通”信用贷款推介会日前在文登经济开发区举行，为文登经济开发区内优质纳税中小企业的融资难问题提供了一个良好有效的解决渠道。推介会上，邮政储蓄银行中小企业信贷中心的专业人员为参会企业详细介绍了各种金融业务，提供了多项针对融资难问题的解决方案，受到了参会企业的欢迎和好评。据了解，经济开发区是今年“税贷通”业务推介会的第一站，下一步会陆续到全区各个镇办开展面上的小型推介会和组织点上的“一对一”上门服务活动，助力中小微企业加快发展。 针对中小企业融资需求日益增长的现状，今年，文登中小企业局一方面将继续做好传统融资服务工作，举办10场以上的镇办、园区小型融资对接会，在摸清企业实际融资需求的基础上，引导金融企业量身定做适合企业的金融产品。另一方面创新融资渠道，进一步推动符合条件的中小企业在齐鲁股权、新三板挂牌上市直接融资，进一步拓宽融资渠道，降低融资成本。同时，还鼓励引进融资性担保公司，为有资金需求而又无抵押物的一些小微企业提供担保，解决小微企业融资瓶颈，切实提高中小微企业发展质量。',
      outputText: '',
      json: '',
    }
  },
  methods: {
    async translate() {
      let inputText = this.inputText
      let res = await apiResearch.nerNewsCn({
        data: inputText,
      })
      this.json = res
      if(res['error_code'] === 0) {
        let lastEnd = 0
        let outputText = []
        res.data.forEach(({entity, start, end}) => {
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
