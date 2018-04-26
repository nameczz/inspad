<template>
  <div>
    <div class="trans-header">
      <div class="container">
        企业
      </div>
    </div>
    <div class="trans-body">
      <div class="trans-main">
        <div class="container">
          <div class="info">
            <div class="info-desc">通过公司名称、组织机构编号或者注册编号获取相关企业ID，并使用ID查询到专利价值、法律详情、说明书、要求和引用详情等信息</div>
          </div>
          <section>
            <header><icon src="~svg/view.svg"/> 案例演示</header>
            <div>
              <p>输入任意检索词查询企业ID，日期格式为:yyyyMMdd</p>
              <div class="clearfix">
                <el-input
                  class="input-text float-left"
                  placeholder="公司名称"
                  v-model="inputForm.company_name">
                </el-input>
                <el-input
                  class="input-text float-left"
                  placeholder="组织机构编码"
                  v-model="inputForm.org_number">
                </el-input>
                <el-input
                  class="input-text float-left"
                  placeholder="注册编码"
                  v-model="inputForm.reg_number">
                </el-input>
              </div>
              <el-button type="success" class="translate" :loading="loading" @click="translate">
                开始查询
              </el-button>
              <p>查询结果（只显示前10条结果）</p>
              <table class="table">
                <thead>
                <tr>
                  <th>ID</th>
                  <th>企业名称</th>
                  <th>企业主要人员</th>
                  <th>企业股东详情</th>
                  <th>企业对外投资</th>
                  <th>企业变更</th>
                  <th>企业分支机构</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in resultList"
                    :key="item.company_id">
                  <td>{{item.company_id|idEncode}}</td>
                  <td>{{item.company_name}}</td>
                  <td><a class="view" @click="showCompanyStaff(item.company_id)">点击查看</a></td>
                  <td><a class="view" @click="showCompanyShareholder(item.company_id)">点击查看</a></td>
                  <td><a class="view" @click="showCompanyInvestment(item.company_id)">点击查看</a></td>
                  <td><a class="view" @click="showCompanyChange(item.company_id)">点击查看</a></td>
                  <td><a class="view" @click="showCompanyBranch(item.company_id)">点击查看</a></td>
                </tr>
                </tbody>
              </table>
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
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="30%">
      <span v-html="dialogText"></span>
    </el-dialog>
  </div>
</template>

<script>
import {Input, Dialog} from 'element-ui'
import Highlight from 'md/highlight/Highlight'
import arrayToMap from 'md/array-to-map'
import {commafy, idEncode, date} from 'md/filters'
import apiData from 'api/data'
import inputOrgNumber from '@/const/input/company'

export default {
  components: {
    [Input.name]: Input,
    [Dialog.name]: Dialog,
    Highlight,
  },
  data() {
    return {
      inputForm: {
        company_name: '',
        org_number: inputOrgNumber,
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
        let cp = await apiData.getCompany({
          company_id: res.company_id.join(','),
        })
        let cpMap = arrayToMap(cp, 'company_id')
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
    async showCompanyInvestment(id) {
      let res = await apiData.getCompanyInvestment({
        company_id: id,
      })
      this.json = res
      this.dialogVisible = true
      this.dialogTitle = 'ID: ' + idEncode(id) + ' 企业对外投资'
      this.dialogText = res.errorCode ? '' : res[0].investment.map(s => s.outcompany_name).join(', ')
    },
    async showCompanyShareholder(id) {
      let res = await apiData.getCompanyShareholder({
        company_id: id,
      })
      this.json = res
      this.dialogVisible = true
      this.dialogTitle = 'ID: ' + idEncode(id) + ' 股东详情'
      this.dialogText = res.errorCode ? '' : res.shareholder.map(s => s.investor_name).join(', ')
    },
    async showCompanyStaff(id) {
      let res = await apiData.getCompanyStaff({
        company_id: id,
      })
      this.json = res
      this.dialogVisible = true
      this.dialogTitle = 'ID: ' + idEncode(id) + ' 主要人员'
      this.dialogText = res.errorCode ? '' : res[0].staff.map(s => s.type + ': ' + s.name).join(', ')
    },
    async showCompanyChange(id) {
      let res = await apiData.getCompanyChange({
        company_id: id,
      })
      this.json = res
      this.dialogVisible = true
      this.dialogTitle = 'ID: ' + idEncode(id) + ' 企业变更'
      this.dialogText = res.errorCode ? '' : res[0].change.map(s => {
        return s.change_item + ' 于 ' + date(s.change_time, 'yyyy年m月d号') + ' 从 ' + s.change_before + ' 变更为 ' +
          s.change_after
      }).join('<br>')
    },
    async showCompanyBranch(id) {
      let res = await apiData.getCompanyBranch({
        company_id: id,
      })
      this.json = res
      this.dialogVisible = true
      this.dialogTitle = 'ID: ' + idEncode(id) + ' 企业分支机构'
      let branches = []
      let showBranch = (cp, level) => {
        branches.push(
          `<span style="width:${level * 10}px;display: inline-block;"></span>${cp.company_name}`)
        if(cp.branch) {
          cp.branch.forEach.map((cpChild) => {
            showBranch(cpChild, level + 1)
          })
        }
      }
      if(!res.errorCode) {
        res[0].branch.forEach.map((cp) => {
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
}
</script>

<style scoped lang="scss">
  @import "~sty/var";
  @import "~sty/components/transform";
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
