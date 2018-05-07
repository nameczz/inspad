
<template>
  <div>
    <div class="trans-header">
      <div class="container">
        {{$t('menu.statistics')}}
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
            <div>
              <div class="clearfix">
                <div class="float-left input">
                  <el-autocomplete
                    v-model="location"
                    :fetch-suggestions="search"
                    :placeholder="$t('enterAddrPlaceholder')"
                    :trigger-on-focus="false"
                    @select="handleSelect"></el-autocomplete>
                  <el-select v-model="statType" :placeholder="$t('selectDataTypePlaceholder')">
                    <el-option
                      v-for="item in statTypes"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <el-button type="success" class="translate float-left" :loading="loading" @click="translate">
                  {{$t('searchText')}}
                </el-button>
                <div class="out-text float-left" v-html="outputText">
                </div>
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
import {Autocomplete, Select, Option} from 'element-ui'
import {commafy, idEncode} from 'md/filters'
import apiData from 'api/data'
import JsonSchema from '@/components/busi/JsonSchema'
import i18n from 'lang/data/statistics'
export default {
  components: {
    [Autocomplete.name]: Autocomplete,
    [Select.name]: Select,
    [Option.name]: Option,
    JsonSchema,
  },
  data() {
    let t = this.$t
    return {
      langNameKey: 'name' + this.$store.state.user.langForBackend,
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
        {value: 'getValuablePatent', label: t('types.highestValuePatent')},
        {value: 'getPatentsValueDimensions', label: t('types.valueDimen')},
        {value: 'getPatentsTypeDimensionsWithAgency', label: t('types.typeDimenWithAgency')},
        {value: 'getPatentsTypeDimensionsWithoutAgency', label: t('types.typeDimenWithoutAgency')},
        {value: 'getPatentsStatusDimensions', label: t('types.statusDimen')},
        {value: 'getPatentsLegalDimensionsWithAgency', label: t('types.legalDimenWithAgency')},
        {value: 'getPatentsLegalDimensionsWithoutAgency', label: t('types.legalDimenWithoutAgency')},
        {value: 'getPatentsFamilyDimensions', label: t('types.familyDimen')},
        {value: 'getIndustryPatentsValue', label: t('types.industryPatentValue')},
        {value: 'getIndustryPatentsCount', label: t('types.industryPatentCount')},
      ],
      outputText: '',
    }
  },
  methods: {
    async search(queryString, cb) {
      this.selected = null
      try {
        if(!this.locPromise) {
          this.locPromise = apiData.getLocationMapping()
        }
        let {data} = await this.locPromise
        let result = []
        let name = this.langNameKey
        data.forEach((item) => {
          if(item[name].indexOf(queryString) > -1) {
            result.push({
              value: item[name],
              id: item.id,
            })
          }
        })
        cb(result)
      }catch (e) {
        if(e.message === 'unlogged') {
          this.locPromise = null
        }
        cb()
        throw e
      }
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
        let loc = data.find(item => item[this.langNameKey] === this.location)
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
      this.outputText = this.$t('valueDimenOutput', this.json.data)
    },
    async getPatentsTypeDimensionsWithAgency(locationId) {
      this.json = await apiData.getPatentsTypeDimensions({locationId, isWithAgency: 'yes'})
      this.outputText = [
        {value: 'invention', name: this.$t('patentTypes.invention')},
        {value: 'utility', name: this.$t('patentTypes.utility')},
        {value: 'appearance', name: this.$t('patentTypes.appearance')},
      ].map(({value, name}) => {
        return name + '： ' + this.json.data[value]
      }).join('<br>')
    },
    async getPatentsTypeDimensionsWithoutAgency(locationId) {
      this.json = await apiData.getPatentsTypeDimensions({locationId, isWithAgency: 'no'})
      this.outputText = [
        {value: 'invention', name: this.$t('patentTypes.invention')},
        {value: 'utility', name: this.$t('patentTypes.utility')},
        {value: 'appearance', name: this.$t('patentTypes.appearance')},
      ].map(({value, name}) => {
        return name + '： ' + this.json.data[value]
      }).join('<br>')
    },
    async getPatentsStatusDimensions(locationId) {
      this.json = await apiData.getPatentsStatusDimensions({locationId})
      this.outputText = [
        {value: 'appCount', name: this.$t('statusDimen.applicationCount')},
        {value: 'graCount', name: this.$t('statusDimen.authorizationCount')},
        {value: 'invAppCount', name: this.$t('statusDimen.invApplicationCount')},
        {value: 'invGraCount', name: this.$t('statusDimen.invAuthorizationCount')},
      ].map(({value, name}) => {
        return name + ': ' + this.json.data[value]
      }).join('<br>')
    },
    async getPatentsLegalDimensionsWithAgency(locationId) {
      this.json = await apiData.getPatentsLegalDimensions({locationId, isWithAgency: 'yes'})
      this.outputText = [
        {value: 'pending', name: this.$t('legal.pending')},
        {value: 'valid', name: this.$t('legal.valid')},
        {value: 'invalid', name: this.$t('legal.invalid')},
      ].map(({value, name}) => {
        return name + '： ' + this.json.data[value]
      }).join('<br>')
    },
    async getPatentsLegalDimensionsWithoutAgency(locationId) {
      this.json = await apiData.getPatentsLegalDimensions({locationId, isWithAgency: 'no'})
      this.outputText = [
        {value: 'pending', name: this.$t('legal.pending')},
        {value: 'valid', name: this.$t('legal.valid')},
        {value: 'invalid', name: this.$t('legal.invalid')},
      ].map(({value, name}) => {
        return name + '： ' + this.json.data[value]
      }).join('<br>')
    },
    async getPatentsFamilyDimensions(locationId) {
      this.json = await apiData.getPatentsFamilyDimensions({locationId})
      this.outputText = this.$t('familyText') + ': ' + this.json.data.familyCount
    },
    async getIndustryPatentsValue(locationId) {
      this.json = await apiData.getIndustryPatentsValue({locationId, level: 2})
      if(this.json.data) {
        this.outputText = this.json.data.map(({industry, assessment}) =>
          `${industry[this.langNameKey]}：¥ ${assessment}`).join('<br>')
      } else {
        this.outputText = ''
      }
    },
    async getIndustryPatentsCount(locationId) {
      this.json = await apiData.getIndustryPatentsCount({locationId, level: 2})
      if(this.json.data) {
        this.outputText = this.json.data.map(({industry, count}) =>
          `${industry[this.langNameKey]}：${count}`).join('<br>')
      } else {
        this.outputText = ''
      }
    },
  },
  filters: {
    idEncode,
    commafy,
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
