<template>
  <div>
   <div class="trans-header">
     <div class="container">
       语言监测
     </div>
   </div>
   <div class="trans-body">
     <div class="trans-main">
       <div class="container">
         <div class="info">
           <div class="info-title">GET /compute/lang_detect/</div>
           <div class="info-desc">基于最先进的神经网络算法 ，PatSnap 语言检测 API 可以识别多达 38 种语言，而且整体准确率高达 99%。</div>
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
               识别
             </el-button>
             <div class="out-text float-left">
               {{outputText}}
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
      inputText: 'The National Highway Traffic Safety Administration (NHTSA) announced Thursday that it\'s closed its preliminary investigation into Tesla\'s Automatic Emergency Braking (AEB) or Autopilot systems, finding no defects in design or performance. In fact, according to the report, data from Tesla vehicles shows the vehicle crash rate dropped by almost 40 percent after Autosteer installation. The Office of Defects Investigation (ODI) analyzed mileage and airbag deployment data supplied by Tesla for all 2014 through 2016 Model S cars and 2016 Model X vehicles equipped with the Autopilot Technology Package (either installed when the car was sold or through an update). The office calculated crash rates by miles travelled before after Autopilot installation. Still, the report noted the Autopilot system \\"requires the continual and full attention of the driver... to avoid crashes.\\" While Tesla has provided information to its customers about the system\'s limitations, that information is \\"perhaps not as specific as it could be,\\" the report says. Tesla responded to the report with a brief statement: \\"At Tesla, the safety of our customers comes first, and we appreciate the thoroughness of NHTSA\'s report and its conclusion.\\" The probe was launched in June 2016 after a fatal crash in Williston, Fla., involving a Tesla with the Autopilot feature engaged. The report notes that since the crash, Tesla has updated its Autopilot system \\"to further reinforce the need for driver engagement.\\" Google\'s self-driving technology could power future Honda cars"',
      outputText: '',
      json: '',
    }
  },
  methods: {
    async translate() {
      let res = await apiResearch.langDetect({
        data: {
          text: this.inputText,
        },
        session: 'string',
      })
      this.json = res
      if(res['error_code'] === 0) {
        this.outputText = res.data.lang
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
  }
</style>
