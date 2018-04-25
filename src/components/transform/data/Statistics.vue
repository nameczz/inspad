
<template>
  <div>
    <div class="trans-header">
      <div class="container">
        统计
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
            <div>
              <p>输入任意检索词查询代理机构ID，日期格式为:yyyyMMdd</p>
              <div class="clearfix">
                <div class="float-left input">
                  <el-autocomplete
                    v-model="location"
                    :fetch-suggestions="search"
                    placeholder="请输入地址"
                    :trigger-on-focus="false"
                    @select="handleSelect"></el-autocomplete>
                  <el-select v-model="statType" placeholder="请选择">
                    <el-option
                      v-for="item in statTypes"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <el-button type="success" class="translate float-left" :loading="loading" @click="translate">
                  开始查询
                </el-button>
                <div class="out-text float-left" v-html="outputText">
                </div>
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
import {Autocomplete, Select, Option} from 'element-ui'
import Highlight from 'md/highlight/Highlight'
import {commafy, idEncode} from 'md/filters'
import apiData from 'api/data'

export default {
  components: {
    [Autocomplete.name]: Autocomplete,
    [Select.name]: Select,
    [Option.name]: Option,
    Highlight,
  },
  data() {
    return {
      inputForm: {
        agency_number: '11695',
      },
      location: '',
      selected: null,
      json: '',
      resultList: null,
      dialogTitle: '',
      dialogVisible: false,
      dialogText: '',
      statType: '',
      loading: false,
      statTypes: [
        {value: 'getValuablePatent', label: '价值最高专利'},
        {value: 'getPatentsValueDimensions', label: '价值维度'},
        {value: 'getPatentsTypeDimensionsWithAgency', label: '类型维度(代理机构)'},
        {value: 'getPatentsTypeDimensionsWithoutAgency', label: '类型维度(非代理机构)'},
        {value: 'getPatentsStatusDimensions', label: '状态维度'},
        {value: 'getPatentsLegalDimensionsWithAgency', label: '法律维度(代理机构)'},
        {value: 'getPatentsLegalDimensionsWithoutAgency', label: '法律维度(非代理机构)'},
        {value: 'getPatentsFamilyDimensions', label: '同族维度'},
        {value: 'getIndustryPatentsValue', label: '产业专利价值'},
        {value: 'getIndustryPatentsCount', label: '产业专利数量'},
      ],
      outputText: '',
    }
  },
  methods: {
    async search(queryString, cb) {
      this.selected = null
      if(!this.locPromise) {
        this.locPromise = apiData.getLocationMapping()
      }
      let {data} = await this.locPromise
      let result = []
      data.forEach(({nameCn, id}) => {
        if(nameCn.indexOf(queryString) > -1) {
          result.push({
            value: nameCn,
            id,
          })
        }
      })
      cb(result)
    },
    handleSelect(item) {
      this.selected = item
    },
    async translate() {
      if(!this.location) {
        return
      }
      let locationId
      if(this.selected && this.selected.value === this.location) {
        locationId = this.selected.id
      } else {
        if(!this.locPromise) {
          this.locPromise = apiData.getLocationMapping()
        }
        let {data} = await this.locPromise
        let loc = data.find(item => item.nameCn === this.location)
        if(loc) {
          locationId = loc.id
        }
      }
      if(locationId && this.statType) {
        this.loading = true
        try {
          await this[this.statType](locationId)
        } finally {
          this.loading = false
        }
      }
    },
    async getValuablePatent(locationId) {
      this.json = await apiData.getValuablePatents({locationId})
      this.outputText = this.json.data.map(item => item.publishedNumber).join('<br>')
    },
    async getPatentsValueDimensions(locationId) {
      this.json = await apiData.getPatentsValueDimensions({locationId})
      this.outputText = `估价：${this.json.data.assessment} 元<br>授权数：${this.json.data.authCount}`
    },
    async getPatentsTypeDimensionsWithAgency(locationId) {
      this.json = await apiData.getPatentsTypeDimensions({locationId, isWithAgency: 'yes'})
      this.outputText = [
        {value: 'invention', name: '发明专利'},
        {value: 'utility', name: '实用新型'},
        {value: 'appearance', name: '外观设计'},
      ].map(({value, name}) => {
        return name + '： ' + this.json.data[value]
      }).join('<br>')
    },
    async getPatentsTypeDimensionsWithoutAgency(locationId) {
      this.json = await apiData.getPatentsTypeDimensions({locationId, isWithAgency: 'no'})
      this.outputText = [
        {value: 'invention', name: '发明专利'},
        {value: 'utility', name: '实用新型'},
        {value: 'appearance', name: '外观设计'},
      ].map(({value, name}) => {
        return name + '： ' + this.json.data[value]
      }).join('<br>')
    },
    async getPatentsStatusDimensions(locationId) {
      this.json = await apiData.getPatentsStatusDimensions({locationId})
      this.outputText = [
        {value: 'appCount', name: '专利申请'},
        {value: 'graCount', name: '专利授权'},
        {value: 'invAppCount', name: '发明申请'},
        {value: 'invGraCount', name: '发明授权'},
      ].map(({value, name}) => {
        return name + '： ' + this.json.data[value]
      }).join('<br>')
    },
    async getPatentsLegalDimensionsWithAgency(locationId) {
      this.json = await apiData.getPatentsLegalDimensions({locationId, isWithAgency: 'yes'})
      this.outputText = [
        {value: 'pending', name: '审中'},
        {value: 'valid', name: '有效'},
        {value: 'invalid', name: '无效'},
      ].map(({value, name}) => {
        return name + '： ' + this.json.data[value]
      }).join('<br>')
    },
    async getPatentsLegalDimensionsWithoutAgency(locationId) {
      this.json = await apiData.getPatentsLegalDimensions({locationId, isWithAgency: 'no'})
      this.outputText = [
        {value: 'pending', name: '审中'},
        {value: 'valid', name: '有效'},
        {value: 'invalid', name: '无效'},
      ].map(({value, name}) => {
        return name + '： ' + this.json.data[value]
      }).join('<br>')
    },
    async getPatentsFamilyDimensions(locationId) {
      this.json = await apiData.getPatentsFamilyDimensions({locationId})
      this.outputText = '同族专利： ' + this.json.data.familyCount
    },
    async getIndustryPatentsValue(locationId) {
      this.json = await apiData.getIndustryPatentsValue({locationId, level: 2})
      if(this.json.data) {
        this.outputText = this.json.data.map(({industry, assessment}) =>
          `${industry.nameCn}：${assessment}元`).join('<br>')
      } else {
        this.outputText = ''
      }
    },
    async getIndustryPatentsCount(locationId) {
      this.json = await apiData.getIndustryPatentsCount({locationId, level: 2})
      if(this.json.data) {
        this.outputText = this.json.data.map(({industry, count}) =>
          `${industry.nameCn}：${count}`).join('<br>')
      } else {
        this.outputText = ''
      }
    },
  },
  filters: {
    idEncode,
    commafy,
  },
}
</script>

<style scoped lang="scss">
  @import "~sty/var";
  @import "~sty/components/transform";
  .input{
    width: 210px;
    >.el-autocomplete{
      width: 100%;
      margin-bottom: 10px;
    }
    >.el-select{
      width: 100%;
    }
  }

  .translate{
    width: 210px;
    margin-left: 10px;
    margin-right: 10px;
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
  section{
    p{
      height: 24px;
      font-size: 14px;
      line-height: 1.71;
      color: #3f4546;
      margin-bottom: 8px;
    }
  }
  .view{
    color: $green;
  }
</style>
