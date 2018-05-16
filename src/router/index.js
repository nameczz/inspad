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
      component: require('@/pages/index.vue').default,
      children: [
        {
          path: 'home',
          name: 'home',
          component: require('@/pages/home/index.vue').default,
        },
        {
          path: 'document',
          name: 'document',
          component: require('@/pages/document/index.vue').default,
        },
        {
          path: 'sandbox',
          name: 'sandbox',
          component: require('@/pages/sandbox/index.vue').default,
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
