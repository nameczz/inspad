import Vue from 'vue'
import Router from 'vue-router'
import 'core-js/fn/array/find'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: {
        name: 'home',
      },
    },
    {
      path: '',
      component: () => import('@/pages/index.vue'),
      children: [
        {
          path: 'home',
          name: 'home',
          component: () => import('@/pages/home/index.vue'),
        },
        {
          path: 'document',
          name: 'document',
          component: () => import('@/pages/document/index.vue'),
        },
        {
          path: 'sandbox',
          name: 'sandbox',
          component: () => import('@/pages/sandbox/index.vue'),
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
