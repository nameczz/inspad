import Vue from 'vue'
import Router from 'vue-router'
// import apiUser from 'api/user'
// import store from '@/store'
import 'core-js/fn/array/find'

const Content = resolve => require(['@/components/Content'], resolve)
const Transform = resolve => require(['@/components/Transform'], resolve)

const ResearchLangdetect = resolve => require(['@/components/transform/research/LangDetect'], resolve)
const ResearchChemDetect = resolve => require(['@/components/transform/research/ChemDetect'], resolve)
const ResearchNewsDetect = resolve => require(['@/components/transform/research/NewsDetect'], resolve)
const ResearchEnDetect = resolve => require(['@/components/transform/research/EnDetect'], resolve)
const ResearchCnDetect = resolve => require(['@/components/transform/research/CnDetect'], resolve)
const ResearchTitleDetect = resolve => require(['@/components/transform/research/TitleDetect'], resolve)
const ResearchTitleTranslate = resolve => require(['@/components/transform/research/TitleTranslate'], resolve)
const ResearchAbstractTranslate = resolve => require(['@/components/transform/research/AbstractTranslate'], resolve)
const ResearchUnitDetect = resolve => require(['@/components/transform/research/UnitDetect'], resolve)
const ResearchPhotoTableDetect = resolve => require(['@/components/transform/research/PhotoTableDetect'], resolve)
const ResearchAns = resolve => require(['@/components/transform/research/Ans'], resolve)
const ResearchSimilarCompany = resolve => require(['@/components/transform/research/SimilarCompany'], resolve)
const ResearchCnSimilarWords = resolve => require(['@/components/transform/research/CnSimilarWords'], resolve)
const ResearchEnSimilarWords = resolve => require(['@/components/transform/research/EnSimilarWords'], resolve)
const ResearchCnTerm = resolve => require(['@/components/transform/research/CnTerm'], resolve)
const ResearchEnTerm = resolve => require(['@/components/transform/research/EnTerm'], resolve)
const ResearchLandscapeBio = resolve => require(['@/components/transform/research/LandscapeBio'], resolve)

const DataPatent = resolve => require(['@/components/transform/data/Patent'], resolve)
const DataCompany = resolve => require(['@/components/transform/data/Company'], resolve)
const DataAgency = resolve => require(['@/components/transform/data/Agency'], resolve)
const DataTrademark = resolve => require(['@/components/transform/data/Trademark'], resolve)
const DataStatistics = resolve => require(['@/components/transform/data/Statistics'], resolve)
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
        name: 'ResearchLangdetect',
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
              path: 'research/abstracttranslate',
              name: 'ResearchAbstractTranslate',
              component: ResearchAbstractTranslate,
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
              path: 'research/ans',
              name: 'ResearchAns',
              component: ResearchAns,
            },
            {
              path: 'research/similarcompany',
              name: 'ResearchSimilarCompany',
              component: ResearchSimilarCompany,
            },
            {
              path: 'research/cnsimilarwords',
              name: 'ResearchCnSimilarWords',
              component: ResearchCnSimilarWords,
            },
            {
              path: 'research/ensimilarwords',
              name: 'ResearchEnSimilarWords',
              component: ResearchEnSimilarWords,
            },
            {
              path: 'research/cnterm',
              name: 'ResearchCnTerm',
              component: ResearchCnTerm,
            },
            {
              path: 'research/enterm',
              name: 'ResearchEnTerm',
              component: ResearchEnTerm,
            },
            {
              path: 'research/landscapebio',
              name: 'ResearchLandscapeBio',
              component: ResearchLandscapeBio,
            },
            {
              path: 'data/patent',
              name: 'DataPatent',
              component: DataPatent,
            },
            {
              path: 'data/company',
              name: 'DataCompany',
              component: DataCompany,
            },
            {
              path: 'data/agency',
              name: 'DataAgency',
              component: DataAgency,
            },
            {
              path: 'data/trademark',
              name: 'DataTrademark',
              component: DataTrademark,
            },
            {
              path: 'data/statistics',
              name: 'DataStatistics',
              component: DataStatistics,
            },
          ],
        },
      ],
    },
  ],
})


if(process.env.NODE_ENV !== 'testing') {
  router.beforeEach((to, from, next) => {
    // document.title = to.meta.title || '智慧芽 东部中心'
    next()
  })
}

export default router
