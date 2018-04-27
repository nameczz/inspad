
<template>
  <div>
    <div class="trans-header">
      <div class="container">
        代理机构
      </div>
    </div>
    <div class="trans-body">
      <div class="trans-main">
        <div class="container">
          <div class="info">
            <div class="info-desc">通过代理机构编号获取相关代理机构ID，并使用ID查询到代理机构名称、代理机构专利和代理人等信息</div>
          </div>
          <section>
            <header><icon src="~svg/view.svg"/> 案例演示</header>
            <div>
              <p>输入任意检索词查询代理机构ID</p>
              <div class="clearfix">
                <el-input
                  class="input-text float-left"
                  placeholder="代理机构编号"
                  v-model="inputForm.agency_number">
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
                  <th>代理机构名称</th>
                  <th>代理机构专利</th>
                  <th>代理人</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in resultList"
                    :key="item.agency_id">
                  <td>{{item.agency_id|idEncode}}</td>
                  <td>{{item.agency_name}}</td>
                  <td><a class="view" @click="showAgencyPatent(item.agency_id)">点击查看</a></td>
                  <td><a class="view" @click="showAgencyAgent(item)">点击查看</a></td>
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
import {commafy, idEncode} from 'md/filters'
import apiData from 'api/data'
import inputAgencyNumber from '@/const/input/agency'

export default {
  components: {
    [Input.name]: Input,
    [Dialog.name]: Dialog,
    Highlight,
  },
  data() {
    return {
      inputForm: {
        agency_number: inputAgencyNumber,
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
    async showAgencyPatent(id) {
      let res = await apiData.getAgencyPatent({
        agency_id: id,
      })
      this.json = res
      this.dialogVisible = true
      this.dialogTitle = 'ID: ' + idEncode(id) + ' 代理机构专利'
      this.dialogText = null
    },
    async showAgencyAgent({agents, agency_id: id}) {
      let res = await apiData.getAgencyAgent({
        agent_id: agents.join(','),
      })
      this.json = res
      this.dialogVisible = true
      this.dialogTitle = 'ID: ' + idEncode(id) + ' 代理人'
      this.dialogText = res.errorCode ? '' : res.map(s => s.agent_name).join(', ')
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
