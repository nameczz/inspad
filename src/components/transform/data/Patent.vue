<template>
  <div>
    <div class="trans-header">
      <div class="container">
        专利
      </div>
    </div>
    <div class="trans-body">
      <div class="trans-main">
        <div class="container">
          <div class="info">
            <div class="info-desc">通过申请人名称、专利标题或者专利公开号等检索词获取专利ID，并使用ID查询到专利价值、法律详情、说明书、要求和引用详情等信息</div>
          </div>
          <section>
            <header><icon src="~svg/view.svg"/> 案例演示</header>
            <div>
              <p>输入任意检索词查询专利ID，日期格式为:yyyyMMdd</p>
              <div class="clearfix">
                <el-input
                  class="input-text float-left"
                  placeholder="申请人名称"
                  v-model="inputForm.ans">
                </el-input>
                <el-input
                  class="input-text float-left"
                  placeholder="专利标题"
                  v-model="inputForm.ttl">
                </el-input>
                <el-input
                  class="input-text float-left"
                  placeholder="专利申请查询开始日期(包含)"
                  v-model="inputForm.apd_from">
                </el-input>
                <el-input
                  class="input-text float-left"
                  placeholder="专利申请查询结束日期(包含)"
                  v-model="inputForm.apd_to">
                </el-input>
                <el-input
                  class="input-text float-left"
                  placeholder="专利公开查询开始日期(包含)"
                  v-model="inputForm.pbd_from">
                </el-input>
                <el-input
                  class="input-text float-left"
                  placeholder="专利公开查询结束日期(包含)"
                  v-model="inputForm.pbd_to">
                </el-input>
                <el-input
                  class="input-text float-left"
                  placeholder="专利公开号"
                  v-model="inputForm.pn">
                </el-input>
                <el-input
                  class="input-text float-left"
                  placeholder="专利申请号"
                  v-model="inputForm.apn">
                </el-input>
                <el-input
                  class="input-text float-left"
                  placeholder="专利IPC编码"
                  v-model="inputForm.ipc">
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
                  <th>专利价值</th>
                  <th>专利法律状态</th>
                  <th>专利说明书</th>
                  <th>专利要求</th>
                  <th>专利引用详情</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in resultList"
                    :key="item.patent_id">
                  <td>{{item.patent_id|idEncode}}</td>
                  <td>{{item.patent_value|commafyValue}}</td>
                  <td><a class="view" @click="showLegalInfo(item.patent_id)">点击查看</a></td>
                  <td><a class="view" @click="showPatentDesc(item.patent_id)">点击查看</a></td>
                  <td><a class="view" @click="showPatentClaim(item.patent_id)">点击查看</a></td>
                  <td><a class="view" @click="showPatentCitation(item.patent_id)">点击查看</a></td>
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
import {Input, Dialog} from 'element-ui'
import JsonSchema from '@/components/busi/JsonSchema'
import arrayToMap from 'md/array-to-map'
import {commafy, idEncode} from 'md/filters'
import apiData from 'api/data'

export default {
  components: {
    [Input.name]: Input,
    [Dialog.name]: Dialog,
    JsonSchema,
  },
  data() {
    return {
      inputForm: {
        ans: '',
        ttl: '电子',
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
      let cn = array.find(({lang}) => lang === 'CN')
      if(cn) {
        return cn.text
      } else {
        return array[0].text
      }
    },
    async showLegalInfo(id) {
      let res = await apiData.getPatentLegalInfo({
        patent_id: id,
      })
      this.json = res
      this.dialogVisible = true
      this.dialogTitle = 'ID: ' + idEncode(id) + ' 法律状态'
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
      this.dialogTitle = 'ID: ' + idEncode(id) + ' 专利说明书'
      this.dialogText = res.errorCode ? '' : this.getTextFromArray(res.description)
    },
    async showPatentClaim(id) {
      let res = await apiData.getPatentClaim({
        patent_id: id,
      })
      this.json = res
      this.dialogVisible = true
      this.dialogTitle = 'ID: ' + idEncode(id) + ' 专利要求'
      this.dialogText = res.errorCode ? '' : this.getTextFromArray(res.claim)
    },
    async showPatentCitation(id) {
      let res = await apiData.getPatentCitation({
        patent_id: id,
        citation_type: 'CITES',
      })
      this.json = res
      this.dialogVisible = true
      this.dialogTitle = 'ID: ' + idEncode(id) + ' 专利引用详情'
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
