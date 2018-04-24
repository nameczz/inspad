
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
                <div class="float-left">
                  <el-autocomplete
                    class="float-left"
                    v-model="location"
                    :fetch-suggestions="search"
                    placeholder="请输入地址"
                    :trigger-on-focus="false"
                    @select="handleSelect"
                  ></el-autocomplete>
                </div>
                <el-button type="success" class="translate" @click="translate">
                  开始查询
                </el-button>
              </div>
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
import {Autocomplete, Dialog} from 'element-ui'
import Highlight from 'md/highlight/Highlight'
import {commafy, idEncode} from 'md/filters'
import apiData from 'api/data'

export default {
  components: {
    [Autocomplete.name]: Autocomplete,
    [Dialog.name]: Dialog,
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
        for(let i = 0; i < data.length; i++) {
          if(data[i].nameCn === this.location) {
            locationId = data[i].id
            break
          }
        }
      }
      console.log(locationId)
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
    margin: 0;
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
