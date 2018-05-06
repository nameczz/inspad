<template>
  <div>
    <div class="trans-header">
      <div class="container">
        {{$t('menu.patent')}}
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
              <p>{{$t('notice')}}</p>
              <div class="clearfix">
                <el-input
                  class="input-text float-left"
                  :placeholder="$t('input.applicant')"
                  v-model="inputForm.ans">
                </el-input>
                <el-input
                  class="input-text float-left"
                  :placeholder="$t('input.patentTitle')"
                  v-model="inputForm.ttl">
                </el-input>
                <el-input
                  class="input-text float-left"
                  :placeholder="$t('input.applyStartDate')"
                  v-model="inputForm.apd_from">
                </el-input>
                <el-input
                  class="input-text float-left"
                  :placeholder="$t('input.applyEndDate')"
                  v-model="inputForm.apd_to">
                </el-input>
                <el-input
                  class="input-text float-left"
                  :placeholder="$t('input.publicStartDate')"
                  v-model="inputForm.pbd_from">
                </el-input>
                <el-input
                  class="input-text float-left"
                  :placeholder="$t('input.publicEndDate')"
                  v-model="inputForm.pbd_to">
                </el-input>
                <el-input
                  class="input-text float-left"
                  :placeholder="$t('input.publicNo')"
                  v-model="inputForm.pn">
                </el-input>
                <el-input
                  class="input-text float-left"
                  :placeholder="$t('input.applyNo')"
                  v-model="inputForm.apn">
                </el-input>
                <el-input
                  class="input-text float-left"
                  :placeholder="$t('input.IPCCode')"
                  v-model="inputForm.ipc">
                </el-input>
              </div>
              <el-button type="success" class="translate" :loading="loading" @click="translate">
                {{$t('searchText')}}
              </el-button>
              <p>{{$t('searchResultNotice')}}</p>
              <table class="table">
                <thead>
                <tr>
                  <th>ID</th>
                  <th>{{$t('table.patentVal')}}</th>
                  <th>{{$t('table.patentLegalInfo')}}</th>
                  <th>{{$t('table.patentDesc')}}</th>
                  <th>{{$t('table.patentClaim')}}</th>
                  <th>{{$t('table.patentCitation')}}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in resultList"
                    :key="item.patent_id">
                  <td>{{item.patent_id|idEncode}}</td>
                  <td>{{item.patent_value|commafyValue}}</td>
                  <td><a class="view" @click="showLegalInfo(item.patent_id)">{{$t('viewText')}}</a></td>
                  <td><a class="view" @click="showPatentDesc(item.patent_id)">{{$t('viewText')}}</a></td>
                  <td><a class="view" @click="showPatentClaim(item.patent_id)">{{$t('viewText')}}</a></td>
                  <td><a class="view" @click="showPatentCitation(item.patent_id)">{{$t('viewText')}}</a></td>
                </tr>
                </tbody>
              </table>
            </div>
          </section>
          <json-schema :json="json"></json-schema>
        </div>
      </div>
      <copyright/>
    </div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="30%">
      <span v-html="dialogText"></span>
    </el-dialog>
  </div>
</template>

<script>
import {Dialog} from 'element-ui'
import JsonSchema from '@/components/busi/JsonSchema'
import arrayToMap from 'md/array-to-map'
import {commafy, idEncode} from 'md/filters'
import apiData from 'api/data'
import i18n from 'lang/data/patent'
export default {
  components: {
    [Dialog.name]: Dialog,
    JsonSchema,
  },
  data() {
    return {
      inputForm: {
        ans: '',
        ttl: this.$t('patentTitleInput'),
        apd_from: '',
        apd_to: '',
        pbd_from: '',
        pbd_to: '',
        pn: '',
        apn: '',
        ipc: '',
      },
      json: '',
      resultList: null,
      dialogTitle: '',
      dialogVisible: false,
      dialogText: '',
      loading: false,
    }
  },
  methods: {
    async translate() {
      this.loading = true
      try{
        let res = await apiData.searchPatent(Object.assign({
          offset: 0,
          limit: 10,
        }, this.inputForm))
        if(res.errorCode) {
          this.resultList = null
          return
        }

        let pv = await apiData.getPatentValuation({
          patent_id: res.patent.join(','),
        })
        let pvMap = pv.errorCode ? {} : arrayToMap(pv, 'patent_id')
        this.resultList = res.patent.map(id => {
          if(id in pvMap) {
            return pvMap[id]
          } else {
            return {
              patent_id: id,
              patent_value: null,
            }
          }
        })
      } finally {
        this.loading = false
      }
    },
    getTextFromArray(array) {
      if(!array || array.length === 0) {
        return ''
      }
      let item = array.find(({lang}) => lang === this.$store.state.user.langForBackend)
      if(item) {
        return item.text
      } else {
        return ''
      }
    },
    async showLegalInfo(id) {
      let res = await apiData.getPatentLegalInfo({
        patent_id: id,
      })
      this.json = res
      this.dialogVisible = true
      this.dialogTitle = 'ID: ' + idEncode(id) + ' ' + this.$t('table.patentLegalInfo')
      if(res.legal_info && res.legal_info.legal_status && res.legal_info.legal_status.length > 0) {
        this.dialogText = this.getTextFromArray(res.legal_info.legal_status[0].legal_desc)
      } else {
        this.dialogText = ''
      }
    },
    async showPatentDesc(id) {
      let res = await apiData.getPatentDesc({
        patent_id: id,
      })
      this.json = res
      this.dialogVisible = true
      this.dialogTitle = 'ID: ' + idEncode(id) + ' ' + this.$t('table.patentDesc')
      this.dialogText = res.errorCode ? '' : this.getTextFromArray(res.description)
    },
    async showPatentClaim(id) {
      let res = await apiData.getPatentClaim({
        patent_id: id,
      })
      this.json = res
      this.dialogVisible = true
      this.dialogTitle = 'ID: ' + idEncode(id) + ' ' + this.$t('table.patentClaim')
      this.dialogText = res.errorCode ? '' : this.getTextFromArray(res.claim)
    },
    async showPatentCitation(id) {
      let res = await apiData.getPatentCitation({
        patent_id: id,
        citation_type: 'CITES',
      })
      this.json = res
      this.dialogVisible = true
      this.dialogTitle = 'ID: ' + idEncode(id) + ' ' + this.$t('table.patentCitation')
      this.dialogText = res.errorCode ? '' : res.citation.map(c => c.patent_number).join('<br>')
    },
  },
  filters: {
    idEncode,
    commafyValue(val) {
      if(val) {
        return '¥' + commafy(val)
      } else {
        return '?'
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
  .el-input{
    width: 210px;
    margin-right: 20px;
    margin-bottom: 12px;
  }
  .translate{
    width: 210px;
    margin: 16px 0 24px;
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
