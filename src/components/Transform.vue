<template>
  <div>
    <div class="sidebar">
      <div class="nav-root-item" v-for="rootItem in nav" :key="rootItem.name">
        <span>{{rootItem.name}}</span>
        <div>
          <router-link class="nav-item"
                       :to="'/transform'+item.path"
                       v-for="item in rootItem.children"
                       :key="item.name">
            {{item.name}}
          </router-link>
        </div>
      </div>
    </div>
    <router-view class="transform sidebar-visible"></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nav: [
        {
          name: '研发',
          children: [
            {
              name: '语言检测',
              path: '/research/langdetect',
            },
            {
              name: '化学实体识别',
              path: '/research/chemdetect',
            },
            {
              name: '新闻实体识别',
              path: '/research/newsdetect',
            },
            {
              name: '英文近似关键词',
              path: '/research/endetect',
            },
            {
              name: '中文近似关键词',
              path: '/research/cndetect',
            },
            {
              name: '标准名称提取',
              path: '/research/titledetect',
            },
            {
              name: '标题翻译',
              path: '/research/titletranslate',
            },
            {
              name: '摘要翻译',
              path: '/research/abstracttranslate',
            },
            {
              name: '单位检测',
              path: '/research/unitdetect',
            },
            {
              name: '图像表格提取',
              path: '/research/phototabledetect',
            },
          ],
        },
        {
          name: '数据',
          children: [
            {
              name: '专利',
              path: '/data/patent',
            },
            {
              name: '企业',
              path: '/data/company',
            },
            {
              name: '代理机构',
              path: '/data/agency',
            },
            {
              name: '商标',
              path: '/data/trademark',
            },
            {
              name: '统计',
              path: 'null',
            },
          ],
        },
      ],
    }
  },
}
</script>

<style scoped lang="scss">
  @import "~sty/var";
  .transform{
    position: absolute;
    left: $sidebarWidth;
    top: 0;
    height: 100%;
    right: 0;
    overflow-y: auto;
  }
  .sidebar{
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: $sidebarWidth;
    background: #586263;
    color: #ffffff;
    overflow-y: auto;
  }
  .nav-root-item{
    >span{
      height: 39px;
      line-height: 39px;
      padding: 0 24px;
      font-size: 16px;
      font-weight: 900;
      box-shadow: 0 1px 0 0 rgba(46, 52, 54, 0.3);
      display: block;
    }
    .nav-item{
      font-size: 14px;
      color: #ffffff;
      line-height: 36px;
      display: block;
      padding-left: 44px;
      overflow: hidden;
      &.router-link-active{
        background-color: #3f4546;
      }
    }
  }
</style>
