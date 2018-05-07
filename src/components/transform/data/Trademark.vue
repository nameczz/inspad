<template>
  <div>
    <div class="trans-header">
      <div class="container">
        {{$t('menu.trademark')}}
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
                  :placeholder="$t('input.companyOrgNo')"
                  v-model="inputForm.org_num">
                </el-input>
                <el-input
                  class="input-text float-left"
                  :placeholder="$t('input.companyRegNo')"
                  v-model="inputForm.reg_num">
                </el-input>
                <el-input
                  class="input-text float-left"
                  :placeholder="$t('input.applicantName')"
                  v-model="inputForm.ans">
                </el-input>
                <el-input
                  class="input-text float-left"
                  :placeholder="$t('input.applicantAddr')"
                  v-model="inputForm.ans_adress">
                </el-input>
                <el-input
                  class="input-text float-left"
                  :placeholder="$t('input.trademarkName')"
                  v-model="inputForm.ttl">
                </el-input>
                <el-input
                  class="input-text float-left"
                  :placeholder="$t('input.trademarkRegNo')"
                  v-model="inputForm.tm_rgno">
                </el-input>
                <el-input
                  class="input-text float-left"
                  :placeholder="$t('input.trademarkApplicationCountry')"
                  v-model="inputForm.country">
                </el-input>
                <el-input
                  class="input-text float-left"
                  :placeholder="$t('input.trademarkNice')"
                  v-model="inputForm.ncl">
                </el-input>
                <el-input
                  class="input-text float-left"
                  :placeholder="$t('input.trademarkApplicationNo')"
                  v-model="inputForm.tm_apno">
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
                  <th>{{$t('table.trademarkName')}}</th>
                  <th>{{$t('table.agent')}}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in resultList"
                    :key="item.trademark_id">
                  <td>{{item.trademark_id|idEncode}}</td>
                  <td>{{getTextFromArray(item.title)}}</td>
                  <td>{{getTextFromArray(item.representative)}}</td>
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
import {commafy, idEncode} from 'md/filters'
import apiData from 'api/data'
import i18n from 'lang/data/trademark'
export default {
  components: {
    [Dialog.name]: Dialog,
    JsonSchema,
  },
  data() {
    return {
      inputForm: {
        org_num: '',
        reg_num: '',
        ans: '',
        ans_adress: '',
        ttl: this.$t('trademarkNameInput'),
        tm_rgno: '',
        country: '',
        ncl: '',
        tm_apno: '',
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
        let res = await apiData.searchTrademark(Object.assign({
          limit: 10,
          offset: 0,
        }, this.inputForm))
        if (res.errorCode) {
          this.resultList = null
          return
        }
        let trademarks = await apiData.getTrademark({
          trademark_id: res.trademark_id.join(','),
        })
        if (trademarks.errorCode) {
          this.resultList = null
          return
        }
        this.resultList = trademarks
      } finally {
        this.loading = false
      }
    },
    getTextFromArray(array) {
      if(!array || array.length === 0) {
        return ''
      }
      let cn = array.find(({lang}) => lang === 'CN')
      if(cn) {
        return cn.text
      } else {
        return array[0].text
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
