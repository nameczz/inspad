import Vue from 'vue'
import Router from 'vue-router'
// import apiUser from 'api/user'
// import store from '@/store'
import 'core-js/fn/array/find'

// const HelloWorld = resolve => require(['@/components/HelloWorld'], resolve)
const Login = resolve => require(['@/components/Login'], resolve)
const Content = resolve => require(['@/components/Content'], resolve)
const Transform = resolve => require(['@/components/Transform'], resolve)

const ResearchLangdetect = resolve => require(['@/components/transform/ResearchLangdetect'], resolve)
const ResearchChemDetect = resolve => require(['@/components/transform/ResearchChemDetect'], resolve)
const ResearchNewsDetect = resolve => require(['@/components/transform/ResearchNewsDetect'], resolve)
const ResearchEnDetect = resolve => require(['@/components/transform/ResearchEnDetect'], resolve)
const ResearchCnDetect = resolve => require(['@/components/transform/ResearchCnDetect'], resolve)
const ResearchTitleDetect = resolve => require(['@/components/transform/ResearchTitleDetect'], resolve)
const ResearchTitleTranslate = resolve => require(['@/components/transform/ResearchTitleTranslate'], resolve)
const ResearchSummaryTranslate = resolve => require(['@/components/transform/ResearchSummaryTranslate'], resolve)
const ResearchUnitDetect = resolve => require(['@/components/transform/ResearchUnitDetect'], resolve)
const ResearchPhotoTableDetect = resolve => require(['@/components/transform/ResearchPhotoTableDetect'], resolve)

const DataPatent = resolve => require(['@/components/transform/DataPatent'], resolve)
// const Report = resolve => require(['@/components/Report'], resolve)
//
// const OrganList = resolve => require(['@/components/organ/List'], resolve)
//
// const ReportTransformList = resolve => require(['@/components/report/TransformList'], resolve)

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      redirect: {
        name: 'Login',
      },
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        allowUnlogged: true,
      },
    },
    {
      path: '',
      component: Content,
      children: [
        /*{
          path: 'organ/list',
          name: 'OrganList',
          component: OrganList,
        },*/
        {
          path: 'transform',
          name: 'Transform',
          component: Transform,
          children: [
            {
              path: 'research/langdetect',
              name: 'ResearchLangdetect',
              component: ResearchLangdetect,
            },
            {
              path: 'research/chemdetect',
              name: 'ResearchChemDetect',
              component: ResearchChemDetect,
            },
            {
              path: 'research/newsdetect',
              name: 'ResearchNewsDetect',
              component: ResearchNewsDetect,
            },
            {
              path: 'research/endetect',
              name: 'ResearchEnDetect',
              component: ResearchEnDetect,
            },
            {
              path: 'research/cndetect',
              name: 'ResearchCnDetect',
              component: ResearchCnDetect,
            },
            {
              path: 'research/titledetect',
              name: 'ResearchTitleDetect',
              component: ResearchTitleDetect,
            },
            {
              path: 'research/titletranslate',
              name: 'ResearchTitleTranslate',
              component: ResearchTitleTranslate,
            },
            {
              path: 'research/summarytranslate',
              name: 'ResearchSummaryTranslate',
              component: ResearchSummaryTranslate,
            },
            {
              path: 'research/unitdetect',
              name: 'ResearchUnitDetect',
              component: ResearchUnitDetect,
            },
            {
              path: 'research/phototabledetect',
              name: 'ResearchPhotoTableDetect',
              component: ResearchPhotoTableDetect,
            },
            {
              path: 'data/patent',
              name: 'DataPatent',
              component: DataPatent,
            },
          ],
        },
      ],
    },
  ],
})


if(process.env.NODE_ENV !== 'testing') {
  router.beforeEach((to, from, next) => {
    document.title = to.meta.title || '智慧芽 东部中心'
    next()
  })
}

export default router
