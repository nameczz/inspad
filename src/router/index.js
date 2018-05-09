import Vue from 'vue'
import Router from 'vue-router'
import 'core-js/fn/array/find'

const Content = resolve => require(['@/components/Content'], resolve)

const Index = resolve => require(['@/components/Index'], resolve)

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: {
        name: 'Index',
      },
    },
    {
      path: '',
      component: Content,
      children: [
        {
          path: 'index',
          name: 'Index',
          component: Index,
        },

        /* {
          path: 'transform',
          name: 'Transform',
          component: Transform,
          children: [
            {
              path: 'research/langdetect',
              name: 'ResearchLangdetect',
              component: ResearchLangdetect,
            },
          ],
        }, */
      ],
    },
  ],
})

if (process.env.NODE_ENV !== 'testing') {
  router.beforeEach((to, from, next) => {
    next()
  })
}

export default router
