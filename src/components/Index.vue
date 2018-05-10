<template>
  <div class="index">
    <div class="banner">
      <div class="mask"></div>
      <div class="banner-content">
        <h3>BUILD YOUR BUSINESS WITH <i>INTELLIGENCE</i></h3>
        <p>
          Dozens of statistic and AI tools<br>
          Millions of intelligence data on patent, company and trademarks<br>
          You can rely on PatSnap api to make your business even better
        </p>
        <div class="text-center">
          <el-button round plain class="plain-green">GET START</el-button>
        </div>
      </div>
    </div>
    <div class="api-list">
      <div class="container">
        <h4>Featured PatSnap API</h4>
        <el-row type="flex" justify="space-between">
          <el-col>
            <a class="panel">
              <div class="panel-header">Patent API</div>
              <div class="panel-body">
                <div class="api">Get patent</div>
                <div class="api">Citation</div>
                <div class="api">Claim</div>
                <div class="api">Legal status</div>
                <div class="api">Value</div>
                <div class="api">Description</div>
                <div class="api">Search</div>
                <div class="api">Classification</div>
                <div class="api">...</div>
              </div>
            </a>
          </el-col>
          <el-col>
            <a class="panel">
              <div class="panel-header">Computing API</div>
              <div class="panel-body">
                <div class="api">Image extraction</div>
                <div class="api">Patent abstract translation</div>
                <div class="api">NER news</div>
                <div class="api">NER chemical</div>
                <div class="api">Acronym extraction</div>
                <div class="api">Language detection</div>
                <div class="api">Keyword helper</div>
                <div class="api">…</div>
              </div>
            </a>
          </el-col>
          <el-col>
            <a class="panel">
              <div class="panel-header">Patent Statistics API</div>
              <div class="panel-body">
                <div class="api">Patent value</div>
                <div class="api">Type stat</div>
                <div class="api">Status stat</div>
                <div class="api">Legal stat</div>
                <div class="api">Faimily stat</div>
                <div class="api">Location mapping</div>
                <div class="api">Value by industry</div>
                <div class="api">Value by enterprise</div>
                <div class="api">…</div>
              </div>
            </a>
          </el-col>
        </el-row>
        <div class="text-center">
          <el-button round plain class="plain-green">EXPLORE API LIBRARY</el-button>
        </div>
      </div>
    </div>
    <copyright></copyright>
  </div>
</template>

<script>
import { Row, Col } from 'element-ui'
export default {
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
  },
  data() {
    return {}
  },
}
</script>

<style scoped lang="scss">
  @import "~sty/var";
  $panelColors: #9cd9e5 #9ce5d0 #acf1bb;
  .index{
    font-family: Lato;
  }
  .banner{
    height: 500px;
    background: url("~img/index/banner.jpeg") no-repeat;
    background-size: cover;
    position: relative;
    >.mask{
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-image: linear-gradient(to top, rgba(0, 40, 46, 0.7), #002b33);
    }
    >.banner-content{
      position: relative;
      height: 100%;
      overflow: hidden;

      >h3{
        height: 48px;
        font-size: 48px;
        font-weight: 900;
        line-height: 1;
        text-align: center;
        color: #ffffff;
        margin-top: 116px;
        >i{
          color: $green;
        }
      }
      >p{
        margin-top: 40px;
        font-size: 16px;
        line-height: 1.5;
        text-align: center;
        color: #ffffff;
      }
      >.text-center{
        margin-top: 60px;
      }
    }
  }
  .plain-green{
    border-radius: 30px;
    border: 2px solid $green;
    background: transparent;
    color: $green;
    font-size: 24px;
    padding: 16px 59px;
    &:focus, &:hover {
      background: transparent;
      border-color: rgba($green, 0.8);
      color: rgba($green, 0.8);
    }
  }
  .api-list{
    background: #002b33;
    overflow: hidden;
    >.container{
      >h4{
        line-height: 20px;
        font-size: 18px;
        color: #ffffff;
        margin-top: 60px;
        margin-bottom: 40px;
      }

      >.text-center{
        margin-top: 60px;
        margin-bottom: 80px;
      }
    }
    .el-col{
      width: 288px;
      @for $i from 1 through 3 {
        &:nth-child(#{$i}) .panel-header{
          background: nth($panelColors,$i);
        }
      }
    }
  }
  .panel{
    border-radius: 6px;
    overflow: hidden;
    display: block;
    .panel-header{
      height: 60px;
      line-height: 60px;
      font-size: 24px;
      font-weight: 900;
      text-align: center;
      color: #232c2d;
    }
    .panel-body{
      background-color: #fafafa;
      padding: 15px 40px;
      font-size: 18px;
      line-height: 1.78;
      color: #2f669c;
    }
  }
</style>
