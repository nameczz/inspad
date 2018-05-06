
<template>
  <div>
    <div class="trans-header">
      <div class="container">
        {{$t('menu.agency')}}
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
                  :placeholder="$t('input.agencyNo')"
                  v-model="inputForm.agency_number">
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
                  <th>{{$t('table.agencyName')}}</th>
                  <th>{{$t('table.agencyPatent')}}</th>
                  <th>{{$t('table.agent')}}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in resultList"
                    :key="item.agency_id">
                  <td>{{item.agency_id|idEncode}}</td>
                  <td>{{item.agency_name}}</td>
                  <td><a class="view" @click="showAgencyPatent(item.agency_id)">{{$t('viewText')}}</a></td>
                  <td><a class="view" @click="showAgencyAgent(item)">{{$t('viewText')}}</a></td>
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
      <span style="word-break: break-all;" v-html="dialogText"></span>
    </el-dialog>
  </div>
</template>

<script>
import {Dialog} from 'element-ui'
import JsonSchema from '@/components/busi/JsonSchema'
import {commafy, idEncode} from 'md/filters'
import apiData from 'api/data'
import i18n from 'lang/data/agency'

export default {
  components: {
    [Dialog.name]: Dialog,
    JsonSchema,
  },
  data() {
    return {
      inputForm: {
        agency_number: this.$t('agencyNumberInput'),
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
      try {
        let res = await apiData.searchAgency(Object.assign({}, this.inputForm))
        if(res.errorCode) {
          this.resultList = null
          return
        }
        let agencies = await apiData.getAgency({
          agency_id: res.agency_id,
        })
        if(agencies.errorCode) {
          this.resultList = null
          return
        }
        this.resultList = agencies
      } finally {
        this.loading = false
      }
    },
    async showAgencyPatent(id) {
      let res = await apiData.getAgencyPatent({
        agency_id: id,
      })
      this.json = res
      this.dialogVisible = true
      this.dialogTitle = 'ID: ' + idEncode(id) + ' ' + this.$t('table.agencyPatent')
      this.dialogText = res.errorCode ? '' : res.patent_id.join('<br>')
    },
    async showAgencyAgent({agents, agency_id: id}) {
      let res = await apiData.getAgencyAgent({
        agent_id: agents.join(','),
      })
      this.json = res
      this.dialogVisible = true
      this.dialogTitle = 'ID: ' + idEncode(id) + ' ' + this.$t('table.agent')
      this.dialogText = res.errorCode ? '' : res.map(s => s.agent_name).join(', ')
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
