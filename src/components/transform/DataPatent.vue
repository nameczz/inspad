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
            <div class="info-desc">通过公司名称、组织机构编码、或者组织注册编码获取专利ID，并使用ID查询到专利价值、法律详情、说明书、要求和引用详情等信息</div>
          </div>
          <section>
            <header><icon src="~svg/view.svg"/> 案例演示</header>
            <div>
              <p>输入任意检索词查询专利ID</p>
              <div class="clearfix">
                <el-input
                  class="input-text float-left"
                  v-for="(input,i) in inputTexts"
                  :key="i"
                  resize="none"
                  :rows="4"
                  :placeholder="'检索词'+(i+1)"
                  v-model="input.value">
                </el-input>
              </div>
              <el-button type="success" class="translate">
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
                <tr>
                  <td>200****1349</td>
                  <td>$449,230</td>
                  <td><a class="view">点击查看</a></td>
                  <td><a class="view">点击查看</a></td>
                  <td><a class="view">点击查看</a></td>
                  <td><a class="view">点击查看</a></td>
                </tr>
                <tr>
                  <td>200****1349</td>
                  <td>$449,230</td>
                  <td><a class="view">点击查看</a></td>
                  <td><a class="view">点击查看</a></td>
                  <td><a class="view">点击查看</a></td>
                  <td><a class="view">点击查看</a></td>
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
  </div>
</template>

<script>
import {Input} from 'element-ui'
import Highlight from 'md/highlight/Highlight'
export default {
  components: {
    [Input.name]: Input,
    Highlight,
  },
  data() {
    return {
      inputTexts: [
        {value: null},
        {value: null},
        {value: null},
        {value: null},
        {value: null},
        {value: null},
        {value: null},
        {value: null},
        {value: null},
        {value: null},
      ],
      json: {
        '$schema': 'http://json-schema.org/draft-04/schema#',
        'definitions': {},
        'id': 'http://api.patsnap.com/cloud_patent/patent_id-schema.json',
        'properties': {
          'limit': {
            'default': 10,
            'description': '每页条目数',
            'title': 'The limit schema',
            'type': 'integer',
            'minimum': 0,
            'maximum': 100,
          },
        },
      },
    }
  },
  created() {
  },
}
</script>

<style scoped lang="scss">
  @import "~sty/var";
  @import "~sty/components/transform";
  .el-input{
    width: 182px;
    margin-right: 20px;
    margin-bottom: 12px;
  }
  .translate{
    width: 182px;
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
