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
    let t = this.$t
    return {
      nav: [
        {
          name: t('menu.research'),
          children: [
            {
              name: t('menu.langDetect'),
              path: '/research/langdetect',
            },
            {
              name: t('menu.chemEntity'),
              path: '/research/chemdetect',
            },
            {
              name: t('menu.newsEntity'),
              path: '/research/newsdetect',
            },
            {
              name: t('menu.keywordsEn'),
              path: '/research/endetect',
            },
            {
              name: t('menu.keywordsCn'),
              path: '/research/cndetect',
            },
            {
              name: t('menu.companyName'),
              path: '/research/companynameparser',
            },
            {
              name: t('menu.titleTrans'),
              path: '/research/titletranslate',
            },
            {
              name: t('menu.abstractTrans'),
              path: '/research/abstracttranslate',
            },
            {
              name: t('menu.unitDetect'),
              path: '/research/unitdetect',
            },
            {
              name: t('menu.ansDetect'),
              path: '/research/ans',
            },
            {
              name: t('menu.similarCompany'),
              path: '/research/similarcompany',
            },
            {
              name: t('menu.similarWordsCn'),
              path: '/research/cnsimilarwords',
            },
            {
              name: t('menu.similarWordsEn'),
              path: '/research/ensimilarwords',
            },
            {
              name: '中文关键字',
              path: '/research/cnterm',
            },
            {
              name: '英文关键字',
              path: '/research/enterm',
            },
            {
              name: '生物专利地图',
              path: '/research/landscapebio',
            },
            // {
            //   name: '图像表格提取',
            //   path: '/research/phototabledetect',
            // },
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
              path: '/data/statistics',
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
      padding-left: 40px;
      overflow: hidden;
      &.router-link-active{
        background-color: #3f4546;
      }
    }
  }
</style>
