<template>
  <div>
    <div class="trans-header">
      <div class="container">
        {{$t('menu.company')}}
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
                  :placeholder="$t('input.companyName')"
                  v-model="inputForm.company_name">
                </el-input>
                <el-input
                  class="input-text float-left"
                  :placeholder="$t('input.orgNo')"
                  v-model="inputForm.org_number">
                </el-input>
                <el-input
                  class="input-text float-left"
                  :placeholder="$t('input.regNo')"
                  v-model="inputForm.reg_number">
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
                  <th>{{$t('table.companyName')}}</th>
                  <th>{{$t('table.staff')}}</th>
                  <th>{{$t('table.shareholder')}}</th>
                  <th>{{$t('table.investment')}}</th>
                  <th>{{$t('table.change')}}</th>
                  <th>{{$t('table.branch')}}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in resultList"
                    :key="item.company_id">
                  <td>{{item.company_id|idEncode}}</td>
                  <td>{{item.company_name}}</td>
                  <td><a class="view" @click="showCompanyStaff(item.company_id)">{{$t('viewText')}}</a></td>
                  <td><a class="view" @click="showCompanyShareholder(item.company_id)">{{$t('viewText')}}</a></td>
                  <td><a class="view" @click="showCompanyInvestment(item.company_id)">{{$t('viewText')}}</a></td>
                  <td><a class="view" @click="showCompanyChange(item.company_id)">{{$t('viewText')}}</a></td>
                  <td><a class="view" @click="showCompanyBranch(item.company_id)">{{$t('viewText')}}</a></td>
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
import {commafy, idEncode, date} from 'md/filters'
import apiData from 'api/data'
import i18n from 'lang/data/company'
export default {
  components: {
    [Dialog.name]: Dialog,
    JsonSchema,
  },
  data() {
    return {
      inputForm: {
        company_name: this.$t('companyNameInput'),
        org_number: '',
        reg_number: '',
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
        let res = await apiData.searchCompany(Object.assign({}, this.inputForm))
        if(res.errorCode) {
          this.resultList = null
          return
        }
        res.company_id = res.company_id.slice(0, 10)
        let cp = await apiData.getCompany({
          company_id: res.company_id.join(','),
        })
        let cpMap = cp.errorCode ? {} : arrayToMap(cp, 'company_id')
        this.resultList = res.company_id.map(id => {
          if(id in cpMap) {
            return cpMap[id]
          } else {
            return {
              company_id: id,
              company_name: null,
            }
          }
        })
      } finally {
        this.loading = false
      }
    },
    async showCompanyInvestment(id) {
      let res = await apiData.getCompanyInvestment({
        company_id: id,
      })
      this.json = res
      this.dialogVisible = true
      this.dialogTitle = 'ID: ' + idEncode(id) + ' ' + this.$t('table.investment')
      this.dialogText = res.errorCode ? '' : res[0].investment.map(s => s.outcompany_name).join(', ')
    },
    async showCompanyShareholder(id) {
      let res = await apiData.getCompanyShareholder({
        company_id: id,
      })
      this.json = res
      this.dialogVisible = true
      this.dialogTitle = 'ID: ' + idEncode(id) + ' ' + this.$t('table.shareholder')
      let shareholders = []
      if(!res.errorCode) {
        res.forEach((item) => {
          item.shareholder.forEach((s) => shareholders.push(s.investor_name))
        })
      }
      this.dialogText = shareholders.join(', ')
    },
    async showCompanyStaff(id) {
      let res = await apiData.getCompanyStaff({
        company_id: id,
      })
      this.json = res
      this.dialogVisible = true
      this.dialogTitle = 'ID: ' + idEncode(id) + ' ' + this.$t('table.staff')
      this.dialogText = res.errorCode ? '' : res[0].staff.map(s => s.type + ': ' + s.name).join(', ')
    },
    async showCompanyChange(id) {
      let res = await apiData.getCompanyChange({
        company_id: id,
      })
      this.json = res
      this.dialogVisible = true
      this.dialogTitle = 'ID: ' + idEncode(id) + ' ' + this.$t('table.change')
      this.dialogText = res.errorCode ? '' : res[0].change.map(s => {
        return this.$t('changeText', {
          name: s.change_item,
          date: date(s.change_time, 'yyyy-m-d'),
          from: s.change_before,
          to: s.change_after,
        })
      }).join('<br>')
    },
    async showCompanyBranch(id) {
      let res = await apiData.getCompanyBranch({
        company_id: id,
      })
      this.json = res
      this.dialogVisible = true
      this.dialogTitle = 'ID: ' + idEncode(id) + ' ' + this.$t('table.branch')
      let branches = []
      let showBranch = (cp, level) => {
        branches.push(
          `<span style="width:${level * 10}px;display: inline-block;"></span>${cp.company_name}`)
        if(cp.branch) {
          cp.branch.forEach((cpChild) => {
            showBranch(cpChild, level + 1)
          })
        }
      }
      if(!res.errorCode) {
        res[0].branch.forEach((cp) => {
          showBranch(cp, 0)
        })
      }
      this.dialogText = branches.join('<br>')
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
