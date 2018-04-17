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
